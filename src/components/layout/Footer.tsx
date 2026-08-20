import { company } from "../../data/company";
import type { Language } from "../../types/motorcycle";

type FooterProps = {
  language: Language;
};

type NavigationItem = {
  href: string;
  en: string;
  ru: string;
};

const navigation: NavigationItem[] = [
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
    href: "#process",
    en: "Purchase Process",
    ru: "Процесс покупки",
  },
  {
    href: "#contacts",
    en: "Contacts",
    ru: "Контакты",
  },
];

const translations = {
  en: {
    description:
      "Exceptional motorcycles selected and delivered with uncompromising attention to detail.",
    navigation: "Navigation",
    contacts: "Contacts",
    showroom: "Private showroom",
    consultation: "Request a consultation",
    social: "Social",
    instagram: "Instagram",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    backToTop: "Back to top",
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    openMap: "Open showroom location",
  },

  ru: {
    description:
      "Исключительные мотоциклы, подобранные и доставленные с безупречным вниманием к деталям.",
    navigation: "Навигация",
    contacts: "Контакты",
    showroom: "Частный шоурум",
    consultation: "Получить консультацию",
    social: "Социальные сети",
    instagram: "Instagram",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    backToTop: "Наверх",
    rights: "Все права защищены",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    openMap: "Открыть расположение шоурума",
  },
};

export default function Footer({
  language,
}: FooterProps) {
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-[#080808] text-white">
      <div className="mx-auto max-w-[1500px] px-6 pb-8 pt-20 sm:px-10 lg:px-16 lg:pt-28">
        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.9fr_0.7fr] lg:gap-10 lg:pb-20">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-4"
              aria-label={company.name}
            >
              <span className="flex h-11 w-11 items-center justify-center border border-white/25">
                <span className="h-3 w-3 bg-white" />
              </span>

              <span>
                <span className="block text-xl font-medium uppercase tracking-[0.22em]">
                  VELORA
                </span>

                <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.42em] text-white/35">
                  Moto
                </span>
              </span>
            </a>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
              {t.description}
            </p>

            <a
              href="#contacts"
              className="mt-8 inline-flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 hover:text-white"
            >
              {t.consultation}

              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/25">
              {t.navigation}
            </p>

            <nav className="mt-7 flex flex-col items-start gap-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {item[language]}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/25">
              {t.contacts}
            </p>

            <div className="mt-7 space-y-5 text-sm leading-6 text-white/50">
              <a
                href={`tel:${company.phoneLink}`}
                className="block transition-colors duration-300 hover:text-white"
              >
                {company.phoneDisplay}
              </a>

              <a
                href={`mailto:${company.email}`}
                className="block break-all transition-colors duration-300 hover:text-white"
              >
                {company.email}
              </a>

              <div>
                <p className="text-white/65">
                  {t.showroom}
                </p>

                <a
                  href={company.map}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.openMap}
                  className="mt-1 block text-white/30 transition-colors duration-300 hover:text-white"
                >
                  {company.address[language]}
                </a>

                <p className="mt-1 text-white/30">
                  {company.schedule[language]}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/25">
              {t.social}
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={company.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-white/10 px-4 py-4 text-sm text-white/50 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                {t.instagram}

                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={company.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-white/10 px-4 py-4 text-sm text-white/50 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                {t.telegram}

                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={company.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-white/10 px-4 py-4 text-sm text-white/50 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                {t.whatsapp}

                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-b border-white/10 py-10 sm:py-14">
          <p
            className="whitespace-nowrap text-center font-normal uppercase leading-none tracking-[-0.075em] text-white/[0.08]"
            style={{
              fontSize:
                "clamp(4.2rem, 14vw, 13rem)",
            }}
          >
            VELORA MOTO
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-7 text-[0.6rem] uppercase tracking-[0.16em] text-white/25 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {company.name}.{" "}
            {t.rights}.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#contacts"
              className="transition-colors duration-300 hover:text-white"
            >
              {t.privacy}
            </a>

            <a
              href="#contacts"
              className="transition-colors duration-300 hover:text-white"
            >
              {t.terms}
            </a>

            <a
              href="#top"
              className="flex items-center gap-3 text-white/45 transition-colors duration-300 hover:text-white"
            >
              {t.backToTop}

              <span className="flex h-8 w-8 items-center justify-center border border-white/15">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}