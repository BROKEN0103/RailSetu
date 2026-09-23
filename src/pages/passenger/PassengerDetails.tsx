import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { UserPlus, Trash2, Shield, Info, ArrowRight, Train as TrainIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

export function PassengerDetails() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([
    { id: '1', name: '', age: '', gender: 'Male', berthPreference: 'No Preference' }
  ]);
  const [contact, setContact] = useState({ email: '', phone: '' });

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { id: Date.now().toString(), name: '', age: '', gender: 'Male', berthPreference: 'No Preference' }]);
    }
  };

  const removePassenger = (id: string) => {
    setPassengers(passengers.filter(p => p.id !== id));
  };

  const updatePassenger = (id: string, field: string, value: string) => {
    setPassengers(passengers.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and save to context, then navigate
    navigate('/seat-selection');
  };

  return (
    <div className="bg-background min-h-screen pb-12">
      {/* Progress Bar Header */}
      <div className="bg-surface border-b border-border py-4 px-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center text-primary">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">1</div>
              <span className="hidden sm:inline">Passenger Info</span>
            </div>
            <div className="h-px bg-border flex-1 mx-4"></div>
            <div className="flex items-center text-muted">
              <div className="w-8 h-8 rounded-full border border-muted flex items-center justify-center mr-2">2</div>
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

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Form Area */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-bold text-primary">Passenger Details</h1>
            <p className="text-muted">Enter details exactly as they appear on your ID proof.</p>
            
            <form id="passenger-form" onSubmit={handleSubmit} className="space-y-6">
              {passengers.map((passenger, index) => (
                <Card key={passenger.id} className="p-6 relative overflow-visible border-border shadow-sm">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary rounded-l-lg"></div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      Passenger {index + 1}
                    </h3>
                    {passengers.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removePassenger(passenger.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6 space-y-1">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input 
                        placeholder="Enter full name" 
                        value={passenger.name} 
                        onChange={(e) => updatePassenger(passenger.id, 'name', e.target.value)} 
                        required 
                        minLength={3}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-sm font-medium">Age *</label>
                      <Input 
                        type="number" 
                        placeholder="Age" 
                        min="1" max="120"
                        value={passenger.age} 
                        onChange={(e) => updatePassenger(passenger.id, 'age', e.target.value)}
                        required 
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-sm font-medium">Gender *</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={passenger.gender}
                        onChange={(e) => updatePassenger(passenger.id, 'gender', e.target.value)}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Transgender</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted">Berth Preference</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={passenger.berthPreference}
                        onChange={(e) => updatePassenger(passenger.id, 'berthPreference', e.target.value)}
                      >
                        <option value="No Preference">No Preference</option>
                        <option value="Lower">Lower</option>
                        <option value="Middle">Middle</option>
                        <option value="Upper">Upper</option>
                        <option value="Side Lower">Side Lower</option>
                        <option value="Side Upper">Side Upper</option>
                      </select>
                    </div>
                  </div>
                </Card>
              ))}

              {passengers.length < 6 && (
                <Button type="button" variant="outline" onClick={addPassenger} className="w-full border-dashed border-2 py-6 text-primary hover:bg-blue-50 hover:border-secondary">
                  <UserPlus className="w-5 h-5 mr-2" /> Add Passenger ({passengers.length}/6)
                </Button>
              )}

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">Contact Details</h3>
                <p className="text-sm text-muted mb-4">Your ticket will be sent to these details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Mobile Number *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground sm:text-sm">
                        +91
                      </span>
                      <Input 
                        type="tel" 
                        pattern="[0-9]{10}"
                        placeholder="10 digit mobile number" 
                        className="rounded-l-none"
                        value={contact.phone}
                        onChange={e => setContact({...contact, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="Email for E-Ticket" 
                      value={contact.email}
                      onChange={e => setContact({...contact, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </Card>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-80 shrink-0 space-y-4">
            <Card className="p-5 bg-primary text-surface sticky top-24">
              <h3 className="font-bold border-b border-primary-dark pb-3 mb-3">Journey Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-lg font-bold">12127 Intercity Express</div>
                  <div className="text-sm text-blue-200">AC 3 Tier (3A) | General Quota</div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-semibold">Mumbai (MMCT)</div>
                    <div className="text-blue-200">06:40 | 15 Oct</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <div className="text-right">
                    <div className="font-semibold">Pune (PUNE)</div>
                    <div className="text-blue-200">10:15 | 15 Oct</div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-primary-dark flex justify-between items-center font-bold">
                  <span>Base Fare</span>
                  <span>₹820 / person</span>
                </div>
              </div>
              
              <Button form="passenger-form" type="submit" className="w-full mt-6 bg-accent hover:bg-accent-light text-foreground text-lg py-6 font-bold shadow-lg">
                Continue to Seat Selection
              </Button>
            </Card>
            
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <Info className="w-4 h-4 text-blue-500 mr-2" />
              <div className="text-xs">Original ID proof is required during journey. Senior citizen concessions are automatically applied based on age.</div>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
