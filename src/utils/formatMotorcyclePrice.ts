import type {
  Language,
  Motorcycle,
} from "../types/motorcycle";

export function formatMotorcyclePrice(
  motorcycle: Motorcycle,
  language: Language,
) {
  if (
    motorcycle.priceType === "request" ||
    motorcycle.price === null
  ) {
    return language === "ru"
      ? "Цена по запросу"
      : "Price on request";
  }

  const formattedPrice = new Intl.NumberFormat(
    language === "ru" ? "ru-RU" : "en-IE",
    {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    },
  ).format(motorcycle.price);

  if (motorcycle.priceType === "from") {
    return language === "ru"
      ? `от ${formattedPrice}`
      : `From ${formattedPrice}`;
  }

  return formattedPrice;
}