
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Handle prefilled data from navigation
  useEffect(() => {
    if (location.state?.prefilledService) {
      setSelectedServices([location.state.prefilledService]);
    }
    if (location.state?.prefilledGender) {
      setSelectedGender(location.state.prefilledGender);
    }
  }, [location.state]);

  const services = [
    'Classic Haircut',
    'Premium Haircut & Style',
    'Cut & Style',
    'Beard Styling & Trim',
    'Hair Coloring & Highlights',
    'Hair Spa Treatment',
    'Deep Hair Spa',
    'Manicure & Pedicure',
    'Eyebrow Shaping',
    'Luxury Facial Treatment',
    'Body Massage'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s !== service));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!customerName || !selectedServices.length || !selectedDate || !selectedTime || !phoneNumber || !selectedLocation || !selectedGender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Appointment Reserved Successfully!",
      description: `Your luxury appointment for ${selectedServices.join(', ')} has been confirmed for ${format(selectedDate, 'PPP')} at ${selectedTime}.`,
    });

    // Clear form
    setCustomerName('');
    setSelectedServices([]);
    setSelectedDate(undefined);
    setSelectedTime('');
    setPhoneNumber('');
    setSelectedLocation('');
    setSelectedGender('');

    // Navigate back to home after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cream-50 to-gold-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-gold-200 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-cream-100 hover:text-gold-400">
                <Link to="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-cream-300 bg-clip-text text-transparent">
              LuxeSalon
            </div>
            <div></div>
          </div>
        </nav>
      </header>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">Reserve Your Experience</h1>
            <p className="text-xl text-slate-600">Schedule your perfect luxury salon experience with us</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
                <span className="bg-gradient-to-r from-gold-400 to-cream-300 bg-clip-text text-transparent">
                  Appointment Details
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold text-navy-900">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="h-12 border-slate-300 focus:border-gold-500 focus:ring-gold-500"
                    required
                  />
                </div>

                {/* Gender Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-navy-900">
                    Gender *
                  </Label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger className="h-12 border-slate-300 focus:border-gold-500 focus:ring-gold-500">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Services Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-navy-900">
                    Select Services *
                  </Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-cream-50 hover:border-gold-300 transition-colors">
                        <Checkbox
                          id={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                          className="data-[state=checked]:bg-gold-600 data-[state=checked]:border-gold-600"
                        />
                        <Label 
                          htmlFor={service} 
                          className="text-navy-900 cursor-pointer flex-1 font-medium"
                        >
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-navy-900">
                    Select Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal border-slate-300 hover:border-gold-500",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-navy-900">
                    Select Time *
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="h-12 border-slate-300 focus:border-gold-500 focus:ring-gold-500">
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold text-navy-900">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 border-slate-300 focus:border-gold-500 focus:ring-gold-500"
                    required
                  />
                </div>

                {/* Location Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-navy-900">
                    Choose Location *
                  </Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12 border-slate-300 focus:border-gold-500 focus:ring-gold-500">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Salon - 1200 Fifth Avenue</SelectItem>
                      <SelectItem value="uptown">Uptown Studio - 2000 Broadway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Reserve My Appointment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
