import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import FooterNavigation from '@/components/FooterNavigation';
import Navbar from '@/components/Navbar';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Professional Portfolio',
  description: 'Avik Bhanja , a Full-stack developer portfolio showcasing projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <SpeedInsights />
          {children}
          <FooterNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}