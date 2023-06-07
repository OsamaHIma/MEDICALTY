"use client"
import { useTranslation } from "next-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation("common", { useSuspense: false, client: true });

  function handleLanguageSwitch() {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
  }

  return (
    <button onClick={handleLanguageSwitch}>
      {i18n.language === "en" ? t("switchToArabic") : t("switchToEnglish")}
    </button>
  );
};

export default LanguageSwitcher;