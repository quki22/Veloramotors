import type { Motorcycle } from "../types/motorcycle";

/*
  Демонстрационные данные для портфолио.
  Перед публикацией реального магазина цены и характеристики
  необходимо заменить официальными данными.
*/

export const motorcycles: Motorcycle[] = [
  {
    id: 1,
    slug: "ducati-panigale-v4-s",
    brand: "Ducati",
    model: "Panigale V4 S",
    category: "Superbike",
    year: 2026,
    engineCapacity: 1103,
    horsepower: 216,
    mileage: 0,
    condition: "new",
    available: true,
    featured: true,
    price: 41_900,
    priceType: "from",
    image:
      "/images/motorcycles-v2/ducati-panigale-v4-s.webp",
    gallery: [
      "/images/motorcycles-v2/ducati-panigale-v4-s.webp",
    ],
    description: {
      en: "An uncompromising Italian superbike combining advanced aerodynamics, precise handling and exceptional performance.",
      ru: "Бескомпромиссный итальянский супербайк, сочетающий продвинутую аэродинамику, точную управляемость и исключительную производительность.",
    },
  },

  {
    id: 2,
    slug: "ducati-diavel-v4",
    brand: "Ducati",
    model: "Diavel V4",
    category: "Cruiser",
    year: 2026,
    engineCapacity: 1158,
    horsepower: 168,
    mileage: 0,
    condition: "new",
    available: true,
    featured: false,
    price: 30_900,
    priceType: "from",
    image:
      "/images/motorcycles-v2/ducati-diavel-v4.webp",
    gallery: [
      "/images/motorcycles-v2/ducati-diavel-v4.webp",
    ],
    description: {
      en: "A muscular premium cruiser that combines unmistakable Italian design with superbike-inspired performance.",
      ru: "Мощный премиальный круизер, объединяющий узнаваемый итальянский дизайн и динамику спортивного мотоцикла.",
    },
  },

  {
    id: 3,
    slug: "bmw-m-1000-rr",
    brand: "BMW Motorrad",
    model: "M 1000 RR",
    category: "Performance",
    year: 2026,
    engineCapacity: 999,
    horsepower: 212,
    mileage: 0,
    condition: "new",
    available: true,
    featured: true,
    price: 40_500,
    priceType: "from",
    image:
      "/images/motorcycles-v2/bmw-m-1000-rr.webp",
    gallery: [
      "/images/motorcycles-v2/bmw-m-1000-rr.webp",
    ],
    description: {
      en: "A high-performance motorcycle created for riders who value racing technology, engineering precision and total control.",
      ru: "Высокопроизводительный мотоцикл для тех, кто ценит гоночные технологии, инженерную точность и полный контроль.",
    },
  },

  {
    id: 4,
    slug: "bmw-r-1300-gs",
    brand: "BMW Motorrad",
    model: "R 1300 GS",
    category: "Adventure",
    year: 2026,
    engineCapacity: 1300,
    horsepower: 145,
    mileage: 0,
    condition: "new",
    available: true,
    featured: false,
    price: 24_900,
    priceType: "from",
    image:
      "/images/motorcycles-v2/bmw-r-1300-gs.webp",
    gallery: [
      "/images/motorcycles-v2/bmw-r-1300-gs.webp",
    ],
    description: {
      en: "A premium adventure motorcycle engineered for long-distance travel, difficult routes and everyday comfort.",
      ru: "Премиальный туристический эндуро для дальних путешествий, сложных маршрутов и комфортной ежедневной езды.",
    },
  },

  {
    id: 5,
    slug: "mv-agusta-superveloce-1000",
    brand: "MV Agusta",
    model: "Superveloce 1000",
    category: "Limited Edition",
    year: 2025,
    engineCapacity: 998,
    horsepower: 208,
    mileage: 0,
    condition: "new",
    available: true,
    featured: true,
    price: null,
    priceType: "request",
    image:
      "/images/motorcycles-v2/mv-agusta-superveloce-1000.webp",
    gallery: [
      "/images/motorcycles-v2/mv-agusta-superveloce-1000.webp",
    ],
    description: {
      en: "An exclusive limited-edition motorcycle where Italian design, craftsmanship and performance become one.",
      ru: "Эксклюзивный мотоцикл ограниченной серии, в котором итальянский дизайн, мастерство и производительность объединены в единое целое.",
    },
  },

  {
    id: 6,
    slug: "mv-agusta-brutale-1000-rr",
    brand: "MV Agusta",
    model: "Brutale 1000 RR",
    category: "Roadster",
    year: 2025,
    engineCapacity: 998,
    horsepower: 208,
    mileage: 0,
    condition: "new",
    available: false,
    featured: false,
    price: null,
    priceType: "request",
    image:
      "/images/motorcycles-v2/mv-agusta-brutale-1000-rr.webp",
    gallery: [
      "/images/motorcycles-v2/mv-agusta-brutale-1000-rr.webp",
    ],
    description: {
      en: "An expressive Italian hyper-roadster with radical styling, premium components and breathtaking acceleration.",
      ru: "Выразительный итальянский гипер-родстер с радикальным дизайном, премиальными компонентами и впечатляющей динамикой.",
    },
  },

  {
    id: 7,
    slug: "triumph-speed-triple-1200-rs",
    brand: "Triumph",
    model: "Speed Triple 1200 RS",
    category: "Roadster",
    year: 2026,
    engineCapacity: 1160,
    horsepower: 180,
    mileage: 0,
    condition: "new",
    available: true,
    featured: true,
    price: 20_900,
    priceType: "from",
    image:
      "/images/motorcycles-v2/triumph-speed-triple-1200-rs.webp",
    gallery: [
      "/images/motorcycles-v2/triumph-speed-triple-1200-rs.webp",
    ],
    description: {
      en: "A precise British roadster combining a powerful triple-cylinder engine with focused handling and minimalist design.",
      ru: "Точный британский родстер, сочетающий мощный трёхцилиндровый двигатель, уверенную управляемость и минималистичный дизайн.",
    },
  },

  {
    id: 8,
    slug: "triumph-rocket-3-storm-r",
    brand: "Triumph",
    model: "Rocket 3 Storm R",
    category: "Cruiser",
    year: 2026,
    engineCapacity: 2458,
    horsepower: 182,
    mileage: 0,
    condition: "new",
    available: true,
    featured: false,
    price: 27_900,
    priceType: "from",
    image:
      "/images/motorcycles-v2/triumph-rocket-3-storm-r.webp",
    gallery: [
      "/images/motorcycles-v2/triumph-rocket-3-storm-r.webp",
    ],
    description: {
      en: "A commanding power cruiser with monumental torque, distinctive proportions and unmistakable road presence.",
      ru: "Впечатляющий пауэр-круизер с огромным крутящим моментом, характерными пропорциями и ярким присутствием на дороге.",
    },
  },

  {
    id: 9,
    slug: "aprilia-rsv4-factory",
    brand: "Aprilia",
    model: "RSV4 Factory",
    category: "Superbike",
    year: 2026,
    engineCapacity: 1099,
    horsepower: 217,
    mileage: 0,
    condition: "new",
    available: true,
    featured: true,
    price: 27_500,
    priceType: "from",
    image:
      "/images/motorcycles-v2/aprilia-rsv4-factory.webp",
    gallery: [
      "/images/motorcycles-v2/aprilia-rsv4-factory.webp",
    ],
    description: {
      en: "A sophisticated Italian superbike developed around aerodynamic efficiency, racing electronics and V4 performance.",
      ru: "Современный итальянский супербайк с развитой аэродинамикой, гоночной электроникой и мощным двигателем V4.",
    },
  },

  {
    id: 10,
    slug: "aprilia-tuono-v4-factory",
    brand: "Aprilia",
    model: "Tuono V4 Factory",
    category: "Roadster",
    year: 2026,
    engineCapacity: 1077,
    horsepower: 175,
    mileage: 0,
    condition: "new",
    available: true,
    featured: false,
    price: 20_500,
    priceType: "from",
    image:
      "/images/motorcycles-v2/aprilia-tuono-v4-factory.webp",
    gallery: [
      "/images/motorcycles-v2/aprilia-tuono-v4-factory.webp",
    ],
    description: {
      en: "A premium naked motorcycle that brings superbike technology and V4 character to everyday road riding.",
      ru: "Премиальный нейкед, переносящий технологии супербайка и характер двигателя V4 на дороги общего пользования.",
    },
  },

  {
    id: 11,
    slug: "harley-davidson-cvo-road-glide",
    brand: "Harley-Davidson",
    model: "CVO Road Glide",
    category: "Touring",
    year: 2026,
    engineCapacity: 1977,
    horsepower: 115,
    mileage: 0,
    condition: "new",
    available: true,
    featured: true,
    price: 48_500,
    priceType: "from",
    image:
      "/images/motorcycles-v2/harley-cvo-road-glide.webp",
    gallery: [
      "/images/motorcycles-v2/harley-cvo-road-glide.webp",
    ],
    description: {
      en: "A flagship American touring motorcycle created for long journeys, exceptional comfort and unmistakable style.",
      ru: "Флагманский американский туристический мотоцикл для дальних поездок, высокого комфорта и узнаваемого стиля.",
    },
  },

  {
    id: 12,
    slug: "harley-davidson-sportster-s",
    brand: "Harley-Davidson",
    model: "Sportster S",
    category: "Cruiser",
    year: 2025,
    engineCapacity: 1252,
    horsepower: 121,
    mileage: 1800,
    condition: "used",
    available: true,
    featured: false,
    price: 14_900,
    priceType: "fixed",
    image:
      "/images/motorcycles-v2/harley-sportster-s.webp",
    gallery: [
      "/images/motorcycles-v2/harley-sportster-s.webp",
    ],
    description: {
      en: "A modern performance cruiser with muscular proportions, a responsive engine and a distinctive American character.",
      ru: "Современный динамичный круизер с мускулистыми пропорциями, отзывчивым двигателем и выраженным американским характером.",
    },
  },
];
