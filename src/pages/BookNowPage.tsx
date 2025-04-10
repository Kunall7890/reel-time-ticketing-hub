
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Film 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies } from '@/data/movies';
import { theaters, cities, ShowTime } from '@/data/theaters';

interface TheaterShowtime {
  theaterId: string;
  theaterName: string;
  location: string;
  city: string;
  address: string;
  facilities: string[];
  showtimeId: string;
  time: string;
  date: string;
  screenType: string;
  price: {
    standard: number;
    premium: number;
    vip?: number;
  };
}

const BookNowPage = () => {
  const navigate = useNavigate();
  
  const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [movieShowtimes, setMovieShowtimes] = useState<Record<string, TheaterShowtime[]>>({});
  
  // Generate dates for the next 7 days
  const dateOptions = Array(7).fill(null).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return formatDateForAPI(date);
  });
  
  // Format date to YYYY-MM-DD
  function formatDateForAPI(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  // Get today's date in YYYY-MM-DD format
  function getTodayDate(): string {
    return formatDateForAPI(new Date());
  }
  
  // Format date for display
  function formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  }

  // Filter movies based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery]);
  
  // Find all showtimes for all theaters in the selected city for the selected date
  const findAllShowtimes = () => {
    const theatersInCity = theaters.filter(theater => theater.city === selectedCity);
    const allShowtimes: Record<string, TheaterShowtime[]> = {};
    
    // For each movie
    movies.forEach(movie => {
      const showtimesForMovie: TheaterShowtime[] = [];
      
      // Check each theater in the selected city
      theatersInCity.forEach(theater => {
        // Find showtimes for this movie at this theater on the selected date
        const theaterShowtimes = theater.showTimes.filter(showtime => 
          showtime.movieId === movie.id && 
          showtime.date === selectedDate
        );
        
        // Add each showtime with theater information
        theaterShowtimes.forEach(showtime => {
          showtimesForMovie.push({
            theaterId: theater.id,
            theaterName: theater.name,
            location: theater.location,
            city: theater.city,
            address: theater.address,
            facilities: theater.facilities,
            showtimeId: showtime.id,
            time: showtime.time,
            date: showtime.date,
            screenType: showtime.screenType,
            price: showtime.price
          });
        });
      });
      
      if (showtimesForMovie.length > 0) {
        allShowtimes[movie.id] = showtimesForMovie;
      }
    });
    
    return allShowtimes;
  };
  
  // Handle search button click
  const handleSearch = () => {
    const allShowtimes = findAllShowtimes();
    setMovieShowtimes(allShowtimes);
    setShowResults(true);
  };
  
  // Handle movie selection from the dropdown
  const handleMovieChange = (movieId: string) => {
    setSelectedMovie(movieId);
  };
  
  // Handle booking a ticket
  const handleBookTicket = (movieId: string, theaterId: string, showtimeId: string) => {
    navigate(`/booking/${movieId}/${theaterId}/${showtimeId}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Book Movie Tickets</h1>
          
          <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dateOptions.map((date) => (
                        <SelectItem key={date} value={date}>
                          {formatDateForDisplay(date)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Movie (Optional)</label>
                <Select value={selectedMovie} onValueChange={handleMovieChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Movies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-movies">All Movies</SelectItem>
                    <SelectGroup>
                      {filteredMovies.map((movie) => (
                        <SelectItem key={movie.id} value={movie.id}>{movie.title}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search movies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleSearch} className="flex-shrink-0">
                    <Search size={18} className="mr-2" />
                    Find
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {showResults && (
            <div>
              {Object.keys(movieShowtimes).length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(movieShowtimes)
                    .filter(([movieId]) => !selectedMovie || movieId === selectedMovie)
                    .map(([movieId, showtimes]) => {
                      const movie = movies.find(m => m.id === movieId);
                      if (!movie) return null;
                      
                      return (
                        <Card key={movieId} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                              <img 
                                src={movie.poster} 
                                alt={movie.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <CardContent className="flex-grow p-6">
                              <div className="mb-4">
                                <h2 className="text-xl font-bold">{movie.title}</h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {movie.genre.map((genre, index) => (
                                    <Badge key={index} variant="outline">
                                      {genre}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                  <div className="flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Film size={14} className="mr-1" />
                                    <span>{movie.language.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator className="mb-4" />
                              
                              <div>
                                {Object.entries(showtimes.reduce<Record<string, TheaterShowtime[]>>((acc, showtime) => {
                                  if (!acc[showtime.theaterId]) {
                                    acc[showtime.theaterId] = [];
                                  }
                                  acc[showtime.theaterId].push(showtime);
                                  return acc;
                                }, {}))
                                .map(([theaterId, theaterShowtimes]) => {
                                  const theater = theaters.find(t => t.id === theaterId);
                                  if (!theater) return null;
                                  
                                  return (
                                    <div key={theaterId} className="mb-4">
                                      <h3 className="font-semibold">{theater.name}</h3>
                                      <div className="text-sm text-muted-foreground flex items-center mb-3">
                                        <MapPin size={14} className="mr-1" />
                                        <span>{theater.location}, {theater.city}</span>
                                      </div>
                                      
                                      <div className="flex flex-wrap gap-2">
                                        {theaterShowtimes.map((showtime) => (
                                          <Button 
                                            key={showtime.showtimeId}
                                            variant="outline" 
                                            onClick={() => handleBookTicket(movieId, theaterId, showtime.showtimeId)}
                                            className="flex flex-col items-center py-3"
                                          >
                                            <span className="font-medium">{showtime.time}</span>
                                            <span className="text-xs text-muted-foreground">{showtime.screenType}</span>
                                            <span className="text-xs mt-1">₹{showtime.price.standard} - ₹{showtime.price.vip || showtime.price.premium}</span>
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })
                                .filter(Boolean)}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎬</div>
                  <h2 className="text-xl font-bold mb-2">No Shows Available</h2>
                  <p className="text-muted-foreground">
                    There are no shows available for the selected criteria.
                    <br />Try a different date or city.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {!showResults && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎟️</div>
              <h2 className="text-xl font-bold mb-2">Ready to find your perfect movie?</h2>
              <p className="text-muted-foreground mb-6">
                Select your preferences and click "Find" to see all available showtimes.
              </p>
              <Button onClick={handleSearch} size="lg">
                <Search size={18} className="mr-2" />
                Find Shows
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookNowPage;
