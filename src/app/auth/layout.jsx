import Image from "next/image";
import ToggleThemeBtn from "@/components/ToggleThemeBtn";
// import LanguageSelector from "@/components/LanguageSelector";
import { LanguageSelector } from "translate-easy";

const Layout = ({ children }) => {
  return (
    <div className={` mx-auto min-h-[100vh] max-w-[1400px]`}>
      <div className="flex   min-h-[100vh] ">
        <div className="mt-12 w-full pt-4">
          <main className="flex h-auto  w-full flex-col items-center justify-center">
            <div className="relative left-0 flex w-full items-center justify-between gap-4 self-start px-8">
              <Image
                src="/assets/MEDICALTY.png"
                alt="MEDICALTY-logo"
                height={250}
                width={250}
              />
              <ToggleThemeBtn />
              <LanguageSelector />
            </div>
            <div className="gradient absolute left-[100px] -z-[1] h-96 w-[80%] bg-gradient-to-r from-green-500/30 to-blue-600/25 blur-[100px]" />
            {children}
          </main>
        </div>
        <div className="relative hidden min-h-[100vh]  w-full   items-end justify-end  bg-green-400  lg:flex ">
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
            className="absolute top-[13%] z-20 w-[50%]"
          />
          <Image
            src="/assets/hospital.svg"
            alt="medicality-preview"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute top-[23%] z-20 w-[90%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
