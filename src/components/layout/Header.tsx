import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type Language = "en" | "ru";

type HeaderProps = {
  language: Language;
  onLanguageChange: () => void;
};

const navigation = [
  {
    href: "#motorcycles",
    en: "Motorcycles",
    ru: "Мотоциклы",
  },
  {
    href: "#brands",
    en: "Brands",
    ru: "Бренды",
  },
  {
    href: "#services",
    en: "Services",
    ru: "Услуги",
  },
  {
    href: "#about",
    en: "About",
    ru: "О нас",
  },
  {
    href: "#contacts",
    en: "Contacts",
    ru: "Контакты",
  },
];

const translations = {
  en: {
    consultation: "Consultation",
    menu: "Navigation",
  },

  ru: {
    consultation: "Консультация",
    menu: "Навигация",
  },
};

export default function Header({
  language,
  onLanguageChange,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? "border-white/10 bg-[#0f0f0f]/90 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:h-[88px] lg:px-16">
          <a
            href="#top"
            onClick={closeMenu}
            className="relative z-50 flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-white/30">
              <span className="h-2 w-2 bg-white" />
            </span>

            <span>
              <span className="block text-sm font-medium uppercase tracking-[0.22em] text-white">
                VELORA
              </span>

              <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.38em] text-white/40">
                Moto
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 xl:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.63rem] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
              >
                {item[language]}
              </a>
            ))}
          </nav>

          <div className="relative z-50 flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onLanguageChange}
              className="flex h-10 min-w-12 items-center justify-center border border-white/15 px-3 text-[0.62rem] uppercase tracking-[0.18em] text-white/70 transition-all hover:bg-white hover:text-black"
            >
              {language === "en" ? "RU" : "EN"}
            </button>

            <a
              href="#contacts"
              className="group hidden h-11 items-center gap-4 border border-white/15 px-5 text-[0.62rem] uppercase tracking-[0.16em] text-white/75 transition-all hover:bg-white hover:text-black md:flex"
            >
              {t.consultation}

              <ArrowUpRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((current) => !current);
              }}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-all hover:bg-white hover:text-black xl:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={19} strokeWidth={1.4} />
              ) : (
                <Menu size={19} strokeWidth={1.4} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-40 bg-[#0b0b0b] px-6 pb-10 pt-28 text-white sm:px-10 xl:hidden"
          >
            <div className="mx-auto max-w-[1500px]">
              <p className="mb-6 border-b border-white/10 pb-5 text-[0.6rem] uppercase tracking-[0.25em] text-white/30">
                {t.menu}
              </p>

              <nav>
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="flex items-center justify-between border-b border-white/10 py-5"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-[0.6rem] tracking-[0.2em] text-white/25">
                        0{index + 1}
                      </span>

                      <span
                        className="tracking-[-0.045em]"
                        style={{
                          fontSize: "clamp(2rem, 8vw, 4.5rem)",
                        }}
                      >
                        {item[language]}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.3}
                      className="text-white/35"
                    />
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}