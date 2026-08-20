import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  RotateCcw,
  Search,
} from "lucide-react";

import { motorcycles } from "../../data/motorcycles";
import { useFavorites } from "../../hooks/useFavorites";
import type {
  Language,
  Motorcycle,
  MotorcycleCategory,
  MotorcycleCondition,
} from "../../types/motorcycle";
import { formatMotorcyclePrice } from "../../utils/formatMotorcyclePrice";
import MotorcycleDetailsModal from "../modals/MotorcycleDetailsModal";

type MotorcyclesSectionProps = {
  language: Language;
};

type CategoryFilter =
  | "all"
  | MotorcycleCategory;

type ConditionFilter =
  | "all"
  | MotorcycleCondition;

type AvailabilityFilter =
  | "all"
  | "available"
  | "unavailable";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc";

type BrandSelectionEventDetail = {
  brand: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const FALLBACK_IMAGE =
  "/images/motorcycle-placeholder.jpg";

const translations = {
  en: {
    eyebrow: "Selected Collection",
    titleFirst: "Motorcycles Worth",
    titleSecond: "Remembering",
    description:
      "Explore our complete selection of exceptional motorcycles. Hover over a model to discover its character.",

    searchPlaceholder:
      "Search by brand or model",
    brand: "Brand",
    allBrands: "All brands",
    category: "Category",
    allCategories: "All categories",
    condition: "Condition",
    allConditions: "All conditions",
    newCondition: "New",
    usedCondition: "Used",
    availability: "Availability",
    allAvailability: "All motorcycles",
    available: "Available",
    unavailable: "Unavailable",

    sorting: "Sort by",
    featured: "Featured first",
    priceLow: "Price: low to high",
    priceHigh: "Price: high to low",
    newest: "Newest first",
    oldest: "Oldest first",

    favoritesOnly: "Favorites only",
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",

    reset: "Reset filters",
    motorcyclesFound: "motorcycles found",
    noResults: "No motorcycles found",
    noResultsDescription:
      "Try changing the search query or resetting the selected filters.",

    year: "Year",
    engine: "Engine",
    power: "Power",
    mileage: "Mileage",
    details: "View details",
    collection: "Collection",

    availableStatus: "Available",
    unavailableStatus: "Unavailable",

    footerLeft: "Premium Collection / 2026",
    footerRight: "New and verified motorcycles",
  },

  ru: {
    eyebrow: "Избранная коллекция",
    titleFirst: "Мотоциклы, которые",
    titleSecond: "запоминаются",
    description:
      "Изучите полную коллекцию исключительных мотоциклов. Наведите курсор на модель, чтобы увидеть её подробнее.",

    searchPlaceholder:
      "Поиск по бренду или модели",
    brand: "Бренд",
    allBrands: "Все бренды",
    category: "Категория",
    allCategories: "Все категории",
    condition: "Состояние",
    allConditions: "Любое состояние",
    newCondition: "Новый",
    usedCondition: "С пробегом",
    availability: "Наличие",
    allAvailability: "Все мотоциклы",
    available: "В наличии",
    unavailable: "Нет в наличии",

    sorting: "Сортировка",
    featured: "Сначала избранные",
    priceLow: "Цена: по возрастанию",
    priceHigh: "Цена: по убыванию",
    newest: "Сначала новые",
    oldest: "Сначала старые",

    favoritesOnly: "Только избранные",
    addFavorite: "Добавить в избранное",
    removeFavorite: "Удалить из избранного",

    reset: "Сбросить фильтры",
    motorcyclesFound: "мотоциклов найдено",
    noResults: "Мотоциклы не найдены",
    noResultsDescription:
      "Измените поисковый запрос или сбросьте выбранные фильтры.",

    year: "Год",
    engine: "Двигатель",
    power: "Мощность",
    mileage: "Пробег",
    details: "Подробнее",
    collection: "Коллекция",

    availableStatus: "В наличии",
    unavailableStatus: "Нет в наличии",

    footerLeft: "Премиальная коллекция / 2026",
    footerRight: "Новые и проверенные мотоциклы",
  },
};

const categoryTranslations: Record<
  MotorcycleCategory,
  {
    en: string;
    ru: string;
  }
> = {
  Superbike: {
    en: "Superbike",
    ru: "Супербайк",
  },

  Performance: {
    en: "Performance",
    ru: "Спортивный",
  },

  "Limited Edition": {
    en: "Limited Edition",
    ru: "Лимитированная серия",
  },

  Cruiser: {
    en: "Cruiser",
    ru: "Круизер",
  },

  Adventure: {
    en: "Adventure",
    ru: "Туристический эндуро",
  },

  Roadster: {
    en: "Roadster",
    ru: "Родстер",
  },

  Touring: {
    en: "Touring",
    ru: "Туристический",
  },
};

export default function MotorcyclesSection({
  language,
}: MotorcyclesSectionProps) {
  const t = translations[language];

  const {
    favoritesCount,
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const [searchQuery, setSearchQuery] =
    useState("");

  const [brandFilter, setBrandFilter] =
    useState("all");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState<CategoryFilter>("all");

  const [
    conditionFilter,
    setConditionFilter,
  ] = useState<ConditionFilter>("all");

  const [
    availabilityFilter,
    setAvailabilityFilter,
  ] = useState<AvailabilityFilter>("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const [
    favoritesOnly,
    setFavoritesOnly,
  ] = useState(false);

  const [
    activeMotorcycleId,
    setActiveMotorcycleId,
  ] = useState(motorcycles[0]?.id ?? 0);

  const [
    selectedMotorcycle,
    setSelectedMotorcycle,
  ] = useState<Motorcycle | null>(null);

  const brands = useMemo(() => {
    return Array.from(
      new Set(
        motorcycles.map(
          (motorcycle) => motorcycle.brand,
        ),
      ),
    ).sort((firstBrand, secondBrand) =>
      firstBrand.localeCompare(secondBrand),
    );
  }, []);

  const filteredMotorcycles =
    useMemo(() => {
      const normalizedSearch =
        searchQuery
          .trim()
          .toLowerCase();

      const filtered =
        motorcycles.filter(
          (motorcycle) => {
            const motorcycleName =
              `${motorcycle.brand} ${motorcycle.model}`.toLowerCase();

            const matchesSearch =
              normalizedSearch.length === 0 ||
              motorcycleName.includes(
                normalizedSearch,
              );

            const matchesBrand =
              brandFilter === "all" ||
              motorcycle.brand ===
                brandFilter;

            const matchesCategory =
              categoryFilter === "all" ||
              motorcycle.category ===
                categoryFilter;

            const matchesCondition =
              conditionFilter === "all" ||
              motorcycle.condition ===
                conditionFilter;

            const matchesAvailability =
              availabilityFilter === "all" ||
              (availabilityFilter ===
                "available" &&
                motorcycle.available) ||
              (availabilityFilter ===
                "unavailable" &&
                !motorcycle.available);

            const matchesFavorites =
              !favoritesOnly ||
              isFavorite(motorcycle.id);

            return (
              matchesSearch &&
              matchesBrand &&
              matchesCategory &&
              matchesCondition &&
              matchesAvailability &&
              matchesFavorites
            );
          },
        );

      return [...filtered].sort(
        (first, second) => {
          switch (sortOption) {
            case "price-asc": {
              const firstPrice =
                first.price === null
                  ? Number.POSITIVE_INFINITY
                  : first.price;

              const secondPrice =
                second.price === null
                  ? Number.POSITIVE_INFINITY
                  : second.price;

              return firstPrice - secondPrice;
            }

            case "price-desc": {
              const firstPrice =
                first.price === null
                  ? Number.NEGATIVE_INFINITY
                  : first.price;

              const secondPrice =
                second.price === null
                  ? Number.NEGATIVE_INFINITY
                  : second.price;

              return secondPrice - firstPrice;
            }

            case "year-desc":
              return second.year - first.year;

            case "year-asc":
              return first.year - second.year;

            case "featured":
            default:
              return (
                Number(second.featured) -
                  Number(first.featured) ||
                second.year - first.year
              );
          }
        },
      );
    }, [
      availabilityFilter,
      brandFilter,
      categoryFilter,
      conditionFilter,
      favoritesOnly,
      isFavorite,
      searchQuery,
      sortOption,
    ]);

  const activeMotorcycle =
    filteredMotorcycles.find(
      (motorcycle) =>
        motorcycle.id === activeMotorcycleId,
    ) ??
    filteredMotorcycles[0] ??
    null;

  useEffect(() => {
    function handleBrandSelection(
      event: Event,
    ) {
      const brandEvent =
        event as CustomEvent<BrandSelectionEventDetail>;

      const selectedBrand =
        brandEvent.detail?.brand;

      if (!selectedBrand) {
        return;
      }

      const firstBrandMotorcycle =
        motorcycles.find(
          (motorcycle) =>
            motorcycle.brand ===
            selectedBrand,
        );

      setSearchQuery("");
      setBrandFilter(selectedBrand);
      setCategoryFilter("all");
      setConditionFilter("all");
      setAvailabilityFilter("all");
      setSortOption("featured");
      setFavoritesOnly(false);

      if (firstBrandMotorcycle) {
        setActiveMotorcycleId(
          firstBrandMotorcycle.id,
        );
      }

      window.requestAnimationFrame(() => {
        document
          .getElementById("catalog")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    }

    window.addEventListener(
      "velora:brand-selected",
      handleBrandSelection,
    );

    return () => {
      window.removeEventListener(
        "velora:brand-selected",
        handleBrandSelection,
      );
    };
  }, []);

  const hasActiveFilters =
    searchQuery.length > 0 ||
    brandFilter !== "all" ||
    categoryFilter !== "all" ||
    conditionFilter !== "all" ||
    availabilityFilter !== "all" ||
    sortOption !== "featured" ||
    favoritesOnly;

  function resetFilters() {
    setSearchQuery("");
    setBrandFilter("all");
    setCategoryFilter("all");
    setConditionFilter("all");
    setAvailabilityFilter("all");
    setSortOption("featured");
    setFavoritesOnly(false);

    if (motorcycles[0]) {
      setActiveMotorcycleId(
        motorcycles[0].id,
      );
    }
  }

  const openMotorcycleDetails =
    useCallback(
      (motorcycle: Motorcycle) => {
        setSelectedMotorcycle(motorcycle);
      },
      [],
    );

  const closeMotorcycleDetails =
    useCallback(() => {
      setSelectedMotorcycle(null);
    }, []);

  function formatNumber(value: number) {
    return new Intl.NumberFormat(
      language === "ru"
        ? "ru-RU"
        : "en-US",
    ).format(value);
  }

  function getCategory(
    category: MotorcycleCategory,
  ) {
    return categoryTranslations[
      category
    ][language];
  }

  function getPrice(
    motorcycle: Motorcycle,
  ) {
    return formatMotorcyclePrice(
      motorcycle,
      language,
    );
  }

  function handleImageError(
    event: SyntheticEvent<HTMLImageElement>,
  ) {
    event.currentTarget.onerror = null;
    event.currentTarget.src =
      FALLBACK_IMAGE;
  }

  const inputClassName =
    "h-12 w-full border border-white/10 bg-[#151515] px-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-white/40";

  const selectClassName =
    "h-12 w-full cursor-pointer border border-white/10 bg-[#151515] px-4 text-sm text-white/70 outline-none transition-colors duration-300 focus:border-white/40";

  return (
    <>
      <section
        id="motorcycles"
        className="overflow-hidden bg-[#0f0f0f] text-white"
      >
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
          <div className="mb-16 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <motion.p
                key={`${language}-collection-label`}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                }}
                className="mb-6 text-[0.65rem] uppercase tracking-[0.32em] text-white/35"
              >
                {t.eyebrow}
              </motion.p>

              <motion.h2
                key={`${language}-collection-title`}
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.08,
                  ease: EASE,
                }}
                className="font-normal leading-[0.92] tracking-[-0.06em]"
                style={{
                  fontSize:
                    "clamp(3.2rem, 7vw, 7rem)",
                }}
              >
                {t.titleFirst}

                <span className="block text-white/35">
                  {t.titleSecond}
                </span>
              </motion.h2>
            </div>

            <motion.p
              key={`${language}-collection-description`}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: EASE,
              }}
              className="max-w-md text-sm leading-7 text-white/50"
            >
              {t.description}
            </motion.p>
          </div>

          <motion.div
            id="catalog"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.8,
              ease: EASE,
            }}
            className="scroll-mt-24 border border-white/10 bg-[#111111] p-5 sm:p-7"
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              <div className="relative md:col-span-2 xl:col-span-2">
                <Search
                  size={16}
                  strokeWidth={1.4}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value,
                    )
                  }
                  placeholder={
                    t.searchPlaceholder
                  }
                  aria-label={
                    t.searchPlaceholder
                  }
                  className={`${inputClassName} pl-11`}
                />
              </div>

              <label>
                <span className="sr-only">
                  {t.brand}
                </span>

                <select
                  value={brandFilter}
                  onChange={(event) =>
                    setBrandFilter(
                      event.target.value,
                    )
                  }
                  aria-label={t.brand}
                  className={selectClassName}
                >
                  <option value="all">
                    {t.allBrands}
                  </option>

                  {brands.map((brand) => (
                    <option
                      key={brand}
                      value={brand}
                    >
                      {brand}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="sr-only">
                  {t.category}
                </span>

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(
                      event.target
                        .value as CategoryFilter,
                    )
                  }
                  aria-label={t.category}
                  className={selectClassName}
                >
                  <option value="all">
                    {t.allCategories}
                  </option>

                  {Object.keys(
                    categoryTranslations,
                  ).map((category) => {
                    const typedCategory =
                      category as MotorcycleCategory;

                    return (
                      <option
                        key={typedCategory}
                        value={typedCategory}
                      >
                        {getCategory(
                          typedCategory,
                        )}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label>
                <span className="sr-only">
                  {t.condition}
                </span>

                <select
                  value={conditionFilter}
                  onChange={(event) =>
                    setConditionFilter(
                      event.target
                        .value as ConditionFilter,
                    )
                  }
                  aria-label={t.condition}
                  className={selectClassName}
                >
                  <option value="all">
                    {t.allConditions}
                  </option>

                  <option value="new">
                    {t.newCondition}
                  </option>

                  <option value="used">
                    {t.usedCondition}
                  </option>
                </select>
              </label>

              <label>
                <span className="sr-only">
                  {t.availability}
                </span>

                <select
                  value={
                    availabilityFilter
                  }
                  onChange={(event) =>
                    setAvailabilityFilter(
                      event.target
                        .value as AvailabilityFilter,
                    )
                  }
                  aria-label={
                    t.availability
                  }
                  className={selectClassName}
                >
                  <option value="all">
                    {t.allAvailability}
                  </option>

                  <option value="available">
                    {t.available}
                  </option>

                  <option value="unavailable">
                    {t.unavailable}
                  </option>
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                {filteredMotorcycles.length}{" "}
                {t.motorcyclesFound}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() =>
                    setFavoritesOnly(
                      (currentValue) =>
                        !currentValue,
                    )
                  }
                  aria-pressed={
                    favoritesOnly
                  }
                  className={`inline-flex h-12 items-center justify-center gap-3 border px-5 text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-300 ${
                    favoritesOnly
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-white/55 hover:border-white hover:text-white"
                  }`}
                >
                  <Heart
                    size={15}
                    strokeWidth={1.4}
                    className={
                      favoritesOnly
                        ? "fill-current"
                        : ""
                    }
                  />

                  {t.favoritesOnly}

                  {favoritesCount > 0 && (
                    <span>
                      ({favoritesCount})
                    </span>
                  )}
                </button>

                <label>
                  <span className="sr-only">
                    {t.sorting}
                  </span>

                  <select
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(
                        event.target
                          .value as SortOption,
                      )
                    }
                    aria-label={t.sorting}
                    className={`${selectClassName} min-w-[210px]`}
                  >
                    <option value="featured">
                      {t.featured}
                    </option>

                    <option value="price-asc">
                      {t.priceLow}
                    </option>

                    <option value="price-desc">
                      {t.priceHigh}
                    </option>

                    <option value="year-desc">
                      {t.newest}
                    </option>

                    <option value="year-asc">
                      {t.oldest}
                    </option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={
                    !hasActiveFilters
                  }
                  className="inline-flex h-12 items-center justify-center gap-3 border border-white/10 px-5 text-[0.62rem] uppercase tracking-[0.16em] text-white/55 transition-all duration-300 hover:border-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <RotateCcw
                    size={15}
                    strokeWidth={1.4}
                  />

                  {t.reset}
                </button>
              </div>
            </div>
          </motion.div>

          {activeMotorcycle ? (
            <div className="mt-px grid overflow-hidden border border-white/10 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="bg-[#111111] lg:max-h-[820px] lg:overflow-y-auto">
                {filteredMotorcycles.map(
                  (
                    motorcycle,
                    index,
                  ) => {
                    const isActive =
                      activeMotorcycle.id ===
                      motorcycle.id;

                    const favorite =
                      isFavorite(
                        motorcycle.id,
                      );

                    return (
                      <motion.article
                        key={motorcycle.id}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.55,
                          delay:
                            index * 0.035,
                          ease: EASE,
                        }}
                        onMouseEnter={() =>
                          setActiveMotorcycleId(
                            motorcycle.id,
                          )
                        }
                        onFocus={() =>
                          setActiveMotorcycleId(
                            motorcycle.id,
                          )
                        }
                        className={`group flex items-stretch border-b border-white/10 transition-colors duration-200 last:border-b-0 ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-[#111111] text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openMotorcycleDetails(
                              motorcycle,
                            )
                          }
                          className="flex min-w-0 flex-1 items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-7 lg:px-8"
                        >
                          <span
                            className={`shrink-0 text-[0.6rem] tracking-[0.2em] ${
                              isActive
                                ? "text-black/40"
                                : "text-white/25"
                            }`}
                          >
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-[0.58rem] uppercase tracking-[0.18em] ${
                                isActive
                                  ? "text-black/45"
                                  : "text-white/30"
                              }`}
                            >
                              {
                                motorcycle.brand
                              }
                            </p>

                            <h3
                              className="mt-1 truncate font-normal leading-none tracking-[-0.04em]"
                              style={{
                                fontSize:
                                  "clamp(1.35rem, 2.2vw, 2.5rem)",
                              }}
                            >
                              {
                                motorcycle.model
                              }
                            </h3>
                          </div>

                          <div className="hidden shrink-0 text-right sm:block">
                            <p
                              className={`text-xs ${
                                isActive
                                  ? "text-black/70"
                                  : "text-white/55"
                              }`}
                            >
                              {getPrice(
                                motorcycle,
                              )}
                            </p>

                            <p
                              className={`mt-2 text-[0.55rem] uppercase tracking-[0.16em] ${
                                isActive
                                  ? "text-black/35"
                                  : "text-white/25"
                              }`}
                            >
                              {getCategory(
                                motorcycle.category,
                              )}
                            </p>
                          </div>

                          <ArrowUpRight
                            size={17}
                            strokeWidth={1.3}
                            className={`shrink-0 transition-transform duration-200 ${
                              isActive
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-1 opacity-30 group-hover:translate-x-0 group-hover:opacity-100"
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleFavorite(
                              motorcycle.id,
                            )
                          }
                          aria-label={
                            favorite
                              ? t.removeFavorite
                              : t.addFavorite
                          }
                          aria-pressed={
                            favorite
                          }
                          className={`flex w-14 shrink-0 items-center justify-center border-l transition-colors duration-200 sm:w-16 ${
                            isActive
                              ? "border-black/10 hover:bg-black hover:text-white"
                              : "border-white/10 hover:bg-white hover:text-black"
                          }`}
                        >
                          <Heart
                            size={17}
                            strokeWidth={1.4}
                            className={
                              favorite
                                ? "fill-current"
                                : ""
                            }
                          />
                        </button>
                      </motion.article>
                    );
                  },
                )}
              </div>

              <div className="relative min-h-[600px] overflow-hidden bg-[#151515] lg:min-h-[820px]">
                <AnimatePresence
                  initial={false}
                  mode="sync"
                >
                  <motion.img
                    key={
                      activeMotorcycle.image
                    }
                    src={
                      activeMotorcycle.image
                    }
                    alt={`${activeMotorcycle.brand} ${activeMotorcycle.model}`}
                    onError={
                      handleImageError
                    }
                    initial={{
                      opacity: 0,
                      scale: 1.035,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.015,
                    }}
                    transition={{
                      duration: 0.38,
                      ease: EASE,
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30" />

                <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-8 sm:top-8">
                  <span
                    className={`h-2 w-2 ${
                      activeMotorcycle.available
                        ? "bg-white"
                        : "border border-white/60"
                    }`}
                  />

                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/55">
                    {activeMotorcycle.available
                      ? t.availableStatus
                      : t.unavailableStatus}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    toggleFavorite(
                      activeMotorcycle.id,
                    )
                  }
                  aria-label={
                    isFavorite(
                      activeMotorcycle.id,
                    )
                      ? t.removeFavorite
                      : t.addFavorite
                  }
                  className={`absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center border backdrop-blur-md transition-all duration-300 sm:right-8 sm:top-8 ${
                    isFavorite(
                      activeMotorcycle.id,
                    )
                      ? "border-white bg-white text-black"
                      : "border-white/20 bg-black/20 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  <Heart
                    size={18}
                    strokeWidth={1.4}
                    className={
                      isFavorite(
                        activeMotorcycle.id,
                      )
                        ? "fill-current"
                        : ""
                    }
                  />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
                  <AnimatePresence
                    mode="wait"
                  >
                    <motion.div
                      key={
                        activeMotorcycle.id
                      }
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: EASE,
                      }}
                    >
                      <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/45">
                        {t.collection} /{" "}
                        {
                          activeMotorcycle.brand
                        }
                      </p>

                      <h3
                        className="mt-4 max-w-4xl font-normal leading-[0.88] tracking-[-0.06em]"
                        style={{
                          fontSize:
                            "clamp(3rem, 7vw, 7rem)",
                        }}
                      >
                        {
                          activeMotorcycle.model
                        }
                      </h3>

                      <div className="mt-7 grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-4">
                        <div className="border-b border-r border-white/15 p-4">
                          <p className="text-sm text-white/85">
                            {
                              activeMotorcycle.year
                            }
                          </p>

                          <p className="mt-2 text-[0.55rem] uppercase tracking-[0.17em] text-white/35">
                            {t.year}
                          </p>
                        </div>

                        <div className="border-b border-r border-white/15 p-4">
                          <p className="text-sm text-white/85">
                            {formatNumber(
                              activeMotorcycle.engineCapacity,
                            )}{" "}
                            CC
                          </p>

                          <p className="mt-2 text-[0.55rem] uppercase tracking-[0.17em] text-white/35">
                            {t.engine}
                          </p>
                        </div>

                        <div className="border-b border-r border-white/15 p-4">
                          <p className="text-sm text-white/85">
                            {formatNumber(
                              activeMotorcycle.horsepower,
                            )}{" "}
                            HP
                          </p>

                          <p className="mt-2 text-[0.55rem] uppercase tracking-[0.17em] text-white/35">
                            {t.power}
                          </p>
                        </div>

                        <div className="border-b border-r border-white/15 p-4">
                          <p className="text-sm text-white/85">
                            {formatNumber(
                              activeMotorcycle.mileage,
                            )}{" "}
                            KM
                          </p>

                          <p className="mt-2 text-[0.55rem] uppercase tracking-[0.17em] text-white/35">
                            {t.mileage}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-5 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xl tracking-[-0.02em] text-white/85">
                          {getPrice(
                            activeMotorcycle,
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            openMotorcycleDetails(
                              activeMotorcycle,
                            )
                          }
                          className="group inline-flex min-h-12 items-center justify-between gap-8 border border-white bg-white px-5 text-[0.62rem] uppercase tracking-[0.17em] text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
                        >
                          {t.details}

                          <ArrowRight
                            size={16}
                            strokeWidth={1.4}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="flex min-h-[460px] flex-col items-center justify-center border border-t-0 border-white/10 bg-[#111111] px-6 text-center"
            >
              <Search
                size={32}
                strokeWidth={1}
                className="text-white/20"
              />

              <h3 className="mt-7 text-2xl tracking-[-0.03em]">
                {t.noResults}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                {t.noResultsDescription}
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-8 inline-flex h-12 items-center justify-center gap-3 border border-white/20 px-6 text-[0.62rem] uppercase tracking-[0.16em] text-white/65 transition-all duration-300 hover:bg-white hover:text-black"
              >
                <RotateCcw
                  size={15}
                  strokeWidth={1.4}
                />

                {t.reset}
              </button>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>{t.footerLeft}</span>
            <span>{t.footerRight}</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedMotorcycle && (
          <MotorcycleDetailsModal
            key={selectedMotorcycle.id}
            motorcycle={
              selectedMotorcycle
            }
            language={language}
            onClose={
              closeMotorcycleDetails
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}
