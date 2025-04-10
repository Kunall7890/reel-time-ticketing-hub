
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Clock, 
  Calendar, 
  Languages, 
  Star, 
  Heart, 
  Play,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies } from '@/data/movies';
import { theaters, ShowTime } from '@/data/theaters';
import { cn } from '@/lib/utils';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(movies.find(m => m.id === id));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    if (!movie) {
      navigate('/not-found');
      return;
    }
    
    window.scrollTo(0, 0);
  }, [movie, navigate]);
  
  if (!movie) return null;
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };
  
  // Generate date options for the next 7 days
  const dateOptions = Array(7).fill(null).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  });
  
  // Find showtimes for this movie
  const showtimesByTheater: Record<string, ShowTime[]> = {};
  theaters.forEach(theater => {
    const theaterShowtimes = theater.showTimes.filter(
      showtime => showtime.movieId === movie.id
    );
    
    if (theaterShowtimes.length > 0) {
      showtimesByTheater[theater.id] = theaterShowtimes;
    }
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[60vh] md:h-[70vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
            <div className="container mx-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-6"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </Button>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 md:w-48 flex-shrink-0">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genre.map((genre, index) => (
                      <Badge key={index} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-4">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1 text-muted-foreground" />
                      <span>{formatDuration(movie.duration)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-muted-foreground" />
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Languages size={16} className="mr-1 text-muted-foreground" />
                      <span>{movie.language.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-cinema-gold fill-cinema-gold" />
                      <span className="font-bold">{movie.rating}</span>
                      <span className="text-muted-foreground ml-1">/10</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button 
                      className="gap-2"
                      onClick={() => {
                        document.getElementById('showtimes')?.scrollIntoView({
                          behavior: 'smooth'
                        });
                      }}
                    >
                      Book Tickets
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => setShowTrailer(true)}
                    >
                      <Play size={16} />
                      Watch Trailer
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart 
                        size={20} 
                        className={cn(
                          "transition-colors",
                          isFavorite && "fill-cinema-red text-cinema-red"
                        )} 
                      />
                    </Button>
                    <Link to="/book-now">
                      <Button variant="outline" className="gap-2">
                        <Ticket size={16} />
                        All Shows
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="container mx-auto px-4 md:px-8 py-8">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="cast">Cast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4">Synopsis</h2>
                  <p className="mb-6 text-muted-foreground">
                    {movie.synopsis}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Director</h3>
                    <p>{movie.director}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.language.map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Movie Info</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Release Date</p>
                      <p className="font-semibold">{new Date(movie.releaseDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{formatDuration(movie.duration)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Genre</p>
                      <p className="font-semibold">{movie.genre.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Director</p>
                      <p className="font-semibold">{movie.director}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-cinema-gold fill-cinema-gold" />
                        <span className="font-semibold">{movie.rating}</span>
                        <span className="text-muted-foreground ml-1">/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="max-w-3xl mx-auto">
                <div className="bg-card rounded-lg p-6 mb-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      J
                    </div>
                    <div>
                      <div className="font-bold">John D.</div>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4].map(star => (
                          <Star key={star} size={14} className="text-cinema-gold fill-cinema-gold" />
                        ))}
                        {[5].map(star => (
                          <Star key={star} size={14} className="text-muted-foreground" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    The visuals in this movie are absolutely stunning! The plot was engaging from start to finish and the actors delivered incredible performances. Definitely worth watching in theaters.
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-accent h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      S
                    </div>
                    <div>
                      <div className="font-bold">Sarah M.</div>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={14} className="text-cinema-gold fill-cinema-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    One of the best movies I've seen this year! The director did an amazing job creating tension throughout the story. The soundtrack complements every scene perfectly.
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cast">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 overflow-hidden rounded-full aspect-square">
                      <img 
                        src={actor.photo} 
                        alt={actor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm">{actor.name}</h3>
                    <p className="text-xs text-muted-foreground">{actor.character}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Showtimes Section */}
        <section id="showtimes" className="container mx-auto px-4 md:px-8 py-8">
          <h2 className="text-2xl font-bold mb-6">Showtimes & Tickets</h2>
          
          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {dateOptions.map((date, index) => (
                <Button
                  key={index}
                  variant={date.toDateString() === selectedDate.toDateString() ? "default" : "outline"}
                  className="min-w-[100px]"
                  onClick={() => setSelectedDate(date)}
                >
                  {formatDate(date)}
                </Button>
              ))}
            </div>
          </div>
          
          {Object.keys(showtimesByTheater).length > 0 ? (
            <>
              {Object.keys(showtimesByTheater).map(theaterId => {
                const theater = theaters.find(t => t.id === theaterId);
                if (!theater) return null;
                
                return (
                  <div key={theaterId} className="bg-card rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{theater.name}</h3>
                        <p className="text-sm text-muted-foreground">{theater.address}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        {theater.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {showtimesByTheater[theaterId].map(showtime => (
                        <Link
                          key={showtime.id}
                          to={`/booking/${movie.id}/${theaterId}/${showtime.id}`}
                        >
                          <Button 
                            variant="outline" 
                            className="min-w-[80px]"
                          >
                            {showtime.time}
                            <span className="ml-1 text-xs text-muted-foreground">{showtime.screenType}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No showtimes available for this movie.</div>
              <p className="text-sm">Please check back later or select a different date.</p>
            </div>
          )}
        </section>
        
        {/* Similar Movies Section */}
        <section className="container mx-auto px-4 md:px-8 py-8">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies
              .filter(m => 
                m.id !== movie.id && 
                m.genre.some(g => movie.genre.includes(g))
              )
              .slice(0, 6)
              .map(similarMovie => (
                <Link 
                  key={similarMovie.id} 
                  to={`/movies/${similarMovie.id}`}
                  className="block transition-transform hover:scale-105"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={similarMovie.poster} 
                      alt={similarMovie.title} 
                      className="w-full aspect-[2/3] object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm mt-2 line-clamp-1">{similarMovie.title}</h3>
                </Link>
              ))
            }
          </div>
        </section>
      </main>
      
      {/* Trailer Dialog */}
      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-10" 
            onClick={() => setShowTrailer(false)}
          >
            <X className="h-6 w-6 text-white" />
          </Button>
          
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={movie.trailerUrl.replace('watch?v=', 'embed/')}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MovieDetails;
