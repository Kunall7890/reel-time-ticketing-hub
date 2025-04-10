
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import MovieSection from "../components/MovieSection";
import { movies } from "../data/movies";

const nowShowing = movies.filter((movie) => movie.status === "now-showing");
const comingSoon = movies.filter((movie) => movie.status === "coming-soon");

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroCarousel movies={nowShowing} />
        
        <div className="container mx-auto px-4 mt-8 mb-4">
          <Link to="/book-now">
            <Button 
              size="lg" 
              className="w-full md:w-auto md:mx-auto flex items-center justify-center gap-2"
            >
              <Ticket className="h-5 w-5" />
              Book Tickets Now
            </Button>
          </Link>
        </div>
        
        <MovieSection title="Now Showing" movies={nowShowing} />
        <MovieSection title="Coming Soon" movies={comingSoon} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
