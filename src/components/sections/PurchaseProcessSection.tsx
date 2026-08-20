import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CreditCard,
  MessageSquare,
  Search,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Language = "en" | "ru";

type PurchaseProcessSectionProps = {
  language: Language;
};

type ProcessStep = {
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
  duration: {
    en: string;
    ru: string;
  };
};

const EASE = [0.22, 1, 0.36, 1] as const;

const translations = {
  en: {
    eyebrow: "How It Works",
    titleFirst: "From Request",
    titleSecond: "To First Ride",
    description:
      "A clear and transparent process built around your preferences. We manage every stage while keeping you informed from the first conversation to final delivery.",
    durationLabel: "Estimated stage",
    consultation: "Start your journey",
    scroll: "Five clear stages",
  },

  ru: {
    eyebrow: "Как проходит покупка",
    titleFirst: "От заявки",
    titleSecond: "до первой поездки",
    description:
      "Понятный и прозрачный процесс, построенный вокруг ваших предпочтений. Мы сопровождаем каждый этап — от первой консультации до финальной передачи мотоцикла.",
    durationLabel: "Срок этапа",
    consultation: "Начать подбор",
    scroll: "Пять понятных этапов",
  },
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: {
      en: "Personal Consultation",
      ru: "Личная консультация",
    },
    description: {
      en: "We discuss your riding experience, preferred class, design, performance requirements and budget.",
      ru: "Обсуждаем ваш опыт, желаемый класс мотоцикла, дизайн, характеристики и бюджет.",
    },
    duration: {
      en: "1 day",
      ru: "1 день",
    },
  },
  {
    number: "02",
    icon: Search,
    title: {
      en: "Global Search",
      ru: "Поиск мотоцикла",
    },
    description: {
      en: "We search trusted dealers, private collections and international markets for the right motorcycle.",
      ru: "Ищем подходящий мотоцикл у проверенных дилеров, в частных коллекциях и на зарубежных рынках.",
    },
    duration: {
      en: "3–14 days",
      ru: "3–14 дней",
    },
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: {
      en: "Inspection & Approval",
      ru: "Проверка и согласование",
    },
    description: {
      en: "The motorcycle receives a technical inspection, document verification and detailed condition report.",
      ru: "Проводим техническую диагностику, проверку документов и предоставляем подробный отчёт о состоянии.",
    },
    duration: {
      en: "1–3 days",
      ru: "1–3 дня",
    },
  },
  {
    number: "04",
    icon: CreditCard,
    title: {
      en: "Purchase & Documentation",
      ru: "Оплата и документы",
    },
    description: {
      en: "We coordinate payment, prepare all documents and handle customs procedures when required.",
      ru: "Согласовываем оплату, оформляем документы и сопровождаем таможенные процедуры при необходимости.",
    },
    duration: {
      en: "1–5 days",
      ru: "1–5 дней",
    },
  },
  {
    number: "05",
    icon: Truck,
    title: {
      en: "Delivery & Handover",
      ru: "Доставка и передача",
    },
    description: {
      en: "Your motorcycle is transported securely, prepared for the road and personally handed over to you.",
      ru: "Безопасно доставляем мотоцикл, подготавливаем его к эксплуатации и передаём лично владельцу.",
    },
    duration: {
      en: "7–30 days",
      ru: "7–30 дней",
    },
  },
];

function PurchaseProcessSection({
  language,
}: PurchaseProcessSectionProps) {
  const t = translations[language];

  return (
    <section
      id="process"
      className="overflow-hidden bg-[#0f0f0f] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mb-16 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              key={`${language}-process-eyebrow`}
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
              key={`${language}-process-title`}
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
            key={`${language}-process-description`}
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
              className="group mt-7 inline-flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 hover:text-white"
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

        <div className="border border-white/10">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-40px",
                }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: EASE,
                }}
                className="group grid border-b border-white/10 bg-[#111111] transition-colors duration-500 last:border-b-0 hover:bg-white lg:grid-cols-[120px_1fr_1.1fr_220px]"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-6 transition-colors duration-500 group-hover:border-black/10 sm:px-8 lg:justify-center lg:border-b-0 lg:border-r lg:px-5 lg:py-10">
                  <span className="text-[0.7rem] tracking-[0.25em] text-white/30 transition-colors duration-500 group-hover:text-black/40">
                    {step.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors duration-500 group-hover:border-black/15 group-hover:text-black lg:hidden">
                    <Icon size={18} strokeWidth={1.25} />
                  </div>
                </div>

                <div className="flex items-center gap-6 border-b border-white/10 px-6 py-8 transition-colors duration-500 group-hover:border-black/10 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center border border-white/15 text-white/65 transition-colors duration-500 group-hover:border-black/15 group-hover:text-black lg:flex">
                    <Icon size={20} strokeWidth={1.25} />
                  </div>

                  <h3
                    className="leading-[1.03] tracking-[-0.045em] text-white transition-colors duration-500 group-hover:text-black"
                    style={{
                      fontSize: "clamp(1.7rem, 2.7vw, 3rem)",
                    }}
                  >
                    {step.title[language]}
                  </h3>
                </div>

                <div className="flex items-center border-b border-white/10 px-6 py-8 transition-colors duration-500 group-hover:border-black/10 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
                  <p className="max-w-xl text-sm leading-7 text-white/45 transition-colors duration-500 group-hover:text-black/55">
                    {step.description[language]}
                  </p>
                </div>

                <div className="flex items-center justify-between px-6 py-7 sm:px-8 lg:px-9 lg:py-12">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/25 transition-colors duration-500 group-hover:text-black/35">
                      {t.durationLabel}
                    </p>

                    <p className="mt-2 text-sm text-white/65 transition-colors duration-500 group-hover:text-black/70">
                      {step.duration[language]}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.25}
                    className="-translate-x-2 text-white/25 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-black group-hover:opacity-100"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/30">
            {t.scroll}
          </p>

          <ArrowDown
            size={17}
            strokeWidth={1.3}
            className="animate-bounce text-white/35"
          />
        </div>
      </div>
    </section>
  );
}

export default PurchaseProcessSection;