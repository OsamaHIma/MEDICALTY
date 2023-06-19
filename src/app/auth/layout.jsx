"use client";
import Image from "next/image";
import ToggleThemeBtn from "@/components/ToggleThemeBtn";
import LanguageSelector from "@/components/LanguageSelector";
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

const Layout = ({ children }) => {
  const { selectedLanguage } = useLanguage();

  return (
    <div
      className={`${
        selectedLanguage === "ar" ? cairo.className : poppins.className
      } max-w-[1400px] mx-auto min-h-[100vh]`}
      dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex   min-h-[100vh] ">
        <div className="w-full pt-4 mt-12">
          <main className="w-full h-auto  flex flex-col justify-center items-center">
            <div className="flex justify-between items-center gap-4 px-8 relative left-0 self-start w-full">
              {/* Logo Here when provided */}
              <Image
                src="/assets/MEDICALTY.png"
                alt="MEDICALTY-logo"
                height={250}
                width={250}
              />
              <ToggleThemeBtn />
              <LanguageSelector />
            </div>
            <div className="gradient absolute w-[80%] h-96 bg-gradient-to-r from-green-500/30 to-blue-600/25 blur-[100px] left-[100px] -z-[1]" />
            {children}
          </main>
        </div>
        <div className="hidden lg:flex min-h-[100vh]  relative   justify-end items-end  w-full  bg-green-400 ">
          {/* Image here when provided */}
          <Image
            src="/assets/worker-preview-app-1.png"
            alt="medicality-preview"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute left-0 top-0 h-full w-full"
          />
          <Image
            src="/assets/doctor.svg"
            alt="medicality-preview"
            width="0"
            height="0"
            sizes="100vw"
            className="w-[50%] z-20 absolute top-[13%]"
          />
          <Image
            src="/assets/hospital.svg"
            alt="medicality-preview"
            width="0"
            height="0"
            sizes="100vw"
            className="w-[90%] z-20 absolute top-[23%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
