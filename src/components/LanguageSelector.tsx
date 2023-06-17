"use client";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface LanguageSelectorProps {
  languages?: { code: string; name: string }[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const LanguageSelector = ({
  languages = [
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh-CN", name: "Chinese Simplified" },
    { code: "zh-TW", name: "Chinese Traditional" },
  ],
  className = "",
  style = {},
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage, handleLanguageChange } = useLanguage();

  let name;
  const matchedLanguage = languages.find((l) => l.code === selectedLanguage);
  if (matchedLanguage) {
    name = matchedLanguage.name;
  } else {
    name = "Unknown";
  }
  return (
    <div className={`relative inline-block ml-4 ${className}`} style={style}>
      <button
        className="bg-gray-200 dark:bg-slate-800 rounded-full p-2 px-3 flex items-center gap-3"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="mr-2">{name}</span>
        <FaChevronDown />
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 py-2 w-48 bg-blue-100 dark:bg-slate-700 rounded-md shadow-xl">
          {languages.map((language) => (
            <button
              type="button"
              key={language.code}
              className={`block w-full text-left transition-all px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 ${
                selectedLanguage === language.code ? "!text-green-600" : ""
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
