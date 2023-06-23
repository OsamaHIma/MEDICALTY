"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import { MdDarkMode, MdLaptop, MdLightMode } from "react-icons/md";

const ToggleThemeBtn = () => {
  const { setTheme } = useTheme();
  const [showThemeMenu, setThemeMenu] = useState("-top-[400px]");
  // theme Menu toggler button
  const openThemeMenu = () => {
    if (showThemeMenu === "top-16") {
      setThemeMenu("-top-[400px]");
    } else {
      setThemeMenu("top-16");
    }
  };
  return (
    <>
      <button onClick={openThemeMenu}>
        <div className="hidden dark:block">
          <MdDarkMode size={27} className="rotate-90  transition-all hover:text-slate-900 dark:rotate-0  dark:saturate-100 dark:text-slate-400 dark:hover:text-slate-100" />
        </div>
        <div className="block dark:hidden">
          <MdLightMode size={27} className="rotate-0  transition-all hover:text-slate-900 dark:rotate-90  dark:text-slate-400 dark:hover:text-slate-100" />
        </div>
        <span className="sr-only">Toggle theme menu</span>
      </button>

      <ul
        className={`${showThemeMenu} menuTransition flex w-[9rem] absolute right-0 rtl:left-0 z-10 flex-col m-8 shadow-lg select-none`}
      >
        <li
          className="bg-green-500 py-2 pt-4 rounded-t-md px-8 cursor-pointer text-slate-100 hover:text-gray-300"
          onClick={() => setTheme("dark")}
        >
          <MdDarkMode size={25} className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </li>
        <li
          className=" bg-green-500 py-2 px-8 cursor-pointer text-slate-100 hover:text-gray-300"
          onClick={() => setTheme("light")}
        >
          <MdLightMode size={25} className="mr-2 h-4 w-4" />
          <span>Light</span>
        </li>
        <li
          className=" bg-green-500 py-2 pb-4 rounded-b-md px-8 cursor-pointer text-slate-100 hover:text-gray-300"
          onClick={() => setTheme("system")}
        >
          <MdLaptop size={25} className="mr-2 h-4 w-4" />
          <span>System</span>
        </li>
      </ul>
    </>
  );
};
export default ToggleThemeBtn;