import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, Clock, Train as TrainIcon, ChevronDown, Check, ArrowRight, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { trains } from '@/data/trains';
import { Train } from '@/types';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const from = searchParams.get('from') || 'Mumbai Central';
  const to = searchParams.get('to') || 'Pune Junction';
  const date = searchParams.get('date') || '2026-10-15';
  
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Train[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(trains || []);
      setIsLoading(false);
    }, 1500);
  }, [from, to, date]);

  const handleBookNow = (trainId: string) => {
    navigate(`/passenger-details?train=${trainId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Search Summary Bar */}
      <div className="bg-primary text-surface p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>{from}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
            <span>{to}</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-primary-dark opacity-50"></div>
          <div className="text-sm opacity-90 flex gap-4">
            <span>{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span>AC 3 Tier</span>
            <span>1 Passenger</span>
          </div>
        </div>
        <Button variant="outline" className="text-foreground bg-surface border-transparent hover:bg-gray-100" onClick={() => navigate('/')}>
          Modify Search
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <Button 
          variant="outline" 
          className="lg:hidden w-full flex justify-center items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-4 h-4" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>

        {/* Filter Sidebar */}
        <aside className={cn("lg:w-64 shrink-0 space-y-6 transition-all", isFilterOpen ? "block" : "hidden lg:block")}>
          <Card className="p-4 space-y-6 sticky top-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" /> Filters
              </h3>
              <button className="text-sm text-secondary hover:underline">Clear All</button>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted">Departure Time</h4>
              <div className="space-y-2">
                {['Early Morning (00-06)', 'Morning (06-12)', 'Afternoon (12-18)', 'Night (18-24)'].map(time => (
                  <label key={time} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                    {time}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <h4 className="font-medium text-sm text-muted">Train Type</h4>
              <div className="space-y-2">
                {['Rajdhani', 'Shatabdi', 'Superfast', 'Express'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 border-t border-border pt-4">
              <h4 className="font-medium text-sm text-muted">Availability</h4>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                Show available only
              </label>
            </div>
          </Card>
        </aside>

        {/* Results List */}
        <main className="flex-1 space-y-4">
          <div className="flex justify-between items-center bg-surface p-3 rounded-lg border border-border shadow-sm">
            <span className="text-sm font-medium text-muted">{results.length} Trains Found</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted hidden sm:inline">Sort by:</span>
              <select className="border-none bg-transparent font-medium text-foreground focus:ring-0 cursor-pointer">
                <option>Departure</option>
                <option>Duration</option>
                <option>Price</option>
                <option>Availability</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="p-4 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-20 w-full" />
                </div>
              </Card>
            ))
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-lg border border-border">
              <TrainIcon className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No trains found</h3>
              <p className="text-muted">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            results.map((train) => (
              <Card key={train.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5 flex flex-col md:flex-row justify-between gap-6">
                  {/* Train Info & Route */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-primary">{train.number} {train.name}</h3>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-secondary border-blue-200">
                        {train.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-center md:text-left justify-between md:justify-start">
                      <div>
                        <div className="text-2xl font-bold text-foreground">06:40</div>
                        <div className="text-sm text-muted">{from}</div>
                      </div>
                      <div className="flex flex-col items-center px-4 w-32 shrink-0">
                        <span className="text-xs text-muted font-medium bg-gray-100 px-2 rounded-full mb-1">03h 35m</span>
                        <div className="w-full h-px bg-border relative">
                          <div className="absolute w-2 h-2 rounded-full bg-border -top-1 left-0"></div>
                          <div className="absolute w-2 h-2 rounded-full bg-border -top-1 right-0"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">10:15</div>
                        <div className="text-sm text-muted">{to}</div>
                      </div>
                    </div>
                  </div>

                  {/* Classes & Price */}
                  <div className="flex flex-col gap-3 md:w-64 shrink-0">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-green-200 bg-green-50 rounded p-2 text-center cursor-pointer hover:border-green-400">
                        <div className="text-xs font-semibold text-green-800">3A</div>
                        <div className="text-sm font-bold text-green-600">AVL 42</div>
                        <div className="text-xs text-muted flex items-center justify-center mt-1">
                          <IndianRupee className="w-3 h-3" /> 820
                        </div>
                      </div>
                      <div className="border border-border rounded p-2 text-center cursor-pointer hover:border-primary">
                        <div className="text-xs font-semibold">SL</div>
                        <div className="text-sm font-bold text-warning">RAC 12</div>
                        <div className="text-xs text-muted flex items-center justify-center mt-1">
                          <IndianRupee className="w-3 h-3" /> 340
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link to={`/trains/${train.id}`} className="flex-1">
                        <Button variant="outline" className="w-full text-sm">View Details</Button>
                      </Link>
                      <Button className="flex-1 text-sm bg-accent hover:bg-accent-light text-foreground" onClick={() => handleBookNow(train.id)}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
