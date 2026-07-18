import { Movie } from "@/types/movie";

export const STATIC_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    poster_path: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
    release_date: "2024-03-01",
    vote_average: 8.8,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: "2h 46m",
    rating: "PG-13",
    director: "Denis Villeneuve",
    trailer_url: "https://www.youtube.com/embed/Way9Dexny3w",
    cast: [
      {
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        profile_path: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Zendaya",
        character: "Chani",
        profile_path: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Rebecca Ferguson",
        character: "Lady Jessica",
        profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Austin Butler",
        character: "Feyd-Rautha Harkonnen",
        profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "CinematicMaster",
        content: "A monumental achievement in sci-fi cinema. The scale is absolutely massive, the visuals are breathtaking, and Hans Zimmer's score is otherworldly. A masterpiece of our generation.",
        rating: 10,
        date: "2024-03-02"
      },
      {
        author: "ReviewerGuy",
        content: "Denis Villeneuve does it again. The narrative pacing was tight despite the runtime. Timothée and Zendaya share an incredible dynamic.",
        rating: 9,
        date: "2024-03-05"
      }
    ]
  },
  {
    id: 2,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop",
    release_date: "2014-11-07",
    vote_average: 8.7,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: "2h 49m",
    rating: "PG-13",
    director: "Christopher Nolan",
    trailer_url: "https://www.youtube.com/embed/zSWdZVtXT7E",
    cast: [
      {
        name: "Matthew McConaughey",
        character: "Cooper",
        profile_path: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Anne Hathaway",
        character: "Brand",
        profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Jessica Chastain",
        character: "Murph",
        profile_path: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Michael Caine",
        character: "Professor Brand",
        profile_path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "SpaceEnthusiast",
        content: "Nolan weaves emotion and complex physics together seamlessly. The organ soundtrack is outstanding. It makes you feel so small yet so connected.",
        rating: 10,
        date: "2014-11-10"
      },
      {
        author: "MovieBuff99",
        content: "Matthew McConaughey delivers the performance of his career. The tesseract scene still gives me goosebumps every single time.",
        rating: 9.5,
        date: "2015-01-20"
      }
    ]
  },
  {
    id: 3,
    title: "The Dark Knight",
    tagline: "Why So Serious?",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
    release_date: "2008-07-18",
    vote_average: 9.0,
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 32m",
    rating: "PG-13",
    director: "Christopher Nolan",
    trailer_url: "https://www.youtube.com/embed/EXeTwQWrcwY",
    cast: [
      {
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Heath Ledger",
        character: "Joker",
        profile_path: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Gary Oldman",
        character: "Jim Gordon",
        profile_path: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Aaron Eckhart",
        character: "Harvey Dent / Two-Face",
        profile_path: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "GothamKnight",
        content: "Heath Ledger's performance is legendary. This isn't just a comic book movie; it's a phenomenal crime drama that sets the standard for the entire genre.",
        rating: 10,
        date: "2008-07-20"
      },
      {
        author: "CinephileX",
        content: "Intense, gritty, and thought-provoking. The moral dilemmas presented are real and Nolan handles the tension flawlessly.",
        rating: 10,
        date: "2008-08-02"
      }
    ]
  },
  {
    id: 4,
    title: "Spirited Away",
    tagline: "Nothing that happens is ever forgotten, even if you can't remember it.",
    overview: "A young girl, Chihiro, wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts. After her parents are turned into pigs by the witch Yubaba, Chihiro takes a job working in Yubaba's bathhouse to find a way to free herself and her parents and return to the human world.",
    poster_path: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
    release_date: "2001-07-20",
    vote_average: 8.6,
    genres: ["Animation", "Fantasy", "Family"],
    runtime: "2h 5m",
    rating: "PG",
    director: "Hayao Miyazaki",
    trailer_url: "https://www.youtube.com/embed/ByXuk9QqQkk",
    cast: [
      {
        name: "Rumi Hiiragi",
        character: "Chihiro (voice)",
        profile_path: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Miyu Irino",
        character: "Haku (voice)",
        profile_path: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Mari Natsuki",
        character: "Yubaba / Zeniba (voice)",
        profile_path: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "GhibliFanatic",
        content: "Miyazaki's animation is rich and incredibly imaginative. The world is filled with wonder, magic, and deep subtexts. A timeless fantasy.",
        rating: 10,
        date: "2002-10-15"
      }
    ]
  },
  {
    id: 5,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "Cobb, a skilled thief who steals valuable secrets from dream state, is offered a chance to have his criminal history erased as payment for inception: the implantation of another person's idea into their subconscious.",
    poster_path: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    release_date: "2010-07-16",
    vote_average: 8.8,
    genres: ["Sci-Fi", "Action", "Thriller"],
    runtime: "2h 28m",
    rating: "PG-13",
    director: "Christopher Nolan",
    trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0",
    cast: [
      {
        name: "Leonardo DiCaprio",
        character: "Cobb",
        profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        profile_path: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Elliot Page",
        character: "Ariadne",
        profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Tom Hardy",
        character: "Eames",
        profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "MindBender",
        content: "A mind-bending thrill ride that keeps you guessing until the very last frame. The dream levels are designed with mathematical brilliance.",
        rating: 9,
        date: "2010-07-18"
      }
    ]
  },
  {
    id: 6,
    title: "La La Land",
    tagline: "Here's to the fools who dream.",
    overview: "Sebastian and Mia are drawn together by their common desire to do what they love. But as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair.",
    poster_path: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    release_date: "2016-12-09",
    vote_average: 8.3,
    genres: ["Romance", "Drama", "Music"],
    runtime: "2h 8m",
    rating: "PG-13",
    director: "Damien Chazelle",
    trailer_url: "https://www.youtube.com/embed/0pdqf4P9MB8",
    cast: [
      {
        name: "Ryan Gosling",
        character: "Sebastian",
        profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Emma Stone",
        character: "Mia",
        profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "John Legend",
        character: "Keith",
        profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "JazzLover",
        content: "A gorgeous love letter to Hollywood and jazz. The opening dance scene is spectacular, and the melancholic ending is absolute perfection.",
        rating: 9.5,
        date: "2016-12-15"
      }
    ]
  },
  {
    id: 7,
    title: "Spider-Man: Into the Spider-Verse",
    tagline: "Anyone can wear the mask.",
    overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson Fisk uses a super collider, others from across the Spider-Verse are pulled into this dimension.",
    poster_path: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1200&auto=format&fit=crop",
    release_date: "2018-12-14",
    vote_average: 8.4,
    genres: ["Animation", "Action", "Sci-Fi"],
    runtime: "1h 57m",
    rating: "PG",
    director: "Bob Persichetti",
    trailer_url: "https://www.youtube.com/embed/tg52up16eq0",
    cast: [
      {
        name: "Shameik Moore",
        character: "Miles Morales / Spider-Man (voice)",
        profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Jake Johnson",
        character: "Peter B. Parker / Spider-Man (voice)",
        profile_path: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Hailee Steinfeld",
        character: "Gwen Stacy / Spider-Woman (voice)",
        profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "WebSlinger",
        content: "The best Spider-Man film ever made. The animation style is revolutionary—literally bringing a comic book page to life.",
        rating: 10,
        date: "2018-12-16"
      }
    ]
  },
  {
    id: 8,
    title: "Parasite",
    tagline: "Act like you own the place.",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    poster_path: "https://images.unsplash.com/photo-1601512492911-724aaab203af?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    release_date: "2019-05-30",
    vote_average: 8.5,
    genres: ["Thriller", "Drama", "Comedy"],
    runtime: "2h 12m",
    rating: "R",
    director: "Bong Joon Ho",
    trailer_url: "https://www.youtube.com/embed/5xH0HfJHsaY",
    cast: [
      {
        name: "Song Kang-ho",
        character: "Ki-taek",
        profile_path: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Lee Sun-kyun",
        character: "Mr. Park",
        profile_path: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
      },
      {
        name: "Cho Yeo-jeong",
        character: "Mrs. Park",
        profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        author: "BongHive",
        content: "A masterclass in genre-bending. It transition from light comedy to heist thriller to dark horror flawlessly.",
        rating: 10,
        date: "2019-10-12"
      }
    ]
  }
];
