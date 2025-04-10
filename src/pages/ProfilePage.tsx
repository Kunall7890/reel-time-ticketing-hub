
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Ticket, 
  User, 
  CreditCard, 
  Heart, 
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  Download,
  Calendar,
  Clock,
  MapPin,
  Star
} from "lucide-react";

import { currentUser } from '@/data/users';
import { movies } from '@/data/movies';
import { theaters } from '@/data/theaters';

const ProfilePage = () => {
  const user = currentUser;
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Get movie and theater details for bookings
  const bookingsWithDetails = user.bookings.map(booking => {
    const movie = movies.find(m => m.id === booking.movieId);
    const theater = theaters.find(t => t.id === booking.theaterId);
    const showtime = theater?.showTimes.find(st => st.id === booking.showTimeId);
    
    return {
      ...booking,
      movie,
      theater,
      showtime
    };
  });
  
  // Get movie details for wishlist
  const wishlistMovies = movies.filter(movie => 
    user.wishlist.includes(movie.id)
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <Card className="bg-card">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between py-2 border-b border-muted">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-muted">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/profile/edit">
                      Edit Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-6 space-y-2">
                <div className="bg-card p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="bg-card p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Payment Methods</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <Link to="/wishlist" className="bg-card p-4 rounded-lg flex items-center justify-between block">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Wishlist</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                
                <div className="bg-card p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold mb-6">My Account</h1>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="bookings" className="flex items-center">
                    <Ticket className="h-4 w-4 mr-2" />
                    <span>My Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Wishlist</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="bookings">
                  <div className="space-y-4">
                    {bookingsWithDetails.length > 0 ? (
                      bookingsWithDetails.map((booking) => (
                        <Card key={booking.id} className="bg-card overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 bg-muted p-4 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <Badge status={booking.status} />
                                <span className="text-xs text-muted-foreground">{booking.bookingDate}</span>
                              </div>
                              <div className="mt-4 mb-2">
                                <QRCode value={booking.qrCode} />
                              </div>
                              <div className="text-xs text-center text-muted-foreground">
                                Booking ID: {booking.id}
                              </div>
                            </div>
                            <div className="p-4 md:w-3/4">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-bold text-lg">{booking.movie?.title}</h3>
                                  <div className="text-sm text-muted-foreground">{booking.theater?.name}</div>
                                </div>
                                <Button size="sm" variant="outline" className="flex items-center">
                                  <Download className="h-4 w-4 mr-1" />
                                  Ticket
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <div className="flex items-center text-muted-foreground mb-1">
                                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                    Date
                                  </div>
                                  <div>{booking.showtime?.date}</div>
                                </div>
                                <div>
                                  <div className="flex items-center text-muted-foreground mb-1">
                                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                                    Time
                                  </div>
                                  <div>{booking.showtime?.time}</div>
                                </div>
                                <div>
                                  <div className="flex items-center text-muted-foreground mb-1">
                                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                    Screen
                                  </div>
                                  <div>{booking.showtime?.screenType}</div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-border flex justify-between">
                                <div>
                                  <div className="text-muted-foreground text-sm">Seats</div>
                                  <div className="font-medium">{booking.seats.join(', ')}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-muted-foreground text-sm">Amount Paid</div>
                                  <div className="font-bold">${booking.totalAmount}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-card rounded-lg">
                        <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-xl font-bold mb-2">No bookings yet</h2>
                        <p className="text-muted-foreground mb-6">
                          You haven't made any movie bookings yet.
                        </p>
                        <Button asChild>
                          <Link to="/movies">Explore Movies</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="wishlist">
                  {wishlistMovies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {wishlistMovies.map((movie) => (
                        <Link key={movie.id} to={`/movies/${movie.id}`}>
                          <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-105">
                            <img 
                              src={movie.poster} 
                              alt={movie.title} 
                              className="w-full aspect-[2/3] object-cover"
                            />
                            <div className="p-3">
                              <h3 className="font-medium text-sm mb-1 line-clamp-1">{movie.title}</h3>
                              <div className="flex items-center text-xs">
                                <Star className="h-3 w-3 text-cinema-gold fill-cinema-gold mr-1" />
                                <span>{movie.rating}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-card rounded-lg">
                      <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
                      <p className="text-muted-foreground mb-6">
                        Add movies to your wishlist by clicking the heart icon.
                      </p>
                      <Button asChild>
                        <Link to="/movies">Explore Movies</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

function Badge({ status }: { status: string }) {
  return (
    <div className={`
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      ${status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}
    `}>
      {status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
    </div>
  );
}

function QRCode({ value }: { value: string }) {
  return (
    <div className="mx-auto w-20 h-20">
      <img src={value} alt="QR Code" className="w-full h-full" />
    </div>
  );
}

export default ProfilePage;
