
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/data/movies";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie;
  variant?: "default" | "large" | "small";
}

export function MovieCard({ movie, variant = "default" }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (variant === "small") {
    return (
      <Link to={`/movies/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg shadow-md bg-card transition-transform hover:scale-105">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-48 object-cover"
          />
          <div className="p-2">
            <h3 className="font-medium text-sm truncate">{movie.title}</h3>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link to={`/movies/${movie.id}`} className="block">
        <div 
          className="relative overflow-hidden rounded-lg shadow-md bg-card h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[2/3] overflow-hidden">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-opacity duration-300",
                isHovered && "opacity-100"
              )}
            />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-1.5 bg-black/50 rounded-full transition-transform duration-300"
              style={{ transform: isHovered ? "translateY(0)" : "translateY(-10px)" }}
            >
              <Heart 
                size={16} 
                className={isFavorite ? "fill-cinema-red text-cinema-red" : "text-white"} 
              />
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{movie.title}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold mr-1" />
                <span className="text-sm font-medium">{movie.rating}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {movie.genre.slice(0, 2).map((genre, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-muted-foreground text-xs mb-4">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDuration(movie.duration)}</span>
            </div>
            <Button size="sm" className="w-full">Book Now</Button>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div 
        className="relative overflow-hidden rounded-lg shadow-md bg-card h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )}
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-1.5 bg-black/50 rounded-full transition-transform duration-300"
            style={{ transform: isHovered ? "translateY(0)" : "translateY(-10px)" }}
          >
            <Heart 
              size={16} 
              className={isFavorite ? "fill-cinema-red text-cinema-red" : "text-white"} 
            />
          </button>
        </div>
        <div className="p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-sm line-clamp-1">{movie.title}</h3>
            <div className="flex items-center ml-2">
              <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold mr-0.5" />
              <span className="text-xs font-medium">{movie.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatDuration(movie.duration)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
