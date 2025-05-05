"use client";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { MotionButton, MotionDiv, AnimatePresence } from "@/utils/motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { name: "BlogPost", href: "https://avikbhanja.hashnode.dev/" },
    { name: "Testimonials", href: "/Testimonials" },
    { name: "Freelance", href: "/Hireme" },
  ];

  // Simple button when not client-side
  const ThemeToggleButton = () => {
    if (!isClient) {
      return (
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      );
    }

    return (
      <Suspense
        fallback={
          <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        }
      >
        <MotionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </MotionButton>
      </Suspense>
    );
  };

  // Mobile menu without animations for SSR
  const MobileMenu = () => {
    if (!isClient || !isOpen) return null;

    return (
      <Suspense
        fallback={
          <div className="md:hidden bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name === "BlogPost" ? "_blank" : ""}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </a>
            </div>
          </div>
        }
      >
        <AnimatePresence>
          {isOpen && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 transition-colors duration-300"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.name === "BlogPost" ? "_blank" : ""}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </a>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </Suspense>
    );
  };

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4 group">
              {/* Text Label */}
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent group-hover:opacity-90">
                Avik's Portfolio
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.name === "BlogPost" ? "_blank" : ""}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <ThemeToggleButton />
            <a
              href="/resume.pdf"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Resume
            </a>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggleButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu />
    </nav>
  );
};

export default Navbar;
