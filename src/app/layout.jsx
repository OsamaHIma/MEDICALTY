import Providers from "@/components/Providers";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "MEDICALTY",
  description:
    "MEDICALTY is a  software program  that aims to move away from using paper-based patient files and convert them into electronic files that are easily stored and printable. The  project manager  can monitor and track doctors, their records, information, and describe the project staff",
  openGraph: {
    images: "./opengraph-image.png",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} dark:bg-slate-900 dark:text-slate-100 transition-all`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
