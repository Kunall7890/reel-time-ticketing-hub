
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Search, 
  User, 
  Heart, 
  ChevronDown, 
  MenuIcon,
  X
} from 'lucide-react';
import { cities } from '@/data/theaters';
import { cn } from '@/lib/utils';

export function Header() {
  const [city, setCity] = useState("New York");
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCitySelector(false);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 transition-all duration-300",
      isScrolled ? "bg-cinema-dark/90 backdrop-blur" : "bg-transparent"
    )}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-cinema-red font-bold text-2xl md:text-3xl">Reel<span className="text-cinema-gold">Time</span></div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button 
                onClick={() => setShowCitySelector(!showCitySelector)}
                className="flex items-center text-sm font-medium hover:text-cinema-red"
              >
                <span>{city}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {showCitySelector && (
                <div className="absolute top-full left-0 mt-2 bg-card rounded-md shadow-lg py-2 w-48 z-10">
                  {cities.map((cityOption) => (
                    <button
                      key={cityOption}
                      onClick={() => handleCitySelect(cityOption)}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-muted",
                        city === cityOption && "text-cinema-red font-medium"
                      )}
                    >
                      {cityOption}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-sm font-medium hover:text-cinema-red">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="text-sm font-medium hover:text-cinema-red">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/theaters" className="text-sm font-medium hover:text-cinema-red">
                    Theaters
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-sm font-medium hover:text-cinema-red">
                    Offers
                  </Link>
                </li>
              </ul>
            </nav>
            
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for movies, theaters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1.5 pl-3 pr-9 rounded-full bg-muted text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                <Search size={16} />
              </button>
            </form>
            
            <div className="flex space-x-4 items-center">
              <Link to="/wishlist" className="text-muted-foreground hover:text-primary">
                <Heart size={20} />
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden lg:inline">Account</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card mt-4 rounded-lg p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <button 
                onClick={() => setShowCitySelector(!showCitySelector)}
                className="flex items-center text-sm font-medium"
              >
                <span>{city}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {showCitySelector && (
                <div className="absolute top-full left-0 mt-2 bg-card rounded-md shadow-lg py-2 w-48 z-10">
                  {cities.map((cityOption) => (
                    <button
                      key={cityOption}
                      onClick={() => handleCitySelect(cityOption)}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-muted",
                        city === cityOption && "text-cinema-red font-medium"
                      )}
                    >
                      {cityOption}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/profile" className="text-muted-foreground hover:text-primary">
              <User size={20} />
            </Link>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search for movies, theaters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-3 pr-9 rounded-full bg-muted text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              <Search size={16} />
            </button>
          </form>
          
          <nav>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm font-medium hover:bg-muted rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/movies"
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block py-2 px-3 text-sm font-medium hover:bg-muted rounded"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link 
                  to="/theaters" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm font-medium hover:bg-muted rounded"
                >
                  Theaters
                </Link>
              </li>
              <li>
                <Link 
                  to="/offers" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm font-medium hover:bg-muted rounded"
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link 
                  to="/wishlist" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 text-sm font-medium hover:bg-muted rounded"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
