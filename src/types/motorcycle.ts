export type Language = "en" | "ru";

export type LocalizedText = {
  en: string;
  ru: string;
};

export type MotorcycleCategory =
  | "Superbike"
  | "Performance"
  | "Limited Edition"
  | "Cruiser"
  | "Adventure"
  | "Roadster"
  | "Touring";

export type MotorcycleCondition = "new" | "used";

export type MotorcyclePriceType =
  | "fixed"
  | "from"
  | "request";

export type Motorcycle = {
  id: number;
  slug: string;

  brand: string;
  model: string;
  category: MotorcycleCategory;

  year: number;
  engineCapacity: number;
  horsepower: number;
  mileage: number;

  condition: MotorcycleCondition;
  available: boolean;
  featured: boolean;

  price: number | null;
  priceType: MotorcyclePriceType;

  image: string;
  gallery: string[];

  description: LocalizedText;
};