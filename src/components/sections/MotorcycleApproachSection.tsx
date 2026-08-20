import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

import type { Language } from "../../types/motorcycle";

const EASE = [0.22, 1, 0.36, 1] as const;

type DiagramItem = {
  id: "selection" | "import" | "support";
  angle: number;
};

type MotorcycleApproachSectionProps = {
  language: Language;
};

type GlitchBlock = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const diagramItems: DiagramItem[] = [
  {
    id: "selection",
    angle: 215,
  },
  {
    id: "import",
    angle: 335,
  },
  {
    id: "support",
    angle: 110,
  },
];

const translations = {
  en: {
    titleFirst: "Our Comprehensive",
    titleSecond: "Motorcycle Approach",
    quote:
      "We do more than sell motorcycles — we select a machine that matches its owner’s character, experience and riding style. From the first conversation to the key handover, every step remains clear, secure and personal.",
    imageAlt: "Premium VELORA MOTO motorcycle",
    signature: "Premium Motorcycle Boutique",
    diagram: {
      selection: "selection",
      import: "import",
      support: "support",
    },
  },
  ru: {
    titleFirst: "Комплексный",
    titleSecond: "подход к мотоциклам",
    quote:
      "Мы не просто продаём мотоциклы — мы подбираем технику, которая соответствует характеру, опыту и стилю езды владельца. От первого обращения до передачи ключей весь процесс остаётся понятным, безопасным и персональным.",
    imageAlt: "Премиальный мотоцикл VELORA MOTO",
    signature: "Премиальный мотобутик",
    diagram: {
      selection: "подбор",
      import: "импорт",
      support: "сопровождение",
    },
  },
};

const glitchBlocks: GlitchBlock[] = [
  { x: 2, y: -3, width: 22, height: 22 },
  { x: 12, y: -5, width: 14, height: 10 },
  { x: 28, y: -2, width: 10, height: 10 },
  { x: 82, y: 22, width: 8, height: 8 },
  { x: -4, y: 75, width: 16, height: 12 },
  { x: 8, y: 82, width: 10, height: 10 },
  { x: -2, y: 88, width: 18, height: 16 },
  { x: 56, y: 82, width: 12, height: 14 },
  { x: 70, y: 90, width: 10, height: 10 },
  { x: 42, y: 94, width: 8, height: 6 },
];

function getPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: 50 + Math.cos(radians) * radius,
    y: 50 + Math.sin(radians) * radius,
  };
}

export default function MotorcycleApproachSection({
  language,
}: MotorcycleApproachSectionProps) {
  const t = translations[language];

  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-60px",
  });

  const [activeLabel, setActiveLabel] =
    useState<DiagramItem["id"] | null>(null);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="overflow-x-hidden bg-[#0f0f0f] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        {/* Заголовок */}
        <div className="mb-20 flex items-start gap-4">
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
              className="font-light leading-[1.18] tracking-[-0.02em] text-[#6e6e6e]"
              style={{
                fontSize: "clamp(2rem, 3.4vw, 2.8rem)",
              }}
            >
              {t.titleFirst}
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: EASE,
              }}
              className="font-light leading-[1.18] tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(2rem, 3.4vw, 2.8rem)",
              }}
            >
              {t.titleSecond}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.5,
              delay: 0.25,
              ease: EASE,
            }}
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 text-white/70"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 1.5V10.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />

              <path
                d="M1.5 6H10.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Основной контент */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Левая часть */}
          <div className="flex min-w-0 flex-1 flex-col gap-10 sm:flex-row sm:items-start">
            {/* Изображение */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: EASE,
              }}
              className="relative shrink-0"
              style={{
                width: 250,
                height: 310,
              }}
            >
              <img
                src="/images/motorcycles-v2/triumph-speed-triple-1200-rs.webp"
                alt={t.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale"
              />

              {glitchBlocks.map((block, index) => (
                <motion.span
                  key={`${block.x}-${block.y}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0, 1, 0.9],
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          scale: 0,
                        }
                  }
                  transition={{
                    duration: 0.35,
                    delay: 0.5 + index * 0.05,
                    ease: EASE,
                  }}
                  className="pointer-events-none absolute bg-white"
                  style={{
                    left: `${block.x}%`,
                    top: `${block.y}%`,
                    width: block.width,
                    height: block.height,
                  }}
                />
              ))}
            </motion.div>

            {/* Текст */}
            <div className="min-w-0 max-w-[430px]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: EASE,
                }}
                className="text-[#555555]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "3.2rem",
                  lineHeight: 0.7,
                }}
              >
                “
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: EASE,
                }}
                className="font-normal leading-[1.58] text-white/90"
                style={{
                  fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
                }}
              >
                {t.quote}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                  ease: EASE,
                }}
                className="mt-10"
              >
                <p className="text-[1.15rem] font-medium tracking-[0.01em] text-white">
                  VELORA MOTO
                </p>

                <p className="mt-1 text-[0.85rem] tracking-wide text-[#6e6e6e]">
                  {t.signature}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Круговая схема */}
          <div className="flex w-full max-w-[360px] shrink-0 items-center justify-center self-center sm:max-w-[400px] lg:max-w-[440px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: EASE,
              }}
              className="relative aspect-square w-full"
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="white"
                  strokeWidth="0.18"
                  opacity="0.45"
                />

                {diagramItems.map((item) => {
                  const endPoint = getPoint(item.angle, 36);
                  const active = activeLabel === item.id;

                  return (
                    <motion.line
                      key={item.id}
                      x1="50"
                      y1="50"
                      x2={endPoint.x}
                      y2={endPoint.y}
                      stroke="white"
                      initial={false}
                      animate={{
                        strokeWidth: active ? 0.6 : 0.18,
                        opacity: active ? 1 : 0.45,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: EASE,
                      }}
                    />
                  );
                })}
              </svg>

              {diagramItems.map((item, index) => {
                const point = getPoint(item.angle, 46);
                const active = activeLabel === item.id;

                return (
                  <div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 16 }}
                      animate={
                        isInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      transition={{
                        duration: 0.7,
                        delay: 0.6 + index * 0.15,
                        ease: EASE,
                      }}
                      onMouseEnter={() => setActiveLabel(item.id)}
                      onMouseLeave={() => setActiveLabel(null)}
                      onFocus={() => setActiveLabel(item.id)}
                      onBlur={() => setActiveLabel(null)}
                      className="whitespace-nowrap text-white outline-none"
                      style={{
                        fontSize: "clamp(1rem, 2.4vw, 2rem)",
                        fontWeight: active ? 700 : 300,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {t.diagram[item.id]}
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
