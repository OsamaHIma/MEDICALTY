import { createContext, useContext, useState, useEffect } from "react";

const CountriesContext = createContext();

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
};

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);
  const [isCountriesLoading, setIsCountriesLoading] = useState(false);
  useEffect(() => {
    setIsCountriesLoading(true);
    const storedCountries =
      typeof window !== "undefined" && window.localStorage.getItem("countries");
    if (storedCountries) {
      setCountries(JSON.parse(storedCountries));
      setIsCountriesLoading(false);
    } else {
      const fetchCountries = async () => {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          const data = await response.json();
          const countryOptions = data.map((country) => ({
            value: country.cca3,
            label: country.name.common,
          }));
          typeof window !== "undefined" &&
            window.localStorage.setItem(
              "countries",
              JSON.stringify(countryOptions)
            );
          setCountries(countryOptions);
          setIsCountriesLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCountries();
    }
  }, []);

  const value = {
    countries,
    isCountriesLoading,
  };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
};
