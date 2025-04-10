
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeatLayout from '@/components/SeatLayout';
import { movies } from '@/data/movies';
import { theaters, ShowTime } from '@/data/theaters';

const BookingPage = () => {
  const { movieId, theaterId, showtimeId } = useParams<{ 
    movieId: string;
    theaterId: string;
    showtimeId: string;
  }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(movies.find(m => m.id === movieId));
  const [theater, setTheater] = useState(theaters.find(t => t.id === theaterId));
  const [showtime, setShowtime] = useState<ShowTime | undefined>();
  const [activeTab, setActiveTab] = useState('seat-selection');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (!movie || !theater) {
      navigate('/not-found');
      return;
    }
    
    const foundShowtime = theater.showTimes.find(st => st.id === showtimeId);
    if (!foundShowtime) {
      navigate('/not-found');
      return;
    }
    
    setShowtime(foundShowtime);
    window.scrollTo(0, 0);
  }, [movie, theater, navigate, showtimeId]);
  
  if (!movie || !theater || !showtime) return null;
  
  const handleSeatsSelected = (seats: string[], price: number) => {
    setSelectedSeats(seats);
    setTotalAmount(price);
    setActiveTab('payment');
  };
  
  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('confirmation');
    }, 2000);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const formatBookingReference = () => {
    // Generate a random reference number
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = 'RT-';
    
    for (let i = 0; i < 6; i++) {
      reference += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return reference;
  };
  
  const bookingReference = formatBookingReference();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Button>
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(showtime.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{showtime.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{theater.name}, {theater.location}</span>
              </div>
              <Badge>{showtime.screenType}</Badge>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger 
                value="seat-selection"
                disabled={activeTab === "payment" || activeTab === "confirmation"}
              >
                1. Seat Selection
              </TabsTrigger>
              <TabsTrigger 
                value="payment"
                disabled={selectedSeats.length === 0 || activeTab === "confirmation"}
              >
                2. Payment
              </TabsTrigger>
              <TabsTrigger 
                value="confirmation"
                disabled={activeTab !== "confirmation"}
              >
                3. Confirmation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="seat-selection">
              <div className="mx-auto max-w-4xl">
                <div className="bg-card rounded-lg p-6 mb-8">
                  <div className="flex gap-4 mb-6">
                    <div className="w-20 h-30 md:w-24 md:h-36 flex-shrink-0 rounded overflow-hidden">
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg md:text-xl">{movie.title}</h2>
                      <div className="text-sm text-muted-foreground mb-1">{movie.genre.join(', ')}</div>
                      <div className="text-sm">{theater.name}</div>
                      <div className="text-sm text-muted-foreground">{theater.location}</div>
                      <div className="text-sm mt-2">
                        {showtime.screenType} | {showtime.time}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-4 md:p-8">
                  <SeatLayout 
                    onSeatsSelected={handleSeatsSelected}
                    price={showtime.price}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payment">
              <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <div className="bg-card rounded-lg p-6 mb-8">
                      <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                      
                      <div className="space-y-4">
                        <div 
                          className={`
                            border p-4 rounded-lg flex gap-4 cursor-pointer
                            ${paymentMethod === 'credit-card' ? 'border-primary' : 'border-border'}
                          `}
                          onClick={() => setPaymentMethod('credit-card')}
                        >
                          <div className="h-6 w-6 rounded-full border border-primary flex items-center justify-center">
                            {paymentMethod === 'credit-card' && (
                              <div className="h-3 w-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">Credit / Debit Card</div>
                            <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="https://via.placeholder.com/40x24" alt="Visa" className="h-6" />
                            <img src="https://via.placeholder.com/40x24" alt="Mastercard" className="h-6" />
                          </div>
                        </div>
                        
                        <div 
                          className={`
                            border p-4 rounded-lg flex gap-4 cursor-pointer
                            ${paymentMethod === 'paypal' ? 'border-primary' : 'border-border'}
                          `}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          <div className="h-6 w-6 rounded-full border border-primary flex items-center justify-center">
                            {paymentMethod === 'paypal' && (
                              <div className="h-3 w-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">PayPal</div>
                            <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
                          </div>
                          <div className="flex items-center">
                            <img src="https://via.placeholder.com/40x24" alt="PayPal" className="h-6" />
                          </div>
                        </div>
                        
                        <div 
                          className={`
                            border p-4 rounded-lg flex gap-4 cursor-pointer
                            ${paymentMethod === 'apple-pay' ? 'border-primary' : 'border-border'}
                          `}
                          onClick={() => setPaymentMethod('apple-pay')}
                        >
                          <div className="h-6 w-6 rounded-full border border-primary flex items-center justify-center">
                            {paymentMethod === 'apple-pay' && (
                              <div className="h-3 w-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">Apple Pay</div>
                            <div className="text-sm text-muted-foreground">Fast & secure payment with Apple Pay</div>
                          </div>
                          <div className="flex items-center">
                            <img src="https://via.placeholder.com/40x24" alt="Apple Pay" className="h-6" />
                          </div>
                        </div>
                      </div>
                      
                      {paymentMethod === 'credit-card' && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <label className="block text-sm mb-1">Card Number</label>
                            <input 
                              type="text" 
                              className="w-full p-2 rounded border bg-muted"
                              placeholder="1234 5678 9012 3456" 
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm mb-1">Expiry Date</label>
                              <input 
                                type="text" 
                                className="w-full p-2 rounded border bg-muted"
                                placeholder="MM/YY" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">CVV</label>
                              <input 
                                type="text" 
                                className="w-full p-2 rounded border bg-muted"
                                placeholder="123" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1">Name on Card</label>
                            <input 
                              type="text" 
                              className="w-full p-2 rounded border bg-muted"
                              placeholder="John Smith" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-card rounded-lg p-6">
                      <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input 
                              type="text" 
                              className="w-full p-2 rounded border bg-muted"
                              placeholder="John Smith" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input 
                              type="email" 
                              className="w-full p-2 rounded border bg-muted"
                              placeholder="john@example.com" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm mb-1">Phone</label>
                          <input 
                            type="tel" 
                            className="w-full p-2 rounded border bg-muted"
                            placeholder="+1 (555) 123-4567" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-card rounded-lg p-6 sticky top-24">
                      <h2 className="text-lg font-bold mb-4">Booking Summary</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Movie</div>
                          <div className="font-medium">{movie.title}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Theater</div>
                          <div className="font-medium">{theater.name}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Date & Time</div>
                          <div className="font-medium">{formatDate(showtime.date)} | {showtime.time}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Seats</div>
                          <div className="font-medium">{selectedSeats.join(", ")}</div>
                        </div>
                        
                        <hr className="border-border" />
                        
                        <div className="flex justify-between">
                          <div className="text-sm text-muted-foreground">Tickets ({selectedSeats.length}x)</div>
                          <div className="font-medium">${totalAmount.toFixed(2)}</div>
                        </div>
                        
                        <div className="flex justify-between">
                          <div className="text-sm text-muted-foreground">Booking Fee</div>
                          <div className="font-medium">$2.00</div>
                        </div>
                        
                        <hr className="border-border" />
                        
                        <div className="flex justify-between text-lg">
                          <div className="font-bold">Total</div>
                          <div className="font-bold">${(totalAmount + 2).toFixed(2)}</div>
                        </div>
                        
                        <Button 
                          className="w-full"
                          size="lg" 
                          onClick={handlePaymentSubmit}
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Complete Payment"}
                        </Button>
                        
                        <p className="text-center text-xs text-muted-foreground">
                          By clicking the button, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Policies</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="confirmation">
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6 flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check size={40} className="text-green-500" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-8">
                  Your ticket has been booked successfully. An email has been sent with the ticket details.
                </p>
                
                <div className="bg-card rounded-lg p-8 mb-8">
                  <div className="border-4 border-dashed border-muted rounded-lg p-4 mb-6">
                    <div className="text-sm text-muted-foreground mb-1">Booking Reference</div>
                    <div className="text-xl font-mono font-bold">{bookingReference}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-left">
                    <div>
                      <div className="text-sm text-muted-foreground">Movie</div>
                      <div className="font-medium">{movie.title}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Screen</div>
                      <div className="font-medium">{showtime.screenType}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-medium">{formatDate(showtime.date)}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Time</div>
                      <div className="font-medium">{showtime.time}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Theater</div>
                      <div className="font-medium">{theater.name}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Seats</div>
                      <div className="font-medium">{selectedSeats.join(", ")}</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="mx-auto w-40 h-40 mb-4">
                      <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAOaSURBVO3BQY4kMQwDwWSh/3+Z62OeChBkj7vTIcYv1hgfWWN8ZI3xkTXGR9YYH1ljfGSN8ZE1xkfWGB9ZY3xkjfGRNcZH1hgfWWN8ZI3xkTXGRzbpIiFl6CYhZeimhJShm4SUoZuElKGbhJShm4SUoZuElKGbhJShm4SUoZuElKGbhJShm4SUoZs1xkfWGB9ZY3xkjfGRTd7kDXSSN0hIGbpJSBl6g4SUoTd4g4SUoZuElKE3eIM3SBm6SRm6WWN8ZI3xkTXGRzb5CSlDNwkpQzcJKUM3CSlDJwkpQzcJKUMnCSlDNwkpQzcJKUMnCSlDNwkpQzcJKUM3CSlDN2uMj6wxPrLG+Mgm/7GElKGbhJShlIGUoZuElKGThJShlIGUoZOElKE3SEgZuln/mDXGR9YYH1ljfGSTL0tIGTpJSBm6SUgZOknef8pAytBNQsrQTULK0ElCytBNQsrQTULK0M0a4yNrjI+sMT6yyZclpAzdJKQM3fxlCSlDJwkpQzcJKUM3CSlDNwkpQzcJKUMnCSlDNwkpQzcJKUM3a4yPrDE+ssb4yCZvkJAydJOQMnSTkDJ0kpAydJKQMnSTkDJ0kpAy9AYJKUMnCSlDNwkpQzcJKUM3CSlDN2uMj6wxPrLG+MgmLyWkDJ0kpAydJKQMnSSkDJ0kpAydJKQM3fxlCSlDJwkpQycJKUM3a4yPrDE+ssb4yCbDf0RCytDNGySkDJ0kpAzd/MdShm7WGB9ZY3xkjfGRTb4sIWXoJiFlKGUgZeimTBk6SUgZShlIGTpJSBlKGUgZOklIGbpZY3xkjfGRNcZHNnmDhJShm4SUoZuElKE3SEgZuklIGbpJSBm6SUgZuklIGbpJSBm6SUgZuklIGbpJSBm6WGR9ZY3xkjfGRTb4sIWXoJCFl6CYhZegkIWXoJCFl6CYhZegkIWXoJiFl6CYhZehkIWXoJCFl6CYhZehmjfGRNcZH1hgfWWN8ZI3xkTXGR9YYH1ljfGSN8ZE1xkfWGB9ZY3xkjfGRNcZH1hgfWWN8ZI3xkTXGR34B6s4Jcad1zvoAAAAASUVORK5CYII=" 
                        alt="QR Code" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="text-xs text-muted-foreground text-center">
                      Scan this QR code at the theater entrance
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="gap-2">
                    Download Ticket
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    Return to Home
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
