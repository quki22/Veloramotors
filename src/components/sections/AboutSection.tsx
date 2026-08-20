import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

type Language = "en" | "ru";

type AboutSectionProps = {
  language: Language;
};

type Translation = {
  eyebrow: string;
  titleFirst: string;
  titleSecond: string;
  description: string;
  secondParagraph: string;
  showroom: string;
  showroomDescription: string;
  visit: string;
  location: string;
  detail: string;
  imageOneAlt: string;
  imageTwoAlt: string;
  stats: {
    value: string;
    label: string;
  }[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

const translations: Record<Language, Translation> = {
  en: {
    eyebrow: "About Velora Moto",
    titleFirst: "Built Around",
    titleSecond: "The Rider",

    description:
      "VELORA MOTO is a private motorcycle boutique created for riders who value engineering, design and individual attention. We combine global sourcing, technical expertise and a personal approach in one seamless experience.",

    secondParagraph:
      "Every motorcycle is carefully selected, inspected and prepared before delivery. Our goal is not simply to complete a transaction, but to build a long-term relationship with every owner.",

    showroom: "Private Showroom",

    showroomDescription:
      "A calm, private space for personal consultations, motorcycle presentations and handovers.",

    visit: "Visit our showroom",
    location: "Petropavlovsk, Kazakhstan",
    detail: "Detail / Engineering",

    imageOneAlt: "VELORA MOTO private motorcycle showroom",
    imageTwoAlt: "Premium motorcycle engineering detail",

    stats: [
      {
        value: "120+",
        label: "Motorcycles delivered",
      },
      {
        value: "9",
        label: "Countries sourced from",
      },
      {
        value: "97%",
        label: "Returning clients",
      },
      {
        value: "6",
        label: "Years of experience",
      },
    ],
  },

  ru: {
    eyebrow: "О компании Velora Moto",
    titleFirst: "Создано вокруг",
    titleSecond: "владельца",

    description:
      "VELORA MOTO — частный бутик мотоциклов для тех, кто ценит инженерию, дизайн и персональное внимание. Мы объединяем поиск по всему миру, техническую экспертизу и индивидуальный подход.",

    secondParagraph:
      "Каждый мотоцикл проходит тщательный отбор, проверку и подготовку перед передачей. Наша задача — не просто завершить сделку, а выстроить долгосрочные отношения с каждым владельцем.",

    showroom: "Частный шоурум",

    showroomDescription:
      "Спокойное приватное пространство для консультаций, презентаций и передачи мотоциклов.",

    visit: "Посетить шоурум",
    location: "Петропавловск, Казахстан",
    detail: "Детали / Инженерия",

    imageOneAlt: "Частный мотошоурум VELORA MOTO",
    imageTwoAlt: "Инженерные детали премиального мотоцикла",

    stats: [
      {
        value: "120+",
        label: "Переданных мотоциклов",
      },
      {
        value: "9",
        label: "Стран поставки",
      },
      {
        value: "97%",
        label: "Клиентов возвращаются",
      },
      {
        value: "6",
        label: "Лет опыта",
      },
    ],
  },
};

const SHOWROOM_IMAGE =
  "https://images.pexels.com/photos/4488642/pexels-photo-4488642.jpeg?auto=compress&cs=tinysrgb&w=1800";

const DETAIL_IMAGE =
  "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function AboutSection({
  language,
}: AboutSectionProps) {
  const t = translations[language];

  return (
    <section
      id="about"
      className="overflow-hidden bg-[#0f0f0f] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mb-16 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              key={`${language}-about-eyebrow`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: "-60px",
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
              key={`${language}-about-title`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: "-60px",
              }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: EASE,
              }}
              className="font-normal leading-[0.92] tracking-[-0.06em]"
              style={{
                fontSize: "clamp(3.2rem, 7vw, 7rem)",
              }}
            >
              {t.titleFirst}

              <span className="block text-white/35">
                {t.titleSecond}
              </span>
            </motion.h2>
          </div>

          <motion.div
            key={`${language}-about-description`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: EASE,
            }}
            className="max-w-md"
          >
            <p className="text-sm leading-7 text-white/55">
              {t.description}
            </p>

            <p className="mt-5 text-sm leading-7 text-white/35">
              {t.secondParagraph}
            </p>
          </motion.div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Большая фотография шоурума */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.9,
              ease: EASE,
            }}
            className="group relative min-h-[520px] overflow-hidden bg-[#151515] lg:min-h-[720px]"
          >
            <img
              src={SHOWROOM_IMAGE}
              alt={t.imageOneAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/20" />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40">
                VELORA MOTO / 01
              </p>

              <h3
                className="mt-4 max-w-2xl leading-[0.95] tracking-[-0.055em]"
                style={{
                  fontSize: "clamp(2.7rem, 5vw, 5.5rem)",
                }}
              >
                {t.showroom}
              </h3>

              <div className="mt-7 flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-lg text-sm leading-7 text-white/55">
                  {t.showroomDescription}
                </p>

                <a
                  href="#contacts"
                  className="group/link inline-flex shrink-0 items-center gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {t.visit}

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                  />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Правая фотография — мотоцикл теперь виден целиком */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: EASE,
            }}
            className="group relative min-h-[420px] overflow-hidden bg-[#080808] lg:min-h-[720px]"
          >
            <img
              src={DETAIL_IMAGE}
              alt={t.imageTwoAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain object-center grayscale transition-all duration-[1400ms] ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/40">
                {t.detail}
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-white/20 pt-5 text-xs text-white/60">
                <MapPin size={15} strokeWidth={1.3} />

                <span>{t.location}</span>
              </div>
            </div>
          </motion.article>
        </div>

        <div className="mt-px grid border-l border-t border-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {t.stats.map((stat, index) => (
            <motion.div
              key={`${language}-${stat.label}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: EASE,
              }}
              className="border-b border-r border-white/10 bg-[#111111] px-7 py-10 sm:px-9 lg:py-12"
            >
              <p
                className="leading-none tracking-[-0.06em]"
                style={{
                  fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                }}
              >
                {stat.value}
              </p>

              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}