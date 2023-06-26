"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TranslateProps {
  children: string;
  defaultLanguage?: string;
  translations?: { [key: string]: string };
}

const Translate = ({
  children,
  translations = {},
  defaultLanguage = "en",
}: TranslateProps) => {
  const { selectedLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translateText = async () => {
      const storageKey = `translatedText_${selectedLanguage}_${children}`;
      const storedText = localStorage.getItem(storageKey);

      if (storedText) {
        setTranslatedText(storedText);
        return;
      }

      if (selectedLanguage === defaultLanguage) {
        setTranslatedText(children);
        return;
      }

      if (translations[selectedLanguage]) {
        setTranslatedText(translations[selectedLanguage]);
        return;
      }

      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage}&dt=t&q=${children}`
        );
        const json = await response.json();
        const translatedText = json[0][0][0];
        setTranslatedText(translatedText);
        localStorage.setItem(storageKey, translatedText);
      } catch (error) {
        console.error(error);
      }
    };

    translateText();
  }, [children, selectedLanguage, defaultLanguage, translations]);

  return <>{translatedText.toString() || children}</>;
};

export default Translate;
