"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { ProSidebarProvider } from "react-pro-sidebar";
import { PhotoProvider } from "@/context/PhotoContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CountriesProvider } from "@/context/CountriesContext";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastContainer closeOnClick pauseOnFocusLoss draggable pauseOnHover limit={1} toastClassName="dark:bg-slate-800 dark:text-green-100"  />
      <ProSidebarProvider>
        <SessionProvider>
          <LanguageProvider>
            <CountriesProvider>
              <PhotoProvider>{children}</PhotoProvider>
            </CountriesProvider>
          </LanguageProvider>
        </SessionProvider>
      </ProSidebarProvider>
    </ThemeProvider>
  );
};
export default Providers;
