import {
  useRef,
  useState,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { company } from "../../data/company";
import {
  submitContactForm,
  type ContactFormData,
} from "../../services/contactService";
import type { Language } from "../../types/motorcycle";

type ContactsSectionProps = {
  language: Language;
};

type FormStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const translations = {
  en: {
    eyebrow: "Private Consultation",
    titleFirst: "Start Your",
    titleSecond: "Next Journey",
    description:
      "Tell us which motorcycle you are looking for. Our specialist will contact you, clarify the details and prepare a personal selection.",

    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Showroom",
    scheduleLabel: "Working hours",

    formTitle: "Request a consultation",
    formDescription:
      "Leave your contact details and we will get back to you shortly.",

    name: "Your name",
    namePlaceholder: "Enter your name",

    phone: "Phone number",
    phonePlaceholder: "+39 ___ ___ ____",

    email: "Email",
    emailPlaceholder: "name@example.com",

    motorcycle: "Motorcycle or brand",
    motorcyclePlaceholder: "Ducati, BMW, Triumph...",

    message: "Message",
    messagePlaceholder:
      "Tell us about the motorcycle you are looking for",

    submit: "Send request",
    submitting: "Sending request",

    privacy:
      "By submitting the form, you agree to the processing of your contact information.",

    successTitle: "Request received",
    successText:
      "Thank you. Your request has been saved. Our specialist will contact you shortly.",
    newRequest: "Send another request",

    errorTitle: "Request was not sent",
    errorText:
      "Something went wrong. Please check the entered information and try again.",
    retry: "Try again",

    nameRequired: "Enter your name.",
    nameShort:
      "The name must contain at least 2 characters.",

    phoneRequired: "Enter your phone number.",
    phoneInvalid:
      "Enter a valid phone number containing at least 10 digits.",

    emailInvalid: "Enter a valid email address.",
  },

  ru: {
    eyebrow: "Персональная консультация",
    titleFirst: "Начните своё",
    titleSecond: "новое путешествие",
    description:
      "Расскажите, какой мотоцикл вы ищете. Наш специалист свяжется с вами, уточнит детали и подготовит персональную подборку.",

    phoneLabel: "Телефон",
    emailLabel: "Электронная почта",
    addressLabel: "Шоурум",
    scheduleLabel: "График работы",

    formTitle: "Получить консультацию",
    formDescription:
      "Оставьте контактные данные, и мы свяжемся с вами в ближайшее время.",

    name: "Ваше имя",
    namePlaceholder: "Введите имя",

    phone: "Номер телефона",
    phonePlaceholder: "+39 ___ ___ ____",

    email: "Электронная почта",
    emailPlaceholder: "name@example.com",

    motorcycle: "Мотоцикл или бренд",
    motorcyclePlaceholder: "Ducati, BMW, Triumph...",

    message: "Сообщение",
    messagePlaceholder:
      "Расскажите, какой мотоцикл вы ищете",

    submit: "Отправить заявку",
    submitting: "Отправляем заявку",

    privacy:
      "Отправляя форму, вы соглашаетесь на обработку контактной информации.",

    successTitle: "Заявка принята",
    successText:
      "Спасибо. Ваша заявка сохранена. Наш специалист свяжется с вами в ближайшее время.",
    newRequest: "Отправить ещё одну заявку",

    errorTitle: "Не удалось отправить заявку",
    errorText:
      "Произошла ошибка. Проверьте введённые данные и попробуйте снова.",
    retry: "Попробовать снова",

    nameRequired: "Введите ваше имя.",
    nameShort:
      "Имя должно содержать не менее 2 символов.",

    phoneRequired: "Введите номер телефона.",
    phoneInvalid:
      "Введите корректный номер, содержащий не менее 10 цифр.",

    emailInvalid:
      "Введите корректный адрес электронной почты.",
  },
};

function getFormValue(
  formData: FormData,
  fieldName: string,
) {
  const value = formData.get(fieldName);

  return typeof value === "string"
    ? value.trim()
    : "";
}

export default function ContactsSection({
  language,
}: ContactsSectionProps) {
  const t = translations[language];

  const formRef =
    useRef<HTMLFormElement | null>(null);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [formErrors, setFormErrors] =
    useState<FormErrors>({});

  const [submitError, setSubmitError] =
    useState("");

  function validateForm(
    data: ContactFormData,
  ): FormErrors {
    const errors: FormErrors = {};

    if (!data.name) {
      errors.name = t.nameRequired;
    } else if (data.name.length < 2) {
      errors.name = t.nameShort;
    }

    if (!data.phone) {
      errors.phone = t.phoneRequired;
    } else {
      const phoneDigits = data.phone.replace(
        /\D/g,
        "",
      );

      if (phoneDigits.length < 10) {
        errors.phone = t.phoneInvalid;
      }
    }

    if (data.email) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(data.email)) {
        errors.email = t.emailInvalid;
      }
    }

    return errors;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const formElement = event.currentTarget;

    const browserFormData =
      new FormData(formElement);

    const contactData: ContactFormData = {
      name: getFormValue(
        browserFormData,
        "name",
      ),

      phone: getFormValue(
        browserFormData,
        "phone",
      ),

      email:
        getFormValue(
          browserFormData,
          "email",
        ) || undefined,

      motorcycle:
        getFormValue(
          browserFormData,
          "motorcycle",
        ) || undefined,

      message:
        getFormValue(
          browserFormData,
          "message",
        ) || undefined,

      language,
    };

    const validationErrors =
      validateForm(contactData);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setFormErrors(validationErrors);
      setSubmitError("");
      setStatus("idle");

      return;
    }

    setFormErrors({});
    setSubmitError("");
    setStatus("loading");

    try {
      await submitContactForm(contactData);

      formElement.reset();
      setStatus("success");
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error,
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : t.errorText,
      );

      setStatus("error");
    }
  }

  function resetFormState() {
    setStatus("idle");
    setFormErrors({});
    setSubmitError("");

    window.setTimeout(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>(
          'input[name="name"]',
        )
        ?.focus();
    }, 50);
  }

  const inputClassName =
    "mt-3 w-full border-0 border-b bg-transparent px-0 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/20";

  function getInputClassName(
    hasError: boolean,
  ) {
    return `${inputClassName} ${
      hasError
        ? "border-red-400/70 focus:border-red-400"
        : "border-white/15 focus:border-white"
    }`;
  }

  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-[#0b0b0b] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <motion.p
              key={`${language}-contacts-eyebrow`}
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
              key={`${language}-contacts-title`}
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
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
                fontSize:
                  "clamp(3.2rem, 7vw, 7rem)",
              }}
            >
              {t.titleFirst}

              <span className="block text-white/35">
                {t.titleSecond}
              </span>
            </motion.h2>

            <motion.p
              key={`${language}-contacts-description`}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: EASE,
              }}
              className="mt-9 max-w-lg text-sm leading-7 text-white/50"
            >
              {t.description}
            </motion.p>

            <div className="mt-12 border-t border-white/10">
              <a
                href={`tel:${company.phoneLink}`}
                className="group flex items-center justify-between border-b border-white/10 py-6"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    <Phone
                      size={18}
                      strokeWidth={1.3}
                    />
                  </div>

                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                      {t.phoneLabel}
                    </p>

                    <p className="mt-2 text-sm text-white/75">
                      {company.phoneDisplay}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                />
              </a>

              <a
                href={`mailto:${company.email}`}
                className="group flex items-center justify-between border-b border-white/10 py-6"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    <Mail
                      size={18}
                      strokeWidth={1.3}
                    />
                  </div>

                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                      {t.emailLabel}
                    </p>

                    <p className="mt-2 text-sm text-white/75">
                      {company.email}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                />
              </a>

              <a
                href={company.map}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-6"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    <MapPin
                      size={18}
                      strokeWidth={1.3}
                    />
                  </div>

                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                      {t.addressLabel}
                    </p>

                    <p className="mt-2 text-sm text-white/75">
                      {company.address[language]}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                />
              </a>

              <div className="flex items-center gap-5 border-b border-white/10 py-6">
                <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/55">
                  <Clock3
                    size={18}
                    strokeWidth={1.3}
                  />
                </div>

                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                    {t.scheduleLabel}
                  </p>

                  <p className="mt-2 text-sm text-white/75">
                    {company.schedule[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: EASE,
            }}
            className="border border-white/10 bg-[#111111] p-6 sm:p-9 lg:p-12"
          >
            <div className="border-b border-white/10 pb-8">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/30">
                VELORA MOTO / CONTACT
              </p>

              <h3
                className="mt-5 leading-none tracking-[-0.05em]"
                style={{
                  fontSize:
                    "clamp(2.2rem, 4vw, 4.5rem)",
                }}
              >
                {t.formTitle}
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">
                {t.formDescription}
              </p>
            </div>

            {status === "success" ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center border border-white/15">
                  <CheckCircle2
                    size={28}
                    strokeWidth={1.2}
                  />
                </div>

                <h4 className="mt-7 text-3xl tracking-[-0.04em]">
                  {t.successTitle}
                </h4>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
                  {t.successText}
                </p>

                <button
                  type="button"
                  onClick={resetFormState}
                  className="mt-8 border border-white/15 px-6 py-4 text-[0.62rem] uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:bg-white hover:text-black"
                >
                  {t.newRequest}
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="mt-9 grid gap-7 sm:grid-cols-2"
              >
                <label className="block">
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                    {t.name}
                  </span>

                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t.namePlaceholder}
                    aria-invalid={
                      Boolean(formErrors.name)
                    }
                    className={getInputClassName(
                      Boolean(formErrors.name),
                    )}
                  />

                  {formErrors.name && (
                    <span className="mt-2 block text-xs text-red-300/80">
                      {formErrors.name}
                    </span>
                  )}
                </label>

                <label className="block">
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                    {t.phone}
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder={t.phonePlaceholder}
                    aria-invalid={
                      Boolean(formErrors.phone)
                    }
                    className={getInputClassName(
                      Boolean(formErrors.phone),
                    )}
                  />

                  {formErrors.phone && (
                    <span className="mt-2 block text-xs text-red-300/80">
                      {formErrors.phone}
                    </span>
                  )}
                </label>

                <label className="block">
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                    {t.email}
                  </span>

                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t.emailPlaceholder}
                    aria-invalid={
                      Boolean(formErrors.email)
                    }
                    className={getInputClassName(
                      Boolean(formErrors.email),
                    )}
                  />

                  {formErrors.email && (
                    <span className="mt-2 block text-xs text-red-300/80">
                      {formErrors.email}
                    </span>
                  )}
                </label>

                <label className="block">
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                    {t.motorcycle}
                  </span>

                  <input
                    type="text"
                    name="motorcycle"
                    placeholder={
                      t.motorcyclePlaceholder
                    }
                    className={getInputClassName(
                      false,
                    )}
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                    {t.message}
                  </span>

                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    className={`${getInputClassName(
                      false,
                    )} resize-none`}
                  />
                </label>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex gap-4 border border-red-300/20 bg-red-300/[0.04] p-4 sm:col-span-2"
                  >
                    <AlertCircle
                      size={20}
                      strokeWidth={1.3}
                      className="mt-0.5 shrink-0 text-red-300/80"
                    />

                    <div>
                      <p className="text-sm text-red-200/90">
                        {t.errorTitle}
                      </p>

                      <p className="mt-2 text-xs leading-6 text-white/40">
                        {submitError || t.errorText}
                      </p>
                    </div>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex w-full items-center justify-between bg-white px-6 py-5 text-[0.65rem] uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-white/85 disabled:cursor-wait disabled:opacity-60"
                  >
                    <span>
                      {status === "loading"
                        ? t.submitting
                        : status === "error"
                          ? t.retry
                          : t.submit}
                    </span>

                    {status === "loading" ? (
                      <LoaderCircle
                        size={17}
                        strokeWidth={1.4}
                        className="animate-spin"
                      />
                    ) : (
                      <Send
                        size={16}
                        strokeWidth={1.4}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>

                  <p className="mt-4 text-xs leading-6 text-white/25">
                    {t.privacy}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}