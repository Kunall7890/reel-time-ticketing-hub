
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies, Movie } from '@/data/movies';
import { cn } from '@/lib/utils';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState('popularity');

  // Extract all unique genres from movies
  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genre)));
  
  // Extract all unique languages from movies
  const allLanguages = Array.from(new Set(movies.flatMap(movie => movie.language)));

  useEffect(() => {
    // Filter and sort movies based on current filters
    let result = [...movies];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.genre.some(g => g.toLowerCase().includes(query)) ||
        movie.synopsis.toLowerCase().includes(query)
      );
    }
    
    // Apply genre filter
    if (genreFilter !== 'all') {
      result = result.filter(movie => 
        movie.genre.includes(genreFilter)
      );
    }
    
    // Apply language filter
    if (languageFilter !== 'all') {
      result = result.filter(movie => 
        movie.language.includes(languageFilter)
      );
    }
    
    // Apply status filter
    if (statusFilter === 'now-showing') {
      result = result.filter(movie => movie.status === 'now-showing');
    } else if (statusFilter === 'coming-soon') {
      result = result.filter(movie => movie.status === 'coming-soon');
    } else if (statusFilter === 'top-rated') {
      result = result.filter(movie => movie.rating >= 8.0);
    }
    
    // Apply sorting
    if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'release-date') {
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    }
    
    setFilteredMovies(result);
  }, [searchQuery, genreFilter, languageFilter, statusFilter, sortBy]);
  
  useEffect(() => {
    // Update URL with status filter
    if (statusFilter !== 'all') {
      searchParams.set('filter', statusFilter);
    } else {
      searchParams.delete('filter');
    }
    setSearchParams(searchParams);
  }, [statusFilter]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const clearFilters = () => {
    setGenreFilter('all');
    setLanguageFilter('all');
    setStatusFilter('all');
    setSortBy('popularity');
    setSearchQuery('');
  };
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl font-bold mb-1">Movies</h1>
          <p className="text-muted-foreground mb-6">Browse all movies in our catalog</p>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="w-full py-2 pl-4 pr-10 rounded-lg bg-card border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                <Search size={18} />
              </button>
            </form>
            
            <div className="flex flex-wrap gap-2 items-center">
              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden gap-2">
                    <Filter size={16} /> Filter
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Movies</SheetTitle>
                    <SheetDescription>
                      Apply filters to find specific movies
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select 
                        value={statusFilter} 
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Movies</SelectItem>
                          <SelectItem value="now-showing">Now Showing</SelectItem>
                          <SelectItem value="coming-soon">Coming Soon</SelectItem>
                          <SelectItem value="top-rated">Top Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Genre</label>
                      <Select 
                        value={genreFilter} 
                        onValueChange={setGenreFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Genres</SelectItem>
                          {allGenres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <Select 
                        value={languageFilter} 
                        onValueChange={setLanguageFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          {allLanguages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort By</label>
                      <Select 
                        value={sortBy} 
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sort movies" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="rating">Rating (High to Low)</SelectItem>
                          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                          <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                          <SelectItem value="release-date">Release Date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-2">
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Movies</SelectItem>
                    <SelectItem value="now-showing">Now Showing</SelectItem>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Genre: {genreFilter === 'all' ? 'All' : genreFilter}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => setGenreFilter('all')}>
                      All Genres
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {allGenres.map((genre) => (
                      <DropdownMenuItem 
                        key={genre}
                        onClick={() => setGenreFilter(genre)}
                      >
                        {genre}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Language: {languageFilter === 'all' ? 'All' : languageFilter}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => setLanguageFilter('all')}>
                      All Languages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {allLanguages.map((language) => (
                      <DropdownMenuItem 
                        key={language}
                        onClick={() => setLanguageFilter(language)}
                      >
                        {language}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Select 
                  value={sortBy} 
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                    <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                    <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                    <SelectItem value="release-date">Release Date</SelectItem>
                  </SelectContent>
                </Select>
                
                {(genreFilter !== 'all' || languageFilter !== 'all' || sortBy !== 'popularity') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-105 shadow-lg">
                    <div className="relative">
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full aspect-[2/3] object-cover"
                      />
                      {movie.status === 'coming-soon' && (
                        <div className="absolute top-2 right-2 bg-cinema-gold text-black text-xs px-2 py-1 rounded">
                          Coming Soon
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-cinema-gold fill-cinema-gold" />
                          <span className="text-sm font-bold">{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold mb-1 line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Clock size={12} className="mr-1" />
                        <span>{formatDuration(movie.duration)}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map((genre, i) => (
                          <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {genre}
                          </span>
                        ))}
                        {movie.genre.length > 2 && (
                          <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            +{movie.genre.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold mb-2">No Movies Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any movies matching your search criteria.
              </p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MoviesPage;
