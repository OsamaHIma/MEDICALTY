import LanguageSwitcher from "@/components/LanguageSwitcher ";
import Image from "next/image";

const Layout = async ({ children }) => {
  return (
    <div className=" max-w-[1400px] mx-auto min-h-[100vh] ">
      <div className="flex   min-h-[100vh] ">
        <div className="w-full pt-4 mt-12">
          <main className="w-full h-auto  flex flex-col justify-center items-center">
            <div className="flex gap-4 px-8 relative left-0 self-start ">
              {/* Logo Here when provided */}
              <Image
                src="/assets/MEDICALTY.svg"
                alt="MEDICALTY-logo"
                height={250}
                width={250}
              />
              {/* <LanguageSwitcher /> */}
            </div>
            {children}
          </main>
        </div>
        <div className="hidden lg:flex min-h-[100vh]  relative   justify-end items-end  w-full  bg-green-400 ">
          {/* Image here when provided */}
          <Image
            src="/assets/worker-preview-app-1.png"
            alt="worker-preview"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute left-0 top-0 h-full w-full"
          />
          <Image
            src="/assets/worker-preview-app.png"
            alt="worker-preview"
            width="0"
            height="0"
            sizes="100vw"
            className="w-[90%] h-[70%] z-20  "
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
