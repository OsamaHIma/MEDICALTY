"use client";
import Navbar from "@/sections/Navbar";
import CustomSidebar from "@/sections/sidebar";
import { Poppins, Cairo } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const layout = ({ children }) => {
  const { selectedLanguage } = useLanguage();

  return (
    <main
      className={`${
        selectedLanguage === "ar" ? cairo.className : poppins.className
      } flex max-w-full`}
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
