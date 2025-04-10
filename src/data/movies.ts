
export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  genre: string[];
  duration: number; // minutes
  language: string[];
  releaseDate: string;
  rating: number;
  synopsis: string;
  cast: {
    name: string;
    character: string;
    photo: string;
  }[];
  director: string;
  trailerUrl: string;
  status: 'now-showing' | 'coming-soon';
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600",
    backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    language: ["English", "Hindi"],
    releaseDate: "2023-07-16",
    rating: 8.8,
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: [
      {
        name: "Leonardo DiCaprio",
        character: "Cobb",
        photo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop",
      },
      {
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        photo: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=150&h=150&fit=crop",
      },
      {
        name: "Ellen Page",
        character: "Ariadne",
        photo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=150&h=150&fit=crop",
      }
    ],
    director: "Christopher Nolan",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    status: "now-showing",
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    poster: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600",
    backdrop: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200",
    genre: ["Drama", "Crime"],
    duration: 142,
    language: ["English", "Hindi"],
    releaseDate: "2023-08-01",
    rating: 9.3,
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    cast: [
      {
        name: "Tim Robbins",
        character: "Andy Dufresne",
        photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop",
      },
      {
        name: "Morgan Freeman",
        character: "Ellis Boyd 'Red' Redding",
        photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop",
      }
    ],
    director: "Frank Darabont",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    status: "now-showing",
  },
  {
    id: "3",
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    backdrop: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    language: ["English"],
    releaseDate: "2023-07-25",
    rating: 8.6,
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: [
      {
        name: "Matthew McConaughey",
        character: "Cooper",
        photo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=150&h=150&fit=crop",
      },
      {
        name: "Anne Hathaway",
        character: "Brand",
        photo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop",
      }
    ],
    director: "Christopher Nolan",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    status: "now-showing",
  },
  {
    id: "4",
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
    backdrop: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=1200",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    language: ["English", "Hindi"],
    releaseDate: "2023-09-15",
    rating: 9.0,
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cast: [
      {
        name: "Christian Bale",
        character: "Bruce Wayne",
        photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop",
      },
      {
        name: "Heath Ledger",
        character: "Joker",
        photo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=150&h=150&fit=crop",
      }
    ],
    director: "Christopher Nolan",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    status: "coming-soon",
  },
  {
    id: "5",
    title: "Pulp Fiction",
    poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600",
    backdrop: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200",
    genre: ["Crime", "Drama"],
    duration: 154,
    language: ["English"],
    releaseDate: "2023-10-05",
    rating: 8.9,
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: [
      {
        name: "John Travolta",
        character: "Vincent Vega",
        photo: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=150&h=150&fit=crop",
      },
      {
        name: "Samuel L. Jackson",
        character: "Jules Winnfield",
        photo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop",
      }
    ],
    director: "Quentin Tarantino",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    status: "coming-soon",
  },
  {
    id: "6",
    title: "Avatar",
    poster: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600",
    backdrop: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200",
    genre: ["Action", "Adventure", "Fantasy"],
    duration: 162,
    language: ["English", "Hindi", "Tamil", "Telugu"],
    releaseDate: "2023-11-20",
    rating: 7.8,
    synopsis: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    cast: [
      {
        name: "Sam Worthington",
        character: "Jake Sully",
        photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop",
      },
      {
        name: "Zoe Saldana",
        character: "Neytiri",
        photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop",
      }
    ],
    director: "James Cameron",
    trailerUrl: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
    status: "coming-soon",
  }
];
