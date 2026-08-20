import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Gauge,
  Route,
  Settings2,
  ShieldCheck,
  X,
} from "lucide-react";

import type {
  Language,
  Motorcycle,
} from "../../types/motorcycle";

type MotorcycleDetailsModalProps = {
  motorcycle: Motorcycle | null;
  language: Language;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const translations = {
  en: {
    close: "Close",
    year: "Year",
    engine: "Engine",
    power: "Power",
    mileage: "Mileage",
    condition: "Condition",
    availability: "Availability",
    newCondition: "New",
    usedCondition: "Used",
    available: "Available",
    unavailable: "Unavailable",
    priceFrom: "From",
    priceRequest: "Price on request",
    description: "About the motorcycle",
    consultation: "Request a consultation",
    gallery: "Gallery",
    verified: "Verified motorcycle",
  },

  ru: {
    close: "Закрыть",
    year: "Год выпуска",
    engine: "Двигатель",
    power: "Мощность",
    mileage: "Пробег",
    condition: "Состояние",
    availability: "Наличие",
    newCondition: "Новый",
    usedCondition: "С пробегом",
    available: "В наличии",
    unavailable: "Нет в наличии",
    priceFrom: "от",
    priceRequest: "Цена по запросу",
    description: "О мотоцикле",
    consultation: "Получить консультацию",
    gallery: "Галерея",
    verified: "Проверенный мотоцикл",
  },
};

export default function MotorcycleDetailsModal({
  motorcycle,
  language,
  onClose,
}: MotorcycleDetailsModalProps) {
  const t = translations[language];

  const [activeImage, setActiveImage] = useState(
    motorcycle?.image ?? "",
  );

  useEffect(() => {
    if (!motorcycle) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [motorcycle, onClose]);

  if (!motorcycle) {
    return null;
  }

  const selectedMotorcycle = motorcycle;

  const galleryImages = Array.from(
    new Set([
      selectedMotorcycle.image,
      ...selectedMotorcycle.gallery,
    ]),
  );

  function formatNumber(value: number) {
    return new Intl.NumberFormat(
      language === "ru" ? "ru-RU" : "en-US",
    ).format(value);
  }

  function getPrice(item: Motorcycle) {
    if (
      item.priceType === "request" ||
      item.price === null
    ) {
      return t.priceRequest;
    }

    const formattedPrice = formatNumber(item.price);

    if (language === "ru") {
      return item.priceType === "from"
        ? `${t.priceFrom} ${formattedPrice} ₸`
        : `${formattedPrice} ₸`;
    }

    return item.priceType === "from"
      ? `${t.priceFrom} ₸${formattedPrice}`
      : `₸${formattedPrice}`;
  }

  function handleBackdropClick(
    event: MouseEvent<HTMLDivElement>,
  ) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const specifications = [
    {
      label: t.year,
      value: String(selectedMotorcycle.year),
      icon: Settings2,
    },
    {
      label: t.engine,
      value: `${formatNumber(
        selectedMotorcycle.engineCapacity,
      )} CC`,
      icon: Gauge,
    },
    {
      label: t.power,
      value: `${formatNumber(
        selectedMotorcycle.horsepower,
      )} HP`,
      icon: Gauge,
    },
    {
      label: t.mileage,
      value: `${formatNumber(
        selectedMotorcycle.mileage,
      )} KM`,
      icon: Route,
    },
    {
      label: t.condition,
      value:
        selectedMotorcycle.condition === "new"
          ? t.newCondition
          : t.usedCondition,
      icon: ShieldCheck,
    },
    {
      label: t.availability,
      value: selectedMotorcycle.available
        ? t.available
        : t.unavailable,
      icon: Check,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedMotorcycle.brand} ${selectedMotorcycle.model}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.985,
        }}
        transition={{
          duration: 0.45,
          ease: EASE,
        }}
        className="relative mx-auto min-h-full max-w-[1450px] overflow-hidden border border-white/10 bg-[#0f0f0f] text-white"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black sm:right-7 sm:top-7"
        >
          <X size={20} strokeWidth={1.4} />
        </button>

        <div className="grid min-h-full lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[480px] overflow-hidden bg-[#151515] sm:min-h-[620px] lg:min-h-[850px]">
            <motion.img
              key={activeImage}
              initial={{
                opacity: 0.5,
                scale: 1.02,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                ease: EASE,
              }}
              src={activeImage}
              alt={`${selectedMotorcycle.brand} ${selectedMotorcycle.model}`}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/30" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/45">
                {t.gallery}
              </p>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((image, index) => {
                  const isActive =
                    activeImage === image;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        setActiveImage(image)
                      }
                      aria-label={`${t.gallery} ${
                        index + 1
                      }`}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden border transition-all duration-300 sm:h-24 sm:w-36 ${
                        isActive
                          ? "border-white"
                          : "border-white/15 opacity-55 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${selectedMotorcycle.model} ${
                          index + 1
                        }`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-white" />

                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
                  {t.verified}
                </p>
              </div>

              <p className="mt-12 text-xs uppercase tracking-[0.28em] text-white/40">
                {selectedMotorcycle.brand}
              </p>

              <h2
                className="mt-4 font-normal leading-[0.92] tracking-[-0.055em]"
                style={{
                  fontSize:
                    "clamp(3rem, 6vw, 6.5rem)",
                }}
              >
                {selectedMotorcycle.model}
              </h2>

              <p className="mt-8 text-xl tracking-[-0.02em] text-white/80 sm:text-2xl">
                {getPrice(selectedMotorcycle)}
              </p>

              <div className="mt-10 grid grid-cols-2 border-l border-t border-white/10">
                {specifications.map(
                  (specification) => {
                    const Icon = specification.icon;

                    return (
                      <div
                        key={specification.label}
                        className="border-b border-r border-white/10 p-4 sm:p-5"
                      >
                        <div className="flex items-center gap-3 text-white/35">
                          <Icon
                            size={15}
                            strokeWidth={1.3}
                          />

                          <p className="text-[0.56rem] uppercase tracking-[0.17em]">
                            {specification.label}
                          </p>
                        </div>

                        <p className="mt-4 text-sm text-white/80">
                          {specification.value}
                        </p>
                      </div>
                    );
                  },
                )}
              </div>

              <div className="mt-12 border-t border-white/10 pt-8">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/35">
                  {t.description}
                </p>

                <p className="mt-5 text-sm leading-7 text-white/50">
                  {
                    selectedMotorcycle.description[
                      language
                    ]
                  }
                </p>
              </div>
            </div>

            <a
              href="#contacts"
              onClick={onClose}
              className="group mt-14 flex min-h-14 items-center justify-between border border-white bg-white px-5 text-[0.65rem] uppercase tracking-[0.17em] text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
            >
              {t.consultation}

              <ArrowRight
                size={17}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
