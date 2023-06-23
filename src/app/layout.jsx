import Providers from "@/components/Providers";
import { Cairo } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "MEDICALTY",
  description:
    "MEDICALTY is a  software program  that aims to move away from using paper-based patient files and convert them into electronic files that are easily stored and printable. The  project manager  can monitor and track doctors, their records, information, and describe the project staff",
  openGraph: {
    images: "./opengraph-image.png",
  },
  link: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  meta: [
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
};
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${cairo.className} bg-[#e1f5e8] transition-all dark:bg-slate-900 dark:text-slate-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
