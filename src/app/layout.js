import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import FooterNavigation from "@/components/FooterNavigation";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Avik Bhanja | Full Stack & Frontend Web Developer | Portfolio",
  description:
    "Avik Bhanja is a skilled Full Stack and Frontend Web Developer specializing in Next.js, React, and modern web technologies. Explore my portfolio for projects, skills, and contact details.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <FooterNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
