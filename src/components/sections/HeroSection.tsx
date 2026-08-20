import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Gauge,
  ShieldCheck,
} from "lucide-react";

type Language = "en" | "ru";

type HeroSectionProps = {
  language: Language;
};

type Translation = {
  eyebrow: string;
  titleFirst: string;
  titleSecond: string;
  titleThird: string;
  description: string;
  explore: string;
  consultation: string;
  locationLabel: string;
  location: string;
  collectionLabel: string;
  collection: string;
  inspectionLabel: string;
  inspection: string;
  scroll: string;
  imageAlt: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const translations: Record<Language, Translation> = {
  en: {
    eyebrow: "Premium Motorcycle Boutique",
    titleFirst: "Ride",
    titleSecond: "Beyond",
    titleThird: "Ordinary",
    description:
      "Exceptional motorcycles selected for riders who value performance, engineering and unmistakable character.",
    explore: "Explore motorcycles",
    consultation: "Private consultation",
    locationLabel: "Location",
    location: "Petropavlovsk, Kazakhstan",
    collectionLabel: "Collection",
    collection: "Premium motorcycles",
    inspectionLabel: "Inspection",
    inspection: "Verified condition",
    scroll: "Discover Velora",
    imageAlt: "Premium motorcycle on a dark road",
  },

  ru: {
    eyebrow: "Премиальный бутик мотоциклов",
    titleFirst: "Мчись",
    titleSecond: "За гранью",
    titleThird: "Обычного",
    description:
      "Исключительные мотоциклы для тех, кто ценит мощность, инженерию и неповторимый характер.",
    explore: "Смотреть мотоциклы",
    consultation: "Личная консультация",
    locationLabel: "Локация",
    location: "Петропавловск, Казахстан",
    collectionLabel: "Коллекция",
    collection: "Премиальные мотоциклы",
    inspectionLabel: "Проверка",
    inspection: "Подтверждённое состояние",
    scroll: "Открыть Velora",
    imageAlt: "Премиальный мотоцикл на тёмной дороге",
  },
};

const HERO_IMAGE = "/images/hero-velora.webp";

export default function HeroSection({
  language,
}: HeroSectionProps) {
  const t = translations[language];

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#0f0f0f] text-white"
    >
      {/* Background */}
      <motion.img
        src={HERO_IMAGE}
        alt={t.imageAlt}
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          ease: EASE,
        }}
        className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/35" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col justify-end px-6 pb-8 pt-32 sm:px-10 lg:px-16 lg:pb-10 lg:pt-40">
        <div className="flex flex-1 items-center">
          <div className="max-w-[1050px]">
            <motion.p
              key={`${language}-hero-eyebrow`}
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: EASE,
              }}
              className="mb-7 text-[0.62rem] uppercase tracking-[0.34em] text-white/55"
            >
              {t.eyebrow}
            </motion.p>

            <motion.h1
              key={`${language}-hero-title`}
              initial={{
                opacity: 0,
                y: 45,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease: EASE,
              }}
              className="font-normal uppercase leading-[0.78] tracking-[-0.07em]"
              style={{
                fontSize: "clamp(4.2rem, 12vw, 12.5rem)",
              }}
            >
              <span className="block">{t.titleFirst}</span>

              <span className="block text-white/45">
                {t.titleSecond}
              </span>

              <span className="block">{t.titleThird}</span>
            </motion.h1>

            <motion.div
              key={`${language}-hero-content`}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.65,
                ease: EASE,
              }}
              className="mt-10 flex max-w-4xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-white/60 sm:text-base">
                {t.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#motorcycles"
                  className="group inline-flex h-13 items-center justify-between gap-8 bg-white px-6 text-[0.65rem] uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-white/85"
                >
                  {t.explore}

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href="#contacts"
                  className="group inline-flex h-13 items-center justify-between gap-8 border border-white/25 px-6 text-[0.65rem] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  {t.consultation}

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom information */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.85,
            ease: EASE,
          }}
          className="mt-12 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <div className="border-b border-r border-white/15 px-5 py-5 sm:px-6">
            <p className="text-[0.55rem] uppercase tracking-[0.22em] text-white/30">
              {t.locationLabel}
            </p>

            <p className="mt-2 text-xs text-white/65">
              {t.location}
            </p>
          </div>

          <div className="border-b border-r border-white/15 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Gauge
                size={15}
                strokeWidth={1.3}
                className="text-white/40"
              />

              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.22em] text-white/30">
                  {t.collectionLabel}
                </p>

                <p className="mt-2 text-xs text-white/65">
                  {t.collection}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-r border-white/15 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={15}
                strokeWidth={1.3}
                className="text-white/40"
              />

              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.22em] text-white/30">
                  {t.inspectionLabel}
                </p>

                <p className="mt-2 text-xs text-white/65">
                  {t.inspection}
                </p>
              </div>
            </div>
          </div>

          <a
            href="#motorcycles"
            className="group flex min-h-20 items-center justify-between gap-7 border-b border-r border-white/15 px-5 text-[0.58rem] uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 hover:bg-white hover:text-black sm:px-6 lg:min-w-[210px]"
          >
            {t.scroll}

            <ArrowDown
              size={16}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
