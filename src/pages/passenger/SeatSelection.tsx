import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function SeatSelection() {
  const navigate = useNavigate();
  const [activeCoach, setActiveCoach] = useState('B1');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
  const coaches = [
    { id: 'B1', type: '3A', available: 12 },
    { id: 'B2', type: '3A', available: 18 },
    { id: 'B3', type: '3A', available: 5 },
    { id: 'B4', type: '3A', available: 0 },
  ];

  // Generate a mock seat map for a 3A coach (8 seats per bay)
  const generateSeats = () => {
    const seats = [];
    for (let i = 1; i <= 64; i++) {
      let type = '';
      const rem = i % 8;
      if (rem === 1 || rem === 4) type = 'L'; // Lower
      else if (rem === 2 || rem === 5) type = 'M'; // Middle
      else if (rem === 3 || rem === 6) type = 'U'; // Upper
      else if (rem === 7) type = 'SL'; // Side Lower
      else if (rem === 0) type = 'SU'; // Side Upper

      let status = 'available';
      if (i % 5 === 0) status = 'occupied';
      if (i === 12 || i === 13) status = 'reserved';

      seats.push({ number: i, type, status });
    }
    return seats;
  };

  const [seats] = useState(generateSeats());

  const toggleSeat = (seatNum: number) => {
    const seat = seats.find(s => s.number === seatNum);
    if (seat?.status !== 'available') return;

    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
    } else {
      if (selectedSeats.length < 2) { // Assuming 2 passengers were added
        setSelectedSeats([...selectedSeats, seatNum]);
      } else {
        alert("You can only select 2 seats for 2 passengers.");
      }
    }
  };

  const handleContinue = () => {
    navigate('/review');
  };

  return (
    <div className="bg-background min-h-screen pb-24 lg:pb-12">
      {/* Progress Bar */}
      <div className="bg-surface border-b border-border py-4 px-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center text-muted">
              <Check className="w-5 h-5 text-success mr-2" />
              <span className="hidden sm:inline">Passenger Info</span>
            </div>
            <div className="h-px bg-success flex-1 mx-4"></div>
            <div className="flex items-center text-primary">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">2</div>
              <span className="hidden sm:inline">Seat Selection</span>
            </div>
            <div className="h-px bg-border flex-1 mx-4"></div>
            <div className="flex items-center text-muted">
              <div className="w-8 h-8 rounded-full border border-muted flex items-center justify-center mr-2">3</div>
              <span className="hidden sm:inline">Review</span>
            </div>
            <div className="h-px bg-border flex-1 mx-4"></div>
            <div className="flex items-center text-muted">
              <div className="w-8 h-8 rounded-full border border-muted flex items-center justify-center mr-2">4</div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Seat Map Area */}
          <div className="flex-1 space-y-6">
            <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="font-bold text-lg text-primary">Select your seats</h2>
                <p className="text-sm text-muted">12127 Intercity Express • 15 Oct</p>
              </div>
              <div className="flex gap-4 text-xs font-medium bg-background p-2 rounded border border-border">
                <div className="flex items-center gap-1"><div className="w-4 h-4 border border-border bg-white rounded-sm"></div> Available</div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 bg-accent rounded-sm"></div> Selected</div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 bg-gray-300 rounded-sm"></div> Occupied</div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 bg-blue-200 rounded-sm"></div> Reserved</div>
              </div>
            </div>

            {/* Coach Selector */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {coaches.map(coach => (
                <button
                  key={coach.id}
                  onClick={() => setActiveCoach(coach.id)}
                  className={cn(
                    "min-w-[80px] p-3 rounded-lg border text-center transition-colors shrink-0",
                    activeCoach === coach.id 
                      ? "border-secondary bg-blue-50 text-secondary ring-1 ring-secondary" 
                      : "border-border bg-surface hover:bg-gray-50",
                    coach.available === 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={coach.available === 0}
                >
                  <div className="font-bold">{coach.id}</div>
                  <div className="text-xs">{coach.available} left</div>
                </button>
              ))}
            </div>

            {/* Seat Map Visual */}
            <Card className="p-6 overflow-x-auto bg-[#e5e7eb] rounded-xl relative">
              <div className="absolute top-4 left-4 right-4 h-2 bg-gray-400 rounded-full opacity-30"></div>
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-400 rounded-full opacity-30"></div>
              
              <div className="min-w-[800px] bg-white rounded-lg p-8 border-2 border-gray-300 shadow-inner my-6 relative">
                <div className="flex gap-8 justify-between">
                  {/* Bays */}
                  {Array.from({ length: 8 }).map((_, bayIndex) => (
                    <div key={bayIndex} className="flex gap-4">
                      {/* Main Compartment (6 seats) */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 bg-blue-50 p-3 rounded border border-blue-100">
                        {seats.slice(bayIndex * 8, bayIndex * 8 + 6).map((seat) => (
                          <button
                            key={seat.number}
                            onClick={() => toggleSeat(seat.number)}
                            disabled={seat.status === 'occupied' || seat.status === 'reserved'}
                            className={cn(
                              "w-10 h-10 rounded text-xs font-bold flex flex-col items-center justify-center transition-all shadow-sm border",
                              seat.status === 'available' && !selectedSeats.includes(seat.number) ? "bg-white border-gray-300 hover:border-secondary hover:text-secondary text-gray-700" : "",
                              seat.status === 'occupied' ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed" : "",
                              seat.status === 'reserved' ? "bg-blue-100 border-blue-200 text-blue-400 cursor-not-allowed" : "",
                              selectedSeats.includes(seat.number) ? "bg-accent border-accent-light text-foreground shadow-md scale-105" : ""
                            )}
                          >
                            <span>{seat.number}</span>
                            <span className="text-[9px] opacity-70 font-normal">{seat.type}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Aisle */}
                      <div className="w-8 flex flex-col justify-center items-center">
                        <div className="w-full h-px bg-gray-200"></div>
                      </div>
                      
                      {/* Side Berths (2 seats) */}
                      <div className="flex flex-col justify-between gap-y-1 bg-orange-50 p-3 rounded border border-orange-100">
                        {seats.slice(bayIndex * 8 + 6, bayIndex * 8 + 8).map((seat) => (
                          <button
                            key={seat.number}
                            onClick={() => toggleSeat(seat.number)}
                            disabled={seat.status === 'occupied' || seat.status === 'reserved'}
                            className={cn(
                              "w-10 h-10 rounded text-xs font-bold flex flex-col items-center justify-center transition-all shadow-sm border mt-auto mb-auto",
                              seat.status === 'available' && !selectedSeats.includes(seat.number) ? "bg-white border-gray-300 hover:border-secondary hover:text-secondary text-gray-700" : "",
                              seat.status === 'occupied' ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed" : "",
                              seat.status === 'reserved' ? "bg-blue-100 border-blue-200 text-blue-400 cursor-not-allowed" : "",
                              selectedSeats.includes(seat.number) ? "bg-accent border-accent-light text-foreground shadow-md scale-105" : ""
                            )}
                          >
                            <span>{seat.number}</span>
                            <span className="text-[9px] opacity-70 font-normal">{seat.type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-80 shrink-0">
            <Card className="p-5 sticky top-24 border-border shadow-md">
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">Selection Summary</h3>
              
              <div className="space-y-4 mb-6 min-h-[120px]">
                {selectedSeats.length === 0 ? (
                  <div className="text-muted text-sm text-center py-6">
                    Please select 2 seats from the coach layout.
                  </div>
                ) : (
                  selectedSeats.map((seatNum, idx) => {
                    const seatInfo = seats.find(s => s.number === seatNum);
                    return (
                      <div key={seatNum} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-border">
                        <div>
                          <div className="text-xs text-muted mb-1">Passenger {idx + 1}</div>
                          <div className="font-bold text-primary">{activeCoach}, Seat {seatNum}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold px-2 py-1 bg-white rounded border border-border">
                            {seatInfo?.type === 'L' ? 'Lower' : 
                             seatInfo?.type === 'M' ? 'Middle' : 
                             seatInfo?.type === 'U' ? 'Upper' : 
                             seatInfo?.type === 'SL' ? 'Side Lower' : 'Side Upper'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm mb-2 text-muted">
                  <span>Base Fare x {selectedSeats.length}</span>
                  <span className="flex items-center"><IndianRupee className="w-3 h-3" /> {820 * selectedSeats.length}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-primary mt-2">
                  <span>Total Base</span>
                  <span className="flex items-center"><IndianRupee className="w-4 h-4" /> {820 * selectedSeats.length}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-accent hover:bg-accent-light text-foreground text-lg py-6 font-bold"
                disabled={selectedSeats.length !== 2}
                onClick={handleContinue}
              >
                Review Booking
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
