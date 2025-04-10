
export interface Theater {
  id: string;
  name: string;
  location: string;
  city: string;
  address: string;
  facilities: string[];
  showTimes: ShowTime[];
}

export interface ShowTime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  screenType: 'Standard' | '3D' | 'IMAX' | 'VIP';
  price: {
    standard: number;
    premium: number;
    vip?: number;
  };
}

export const theaters: Theater[] = [
  {
    id: "1",
    name: "PVR Cinemas",
    location: "Downtown",
    city: "New York",
    address: "123 Main Street, Downtown, New York",
    facilities: ["Parking", "Food Court", "Wheelchair Access", "Dolby Atmos"],
    showTimes: [
      {
        id: "st1",
        movieId: "1",
        date: "2023-07-16",
        time: "10:30",
        screenType: "Standard",
        price: {
          standard: 12,
          premium: 18
        }
      },
      {
        id: "st2",
        movieId: "1",
        date: "2023-07-16",
        time: "14:00",
        screenType: "3D",
        price: {
          standard: 15,
          premium: 22
        }
      },
      {
        id: "st3",
        movieId: "2",
        date: "2023-07-16",
        time: "18:30",
        screenType: "Standard",
        price: {
          standard: 12,
          premium: 18
        }
      },
      {
        id: "st4",
        movieId: "3",
        date: "2023-07-16",
        time: "21:00",
        screenType: "IMAX",
        price: {
          standard: 18,
          premium: 24,
          vip: 30
        }
      }
    ]
  },
  {
    id: "2",
    name: "AMC Theaters",
    location: "Uptown",
    city: "New York",
    address: "456 Park Avenue, Uptown, New York",
    facilities: ["Parking", "Food Court", "Recliner Seats", "IMAX"],
    showTimes: [
      {
        id: "st5",
        movieId: "1",
        date: "2023-07-16",
        time: "11:00",
        screenType: "IMAX",
        price: {
          standard: 18,
          premium: 24,
          vip: 30
        }
      },
      {
        id: "st6",
        movieId: "2",
        date: "2023-07-16",
        time: "15:30",
        screenType: "Standard",
        price: {
          standard: 12,
          premium: 18
        }
      },
      {
        id: "st7",
        movieId: "3",
        date: "2023-07-16",
        time: "19:00",
        screenType: "3D",
        price: {
          standard: 15,
          premium: 22
        }
      }
    ]
  },
  {
    id: "3",
    name: "Cineworld",
    location: "Midtown",
    city: "Los Angeles",
    address: "789 Broadway, Midtown, Los Angeles",
    facilities: ["Parking", "Bar", "4DX", "VIP Lounge"],
    showTimes: [
      {
        id: "st8",
        movieId: "1",
        date: "2023-07-16",
        time: "10:00",
        screenType: "Standard",
        price: {
          standard: 14,
          premium: 20
        }
      },
      {
        id: "st9",
        movieId: "2",
        date: "2023-07-16",
        time: "13:30",
        screenType: "Standard",
        price: {
          standard: 14,
          premium: 20
        }
      },
      {
        id: "st10",
        movieId: "3",
        date: "2023-07-16",
        time: "17:00",
        screenType: "VIP",
        price: {
          standard: 20,
          premium: 28,
          vip: 40
        }
      }
    ]
  }
];

export const cities = [
  "New York",
  "Los Angeles", 
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia"
];
