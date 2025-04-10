
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import MovieSection from '@/components/MovieSection';
import { movies } from '@/data/movies';

const Index = () => {
  // Auto-scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter movies for different sections
  const heroMovies = movies.slice(0, 3);
  const nowShowingMovies = movies.filter(movie => movie.status === "now-showing");
  const comingSoonMovies = movies.filter(movie => movie.status === "coming-soon");
  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-0">
        <HeroCarousel movies={heroMovies} />
        
        <div className="mt-4 mb-2 px-4 py-2 bg-muted overflow-hidden">
          <div className="news-ticker">
            <span className="font-medium text-sm">🎬 New Release: Avatar 2 - The Way of Water • 🎟️ Buy One Get One offer on Tuesday shows • 🍿 20% off on combo meals this weekend • 🎬 Advance booking open for Black Panther: Wakanda Forever</span>
          </div>
        </div>
        
        <MovieSection 
          title="Now Showing" 
          movies={nowShowingMovies}
          seeAllLink="/movies?filter=now-showing"
        />
        
        <MovieSection 
          title="Coming Soon" 
          movies={comingSoonMovies}
          seeAllLink="/movies?filter=coming-soon"
        />
        
        <MovieSection 
          title="Top Rated Movies" 
          movies={topRatedMovies}
          seeAllLink="/movies?filter=top-rated"
        />

        <section className="py-10 bg-muted">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="mb-3 text-cinema-red text-xl font-bold">Student Discount</div>
                  <p className="text-muted-foreground">20% off on movie tickets with valid student ID</p>
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="mb-3 text-cinema-red text-xl font-bold">Weekend Family Pass</div>
                  <p className="text-muted-foreground">Buy 3 tickets, get 1 free for any weekend show</p>
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="mb-3 text-cinema-red text-xl font-bold">Loyalty Rewards</div>
                  <p className="text-muted-foreground">Earn points with every booking, redeem for free tickets</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-6">Why Book With Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎟️</span>
                </div>
                <h3 className="font-bold mb-2">Secure Booking</h3>
                <p className="text-sm text-muted-foreground">Safe and secure payment options</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold mb-2">Instant Confirmation</h3>
                <p className="text-sm text-muted-foreground">Immediate ticket confirmation</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-bold mb-2">No Extra Fees</h3>
                <p className="text-sm text-muted-foreground">No hidden charges or booking fees</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="font-bold mb-2">Exclusive Offers</h3>
                <p className="text-sm text-muted-foreground">Access to special deals and promotions</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
