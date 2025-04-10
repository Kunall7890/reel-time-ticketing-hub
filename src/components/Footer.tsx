
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-cinema-dark border-t border-gray-800 mt-12">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-cinema-red font-bold text-2xl mb-4">
              Reel<span className="text-cinema-gold">Time</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your ultimate destination for booking cinema tickets online. Experience movies the way they're meant to be seen.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-muted-foreground hover:text-white">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/theaters" className="text-muted-foreground hover:text-white">
                  Theaters
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-muted-foreground hover:text-white">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-muted-foreground hover:text-white">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-white">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <PhoneCall size={16} className="mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">support@reeltime.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-muted rounded-l-md text-sm w-full focus:outline-none"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 ReelTime. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <img src="https://via.placeholder.com/40x24" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x24" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x24" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x24" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
