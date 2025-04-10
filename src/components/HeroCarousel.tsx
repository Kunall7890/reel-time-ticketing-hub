
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Movie } from '@/data/movies';

interface HeroCarouselProps {
  movies: Movie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };
  
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Slides */}
      {movies.map((movie, index) => (
        <div 
          key={movie.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onTransitionEnd={handleTransitionEnd}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl animate-slide-up">
                <div className="flex gap-2 mb-3">
                  {movie.genre.slice(0, 3).map((genre, i) => (
                    <span key={i} className="text-xs md:text-sm px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                      {genre}
                    </span>
                  ))}
                </div>
                <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-4">
                  {movie.title}
                </h1>
                <div className="flex items-center mb-4 text-sm md:text-base">
                  <div className="flex items-center mr-4">
                    <div className="text-cinema-gold font-bold mr-1">{movie.rating}</div>
                    <div className="text-gray-400">/ 10</div>
                  </div>
                  <div className="mr-4">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</div>
                  <div>{movie.language.join(', ')}</div>
                </div>
                <p className="text-sm md:text-base text-gray-300 mb-6 line-clamp-2 md:line-clamp-3">
                  {movie.synopsis}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/movies/${movie.id}`}>
                    <Button size="lg" className="gap-2 shadow-lg">
                      Book Now
                    </Button>
                  </Link>
                  <a 
                    href={movie.trailerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="gap-2">
                      <Play size={16} /> Watch Trailer
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors focus:outline-none"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors focus:outline-none"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === currentSlide 
                ? "bg-white scale-110" 
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
