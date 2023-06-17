"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TranslateProps {
  children: string;
  defaultLanguage?: string;
  customTranslation?: string;
}

const Translate = ({
  children,
  customTranslation,
}: TranslateProps) => {
  const { selectedLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("translated");

  useEffect(() => {
    if (customTranslation) {
      setTranslatedText(customTranslation);
      return;
    }

    const translateText = async () => {
      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage}&dt=t&q=${children}`
        );
        const json = await response.json();
        const translatedText = json[0][0][0];
        setTranslatedText(translatedText);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Error translating text.");
      }
    };

    translateText();
  }, [children, selectedLanguage, customTranslation]);

  return (
    <>
      {mode === "translated" ? translatedText : children}
      {error ? <div>Error: {error}</div> : null}
    </>
  );
};

export default Translate;
