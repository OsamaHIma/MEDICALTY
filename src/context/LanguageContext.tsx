import React from "react";
import { createContext, useContext, useMemo, useState, useEffect } from "react";

interface LanguageContextValue {
  selectedLanguage: string;
  handleLanguageChange: (language: string) => void;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const userLanguage = typeof navigator !== "undefined" && navigator.language;
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("selectedLanguage")) ||
      userLanguage ||
      ""
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    typeof window !== "undefined" &&
      window.localStorage.setItem("selectedLanguage", language);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && selectedLanguage) {
      window.localStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  const value = useMemo(() => {
    return {
      selectedLanguage,
      handleLanguageChange,
    };
  }, [selectedLanguage, handleLanguageChange]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
