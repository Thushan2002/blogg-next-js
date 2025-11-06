import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Blog App",
  description: "Blog App using Next Js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        <div className="p-5 md:px-12 lg:px-24">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
