import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { ArrowUpRight } from "lucide-react";

import { useEffect, useState } from "react";

import type { Language } from "../../types/motorcycle";


type BrandsSectionProps = {
  language: Language;
};


type Brand = {
  name: string;

  country: {
    en: string;
    ru: string;
  };

  model: string;

  image: string;
};


const EASE = [0.22, 1, 0.36, 1] as const;


const FALLBACK_IMAGE =
  "/images/motorcycle-placeholder.jpg";


const translations = {
  en: {
    eyebrow: "Selected Marques",

    titleFirst: "Icons of",

    titleSecond: "Motorcycle Culture",

    description:
      "We work with the most significant motorcycle manufacturers — from Italian superbikes to German engineering and British character.",

    explore: "Explore motorcycles",

    index: "Brand",
  },


  ru: {
    eyebrow: "Избранные бренды",

    titleFirst: "Иконы",

    titleSecond: "мотокультуры",

    description:
      "Мы работаем с ведущими производителями мотоциклов — от итальянских супербайков до немецкой инженерии и британского характера.",

    explore: "Смотреть мотоциклы",

    index: "Бренд",
  },
};


const brands: Brand[] = [

  {
    name: "Ducati",

    country: {
      en: "Italy",
      ru: "Италия",
    },

    model: "Panigale V4 S",

    image:
      "/images/motorcycles-v2/ducati-panigale-v4-s.webp",
  },


  {
    name: "BMW Motorrad",

    country: {
      en: "Germany",
      ru: "Германия",
    },

    model: "M 1000 RR",

    image:
      "/images/motorcycles-v2/bmw-m-1000-rr.webp",
  },


  {
    name: "MV Agusta",

    country: {
      en: "Italy",
      ru: "Италия",
    },

    model: "Superveloce 1000",

    image:
      "/images/motorcycles-v2/mv-agusta-superveloce-1000.webp",
  },


  {
    name: "Triumph",

    country: {
      en: "United Kingdom",
      ru: "Великобритания",
    },

    model: "Speed Triple 1200 RS",

    image:
      "/images/motorcycles-v2/triumph-speed-triple-1200-rs.webp",
  },


  {
    name: "Aprilia",

    country: {
      en: "Italy",
      ru: "Италия",
    },

    model: "RSV4 Factory",

    image:
      "/images/motorcycles-v2/aprilia-rsv4-factory.webp",
  },


  {
    name: "Harley-Davidson",

    country: {
      en: "United States",
      ru: "США",
    },

    model: "CVO Road Glide",

    image:
      "/images/motorcycles-v2/harley-cvo-road-glide.webp",
  },

];


export default function BrandsSection({
  language,
}: BrandsSectionProps) {


  const [activeBrandIndex, setActiveBrandIndex] =
    useState(0);


  const t = translations[language];


  const activeBrand =
    brands[activeBrandIndex];


  useEffect(() => {

    brands.forEach((brand) => {

      const img = new Image();

      img.src = brand.image;

    });

  }, []);



  function openBrandCatalog(
    brandName: string
  ) {

    window.dispatchEvent(
      new CustomEvent(
        "velora:brand-selected",
        {
          detail: {
            brand: brandName,
          },
        }
      )
    );

  }  return (
    <section
      id="brands"
      className="overflow-hidden bg-[#0f0f0f] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">

        <div className="mb-16 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <motion.p
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
              }}
              transition={{
                duration: 0.9,
                ease: EASE,
              }}
              className="font-normal leading-[0.92] tracking-[-0.06em]"
              style={{
                fontSize:
                  "clamp(3.2rem,7vw,7rem)",
              }}
            >

              {t.titleFirst}

              <span className="block text-white/35">
                {t.titleSecond}
              </span>

            </motion.h2>

          </div>


          <p className="max-w-md text-sm leading-7 text-white/50">
            {t.description}
          </p>


        </div>


        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.92fr_1.08fr]">


          {/* BRAND LIST */}

          <div className="bg-[#111111]">

            {brands.map((brand,index)=>{

              const active =
                index === activeBrandIndex;


              return (

                <motion.button

                  key={brand.name}

                  type="button"

                  onMouseEnter={() =>
                    setActiveBrandIndex(index)
                  }

                  onClick={()=>{
                    setActiveBrandIndex(index);
                  }}

                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    px-6
                    py-7
                    text-left
                    transition-all
                    duration-300
                    sm:px-8
                    lg:px-10

                    ${
                      active
                      ?
                      "bg-white text-black"
                      :
                      "hover:bg-white/[0.05]"
                    }
                  `}

                >

                  <div className="flex items-center gap-6">


                    <span
                      className={`
                        text-[0.65rem]
                        tracking-[0.2em]
                        ${
                          active
                          ?
                          "text-black/40"
                          :
                          "text-white/30"
                        }
                      `}
                    >
                      {String(index+1).padStart(2,"0")}
                    </span>


                    <div>

                      <p
                        className="tracking-[-0.04em]"
                        style={{
                          fontSize:
                          "clamp(1.5rem,3vw,3rem)"
                        }}
                      >
                        {brand.name}
                      </p>


                      <p
                        className={`
                          mt-1
                          text-[0.65rem]
                          uppercase
                          tracking-[0.18em]

                          ${
                            active
                            ?
                            "text-black/40"
                            :
                            "text-white/30"
                          }
                        `}
                      >
                        {brand.country[language]}
                      </p>

                    </div>


                  </div>


                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.3}
                  />


                </motion.button>

              );

            })}

          </div>



          {/* IMAGE AREA */}


          <div className="
            relative
            min-h-[520px]
            overflow-hidden
            bg-[#080808]
            lg:min-h-[720px]
          ">


            <AnimatePresence
              mode="wait"
            >

              <motion.img

                key={activeBrand.image}

                src={activeBrand.image}

                alt={`${activeBrand.name} ${activeBrand.model}`}


                onError={(event)=>{

                  event.currentTarget.onerror=null;

                  event.currentTarget.src =
                    FALLBACK_IMAGE;

                }}


                initial={{
                  opacity:0,
                  scale:1.08,
                }}


                animate={{
                  opacity:1,
                  scale:1,
                }}


                exit={{
                  opacity:0,
                  scale:1.04,
                }}


                transition={{
                  duration:0.5,
                  ease:EASE,
                }}


                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                  object-center
                  scale-90
                "

              />

            </AnimatePresence>



            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-black/20
                to-transparent
              "
            />


            <div className="
              absolute
              inset-x-0
              bottom-0
              p-8
              lg:p-12
            ">


              <p className="
                text-[0.65rem]
                uppercase
                tracking-[0.24em]
                text-white/40
              ">
                {t.index}{" "}
                {String(activeBrandIndex+1).padStart(2,"0")}
              </p>



              <h3
                className="
                  mt-4
                  leading-none
                  tracking-[-0.05em]
                "
                style={{
                  fontSize:
                  "clamp(3rem,6vw,6rem)"
                }}
              >

                {activeBrand.name}

              </h3>



              <div className="
                mt-6
                flex
                items-center
                justify-between
                border-t
                border-white/20
                pt-5
              ">


                <div>

                  <p className="text-white/80">
                    {activeBrand.model}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {activeBrand.country[language]}
                  </p>

                </div>



                <button

                  onClick={()=>
                    openBrandCatalog(
                      activeBrand.name
                    )
                  }

                  className="
                    flex
                    items-center
                    gap-3
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-white/70
                  "
                >

                  {t.explore}

                  <ArrowUpRight
                    size={16}
                  />

                </button>


              </div>


            </div>


          </div>


        </div>

      </div>

    </section>
  );
}
