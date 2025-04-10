
import { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from 'lucide-react';
import { Movie } from '@/data/movies';
import MovieCard from '@/components/MovieCard';
import { Link } from 'react-router-dom';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  showTabs?: boolean;
  seeAllLink?: string;
}

export function MovieSection({ 
  title, 
  movies, 
  showTabs = false,
  seeAllLink
}: MovieSectionProps) {
  const [filter, setFilter] = useState<'all' | 'now-showing' | 'coming-soon'>('all');
  
  const filteredMovies = showTabs 
    ? (filter === 'all' 
        ? movies 
        : movies.filter(movie => movie.status === filter))
    : movies;
  
  return (
    <section className="py-8">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {seeAllLink && (
            <Link 
              to={seeAllLink}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              See All <ChevronRight size={16} />
            </Link>
          )}
        </div>
        
        {showTabs ? (
          <Tabs 
            defaultValue="all" 
            className="mb-6"
            onValueChange={(value) => setFilter(value as any)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="now-showing">Now Showing</TabsTrigger>
              <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : null}
        
        <ScrollArea className="pb-4 -mx-4 px-4">
          <div className="flex gap-4">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="min-w-[180px] md:min-w-[200px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}

export default MovieSection;
