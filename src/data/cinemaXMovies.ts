export type CinemaCategory = 'الكل' | 'أكشن' | 'خيال علمي' | 'دراما' | 'مغامرة';

export interface CinemaXMovie {
  id: number;
  title: string;
  category: Exclude<CinemaCategory, 'الكل'>;
  year: number;
  rating: string;
  ratingNum: number;
  duration: string;
  director: string;
  actors: string[];
  image: string;
  desc: string;
  video?: string;
  posterTheme:
    | 'inception'
    | 'interstellar'
    | 'batman'
    | 'dune'
    | 'joker'
    | 'avatar'
    | 'avengers'
    | 'spiderman';
}

export const HERO_BACKDROP_URL =
  'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg';

export const CINEMA_X_CATEGORIES: CinemaCategory[] = [
  'الكل',
  'أكشن',
  'خيال علمي',
  'دراما',
  'مغامرة',
];

export const CINEMA_X_MOVIES: CinemaXMovie[] = [
  {
    id: 1,
    title: 'Inception',
    category: 'خيال علمي',
    year: 2010,
    rating: '8.8',
    ratingNum: 8.8,
    duration: '2س 28د',
    director: 'Christopher Nolan',
    actors: [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Elliot Page',
      'Tom Hardy',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    desc: 'رحلة داخل عالم الأحلام والأفكار، حيث يصبح الخيال حقيقة.',
    posterTheme: 'inception',
  },
  {
    id: 2,
    title: 'Interstellar',
    category: 'خيال علمي',
    year: 2014,
    rating: '8.7',
    ratingNum: 8.7,
    duration: '2س 49د',
    director: 'Christopher Nolan',
    actors: [
      'Matthew McConaughey',
      'Anne Hathaway',
      'Jessica Chastain',
      'Michael Caine',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    desc: 'مغامرة فضائية مذهلة لإنقاذ مستقبل البشرية.',
    posterTheme: 'interstellar',
  },
  {
    id: 3,
    title: 'The Batman',
    category: 'أكشن',
    year: 2022,
    rating: '7.8',
    ratingNum: 7.8,
    duration: '2س 56د',
    director: 'Matt Reeves',
    actors: [
      'Robert Pattinson',
      'Zoë Kravitz',
      'Paul Dano',
      'Jeffrey Wright',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    desc: 'باتمان يواجه لغزاً مظلماً يهدد مدينة جوثام.',
    posterTheme: 'batman',
  },
  {
    id: 4,
    title: 'Dune',
    category: 'مغامرة',
    year: 2021,
    rating: '8.0',
    ratingNum: 8.0,
    duration: '2س 35د',
    director: 'Denis Villeneuve',
    actors: [
      'Timothée Chalamet',
      'Rebecca Ferguson',
      'Oscar Isaac',
      'Zendaya',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    desc: 'رحلة ملحمية إلى كوكب أراكيس.',
    posterTheme: 'dune',
  },
  {
    id: 5,
    title: 'Joker',
    category: 'دراما',
    year: 2019,
    rating: '8.4',
    ratingNum: 8.4,
    duration: '2س 02د',
    director: 'Todd Phillips',
    actors: [
      'Joaquin Phoenix',
      'Robert De Niro',
      'Zazie Beetz',
      'Frances Conroy',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    desc: 'قصة تحول رجل مهمش إلى شخصية غامضة.',
    posterTheme: 'joker',
  },
  {
    id: 6,
    title: 'Avatar',
    category: 'مغامرة',
    year: 2009,
    rating: '7.9',
    ratingNum: 7.9,
    duration: '2س 42د',
    director: 'James Cameron',
    actors: [
      'Sam Worthington',
      'Zoe Saldaña',
      'Sigourney Weaver',
      'Stephen Lang',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
    desc: 'عالم خيالي مليء بالمغامرات والأسرار.',
    posterTheme: 'avatar',
  },
  {
    id: 7,
    title: 'Avengers: Endgame',
    category: 'أكشن',
    year: 2019,
    rating: '8.4',
    ratingNum: 8.4,
    duration: '3س 01د',
    director: 'Anthony & Joe Russo',
    actors: [
      'Robert Downey Jr.',
      'Chris Evans',
      'Scarlett Johansson',
      'Mark Ruffalo',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    desc: 'المواجهة الأخيرة للأبطال لإنقاذ الكون.',
    posterTheme: 'avengers',
  },
  {
    id: 8,
    title: 'Spider-Man',
    category: 'أكشن',
    year: 2021,
    rating: '8.2',
    ratingNum: 8.2,
    duration: '2س 28د',
    director: 'Jon Watts',
    actors: [
      'Tom Holland',
      'Zendaya',
      'Benedict Cumberbatch',
      'Jacob Batalon',
    ],
    image:
      'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    desc: 'مغامرة الرجل العنكبوت في عالم مليء بالمفاجآت.',
    posterTheme: 'spiderman',
  },
];
