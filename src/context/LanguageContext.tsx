import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

interface LanguageContextValue {
  selectedLanguage: string;
  handleLanguageChange: (language: string) => void;
  isRtl: boolean;
  setIsRtl: React.Dispatch<React.SetStateAction<boolean>>;
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const userLanguage = typeof navigator !== 'undefined' && navigator.language;
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('selectedLanguage')) ||
      userLanguage ||
      ''
  );
  const [isRtl, setIsRtl] = useState<boolean>(
    typeof window !== 'undefined' &&
      window.localStorage.getItem('isRtl') === 'true'
      ? true
      : false
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    typeof window !== 'undefined' &&
      window.localStorage.setItem('selectedLanguage', language);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedLanguage) {
      window.localStorage.setItem('selectedLanguage', selectedLanguage);
    }
    if (typeof window !== 'undefined' && isRtl) {
      window.localStorage.setItem('isRtl', isRtl.toString());
    }
  }, [selectedLanguage, isRtl]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'auto';
  }, [isRtl]);

  const value = useMemo(() => {
    return {
      selectedLanguage,
      handleLanguageChange,
      isRtl,
      setIsRtl,
    };
  }, [selectedLanguage, handleLanguageChange, isRtl]);

  return (
    <LanguageContext.Provider value={value}>
     {children}
    </LanguageContext.Provider>
  );
};