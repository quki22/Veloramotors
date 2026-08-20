import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeDollarSign,
  RefreshCw,
  Search,
  ShieldCheck,
  Ship,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Language = "en" | "ru";

type ServicesSectionProps = {
  language: Language;
};

type Service = {
  number: string;
  icon: LucideIcon;
  title: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
};

const EASE = [0.22, 1, 0.36, 1] as const;

const translations = {
  en: {
    eyebrow: "Complete Ownership Experience",
    titleFirst: "More Than",
    titleSecond: "A Motorcycle",
    description:
      "From finding the right machine to final delivery, every stage is handled with precision, transparency and personal attention.",
    consultation: "Request a consultation",
    learnMore: "Learn more",
    footerLeft: "VELORA MOTO SERVICES",
    footerRight: "Complete support at every stage",
  },

  ru: {
    eyebrow: "Полный цикл покупки",
    titleFirst: "Больше, чем",
    titleSecond: "мотоцикл",
    description:
      "От поиска подходящей модели до финальной доставки — каждый этап проходит точно, прозрачно и с персональным сопровождением.",
    consultation: "Получить консультацию",
    learnMore: "Подробнее",
    footerLeft: "УСЛУГИ VELORA MOTO",
    footerRight: "Полное сопровождение на каждом этапе",
  },
};

const services: Service[] = [
  {
    number: "01",
    icon: Search,
    title: {
      en: "Motorcycle Selection",
      ru: "Подбор мотоцикла",
    },
    description: {
      en: "Personal selection based on your experience, riding style, goals and preferred specifications.",
      ru: "Персональный подбор с учётом опыта, стиля езды, целей и желаемых характеристик.",
    },
  },
  {
    number: "02",
    icon: Ship,
    title: {
      en: "Global Import",
      ru: "Импорт по всему миру",
    },
    description: {
      en: "We locate and import exclusive motorcycles from Europe, the United States and other markets.",
      ru: "Находим и импортируем эксклюзивные мотоциклы из Европы, США и других рынков.",
    },
  },
  {
    number: "03",
    icon: RefreshCw,
    title: {
      en: "Trade-In",
      ru: "Trade-In",
    },
    description: {
      en: "A transparent valuation of your current motorcycle with a convenient upgrade to a new machine.",
      ru: "Прозрачная оценка текущего мотоцикла и удобный переход на новую модель.",
    },
  },
  {
    number: "04",
    icon: BadgeDollarSign,
    title: {
      en: "Financing",
      ru: "Финансирование",
    },
    description: {
      en: "Flexible financing and leasing solutions tailored to your preferred ownership format.",
      ru: "Гибкие программы кредитования и лизинга под удобный формат покупки.",
    },
  },
  {
    number: "05",
    icon: Truck,
    title: {
      en: "Worldwide Delivery",
      ru: "Доставка",
    },
    description: {
      en: "Secure enclosed transportation with complete logistics support and delivery coordination.",
      ru: "Безопасная закрытая перевозка с полным логистическим сопровождением.",
    },
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: {
      en: "Inspection & Warranty",
      ru: "Проверка и гарантия",
    },
    description: {
      en: "Technical inspection, history verification and extended warranty options for added confidence.",
      ru: "Техническая диагностика, проверка истории и варианты продлённой гарантии.",
    },
  },
];

export default function ServicesSection({
  language,
}: ServicesSectionProps) {
  const t = translations[language];

  return (
    <section
      id="services"
      className="overflow-hidden bg-[#0f0f0f] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        {/* Заголовок */}
        <div className="mb-16 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              key={`${language}-services-eyebrow`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
              className="mb-6 text-[0.65rem] uppercase tracking-[0.32em] text-white/35"
            >
              {t.eyebrow}
            </motion.p>

            <motion.h2
              key={`${language}-services-title`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
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
            key={`${language}-services-description`}
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
            <p className="text-sm leading-7 text-white/50">
              {t.description}
            </p>

            <a
              href="#contacts"
              className="group mt-7 inline-flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
            >
              {t.consultation}

              <ArrowUpRight
                size={16}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Карточки услуг */}
        <div className="grid border-l border-t border-white/10 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.07,
                  ease: EASE,
                }}
                className="group relative min-h-[360px] overflow-hidden border-b border-r border-white/10 bg-[#111111] p-7 transition-colors duration-500 hover:bg-white sm:p-9 lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[0.62rem] tracking-[0.22em] text-white/30 transition-colors duration-500 group-hover:text-black/40">
                    {service.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition-all duration-500 group-hover:border-black/15 group-hover:text-black">
                    <Icon size={19} strokeWidth={1.25} />
                  </div>
                </div>

                <div className="absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9 lg:inset-x-10 lg:bottom-10">
                  <h3
                    className="max-w-[340px] leading-[1.05] tracking-[-0.045em] text-white transition-colors duration-500 group-hover:text-black"
                    style={{
                      fontSize: "clamp(1.8rem, 2.8vw, 3rem)",
                    }}
                  >
                    {service.title[language]}
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/45 transition-colors duration-500 group-hover:text-black/55">
                    {service.description[language]}
                  </p>

                  <div className="mt-7 flex translate-y-3 items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em] text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {t.learnMore}

                    <ArrowUpRight size={14} strokeWidth={1.4} />
                  </div>
                </div>

                <span className="pointer-events-none absolute -bottom-12 -right-5 text-[9rem] font-medium leading-none tracking-[-0.08em] text-white/[0.025] transition-colors duration-500 group-hover:text-black/[0.035]">
                  {service.number}
                </span>
              </motion.article>
            );
          })}
        </div>

        {/* Нижняя строка */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.62rem] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footerLeft}</span>
          <span>{t.footerRight}</span>
        </div>
      </div>
    </section>
  );
}