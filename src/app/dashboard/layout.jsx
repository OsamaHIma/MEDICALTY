"use client";
import Navbar from "@/sections/Navbar";
import CustomSidebar from "@/sections/sidebar";
import { useLanguage } from "@/context/LanguageContext";

const layout = ({ children }) => {
  const { selectedLanguage } = useLanguage();

  return (
    <main
      className="flex max-w-full"
      dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
    >
      <CustomSidebar />
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default layout;
