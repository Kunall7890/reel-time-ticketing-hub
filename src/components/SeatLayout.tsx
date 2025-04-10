
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface SeatLayoutProps {
  onSeatsSelected: (seats: string[], totalPrice: number) => void;
  price: {
    standard: number;
    premium: number;
    vip?: number;
  };
}

type SeatCategory = "standard" | "premium" | "vip";
type SeatStatus = "available" | "booked" | "selected";

interface Seat {
  id: string;
  row: string;
  number: number;
  category: SeatCategory;
  status: SeatStatus;
}

export function SeatLayout({ onSeatsSelected, price }: SeatLayoutProps) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    // Generate seats
    const generateSeats = () => {
      const newSeats: Seat[] = [];
      const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
      
      rows.forEach((row, rowIndex) => {
        const seatsInRow = rowIndex < 3 ? 8 : 10;
        for (let i = 1; i <= seatsInRow; i++) {
          // Random booking status with 20% chance of being booked
          const isBooked = Math.random() < 0.2;
          
          // Set category based on row
          let category: SeatCategory = "standard";
          if (rowIndex < 2) {
            category = "premium";
          } else if (rowIndex >= 6) {
            category = "vip";
          }
          
          newSeats.push({
            id: `${row}${i}`,
            row,
            number: i,
            category,
            status: isBooked ? "booked" : "available",
          });
        }
      });
      
      setSeats(newSeats);
    };
    
    generateSeats();
  }, []);

  useEffect(() => {
    // Update total price when selected seats change
    const newTotal = selectedSeats.reduce((total, seat) => {
      switch(seat.category) {
        case "premium": 
          return total + price.premium;
        case "vip": 
          return total + (price.vip || price.premium * 1.5);
        default: 
          return total + price.standard;
      }
    }, 0);
    
    setTotalPrice(newTotal);
  }, [selectedSeats, price]);

  useEffect(() => {
    // Timer countdown
    if (selectedSeats.length > 0 && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedSeats.length > 0) {
      handleTimeUp();
    }
  }, [timeLeft, selectedSeats]);
  
  const handleTimeUp = () => {
    toast.error("Time expired! Your seat selection has been released.");
    
    // Reset selected seats
    setSeats(seats.map(seat => {
      if (seat.status === "selected") {
        return { ...seat, status: "available" };
      }
      return seat;
    }));
    
    setSelectedSeats([]);
    setTimeLeft(300);
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;
    
    // If seat is already selected, unselect it
    if (seat.status === "selected") {
      setSeats(seats.map(s => {
        if (s.id === seat.id) {
          return { ...s, status: "available" };
        }
        return s;
      }));
      
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
      
      // Reset timer if all seats are unselected
      if (selectedSeats.length === 1) {
        setTimeLeft(300);
      }
      
      return;
    }
    
    // If first seat is being selected, start the timer
    if (selectedSeats.length === 0) {
      setTimeLeft(300);
    }
    
    // Limit to 8 seats
    if (selectedSeats.length >= 8) {
      toast.warning("You can select a maximum of 8 seats at a time.");
      return;
    }
    
    // Select the seat
    setSeats(seats.map(s => {
      if (s.id === seat.id) {
        return { ...s, status: "selected" };
      }
      return s;
    }));
    
    setSelectedSeats([...selectedSeats, seat]);
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast.warning("Please select at least one seat to proceed.");
      return;
    }
    
    onSeatsSelected(
      selectedSeats.map(seat => seat.id),
      totalPrice
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="select-none">
      <div className="mb-8">
        <div className="theater-screen"></div>
        
        <div className="max-w-3xl mx-auto">
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div key={row} className="flex justify-center mb-2">
              <div className="w-6 h-8 flex items-center justify-center mr-2 text-muted-foreground">
                {row}
              </div>
              <div className="flex flex-wrap justify-center">
                {rowSeats.map((seat) => (
                  <button
                    key={seat.id}
                    className={cn(
                      "seat",
                      seat.status === "available" && seat.category === "standard" && "seat-available",
                      seat.status === "available" && seat.category === "premium" && "seat-premium",
                      seat.status === "available" && seat.category === "vip" && "seat-vip",
                      seat.status === "selected" && "seat-selected",
                      seat.status === "booked" && "seat-booked"
                    )}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === "booked"}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
              <div className="w-6 h-8 flex items-center justify-center ml-2 text-muted-foreground">
                {row}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center flex-wrap gap-6 mb-4">
        <div className="flex items-center">
          <div className="seat-available w-4 h-4 mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="seat-selected w-4 h-4 mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="seat-booked w-4 h-4 mr-2"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="seat-premium w-4 h-4 mr-2"></div>
          <span className="text-sm">Premium (${price.premium})</span>
        </div>
        {price.vip && (
          <div className="flex items-center">
            <div className="seat-vip w-4 h-4 mr-2"></div>
            <span className="text-sm">VIP (${price.vip})</span>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <p className="text-sm mb-1">Selected Seats ({selectedSeats.length})</p>
            <div className="text-lg font-bold">
              {selectedSeats.length > 0 ? selectedSeats.map(seat => seat.id).join(", ") : "None"}
            </div>
          </div>
          
          {selectedSeats.length > 0 && (
            <div className="mt-4 md:mt-0 text-center">
              <p className="text-sm mb-1">Time Remaining</p>
              <div 
                className={cn(
                  "text-lg font-bold",
                  timeLeft < 60 && "text-red-500 animate-pulse"
                )}
              >
                {formatTime(timeLeft)}
              </div>
            </div>
          )}
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm mb-1">Total</p>
            <div className="text-xl font-bold">${totalPrice.toFixed(2)}</div>
          </div>
        </div>
        
        <Button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="w-full"
          size="lg"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}

export default SeatLayout;
