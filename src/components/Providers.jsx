"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { ProSidebarProvider } from "react-pro-sidebar";
import { PhotoProvider } from "@/context/PhotoContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastContainer closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <ProSidebarProvider>
        <SessionProvider>
          <LanguageProvider>
            <PhotoProvider>{children}</PhotoProvider>
          </LanguageProvider>
        </SessionProvider>
      </ProSidebarProvider>
    </ThemeProvider>
  );
};
export default Providers;
