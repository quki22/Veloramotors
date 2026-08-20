import { useEffect, useState } from "react";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import AboutSection from "./components/sections/AboutSection";
import BrandsSection from "./components/sections/BrandsSection";
import ContactsSection from "./components/sections/ContactsSection";
import HeroSection from "./components/sections/HeroSection";
import MotorcycleApproachSection from "./components/sections/MotorcycleApproachSection";
import MotorcyclesSection from "./components/sections/MotorcyclesSection";
import PurchaseProcessSection from "./components/sections/PurchaseProcessSection";
import ServicesSection from "./components/sections/ServicesSection";

export type Language = "en" | "ru";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "en"
        ? "VELORA MOTO — Premium Motorcycle Boutique"
        : "VELORA MOTO — Премиальный мотобутик";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "ru" : "en",
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0f0f0f] text-white">
      <Header
        language={language}
        onLanguageChange={toggleLanguage}
      />

      <main>
        <HeroSection language={language} />

        <MotorcyclesSection language={language} />

        <MotorcycleApproachSection language={language} />

        <BrandsSection language={language} />

        <ServicesSection language={language} />

        <AboutSection language={language} />

        <PurchaseProcessSection language={language} />

        <ContactsSection language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}
