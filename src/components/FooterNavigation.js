"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionDiv } from "@/utils/motion";
import {
  Home,
  Settings,
  Folder,
  Trophy,
  MessageSquare,
  GraduationCap,
} from "lucide-react";

const FooterNavigation = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/Education", icon: GraduationCap, label: "Education" },
    { path: "/Skills", icon: Settings, label: "Skills" },
    { path: "/Projects", icon: Folder, label: "Projects" },
    { path: "/Achievements", icon: Trophy, label: "Achievements" },
    { path: "/Contact", icon: MessageSquare, label: "Contact" },
  ];

  // Skip interactive effects during SSR or initial render
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Calculate which icon is being hovered
        const itemWidth = rect.width / navItems.length;
        const itemIndex = Math.floor(x / itemWidth);
        const itemCenterX = itemIndex * itemWidth + itemWidth / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - itemCenterX, 2) + Math.pow(y - rect.height / 2, 2)
        );

        // Only show hover effect if cursor is within 30px radius of icon center
        if (
          distanceFromCenter < 30 &&
          itemIndex >= 0 &&
          itemIndex < navItems.length
        ) {
          setHoveredIndex(itemIndex);
        } else {
          setHoveredIndex(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setHoveredIndex(null);
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("mousemove", handleMouseMove);
      navElement.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        navElement.removeEventListener("mousemove", handleMouseMove);
        navElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [navItems.length, isClient]);

  const getScale = (index) => {
    if (!isClient || !navRef.current || !mousePosition.x) return 1;

    const rect = navRef.current.getBoundingClientRect();
    const itemWidth = rect.width / navItems.length;
    const itemCenterX = index * itemWidth + itemWidth / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(mousePosition.x - itemCenterX, 2) +
        Math.pow(mousePosition.y - rect.height / 2, 2)
    );

    // Create a more dramatic jelly effect when the cursor is close
    if (distanceFromCenter < 30) {
      return 1.4; // Maximum scale when directly over icon
    } else if (distanceFromCenter < 60) {
      return 1 + 0.4 * (1 - (distanceFromCenter - 30) / 30); // Gradual scale decrease
    }
    return 1; // No scale when cursor is far
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <MotionDiv
        ref={navRef}
        className="bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 rounded-full shadow-lg border border-gray-300 dark:border-gray-800"
      >
        <ul className="flex items-center justify-between">
          {navItems.map((item, index) => {
            const isActive = activeItem === item.path;
            // Only apply scale effect on the client-side
            const scale = isClient ? getScale(index) : 1;
            const isHovered = hoveredIndex === index;

            return (
              <li key={item.path} className="relative">
                {isClient && (
                  <MotionDiv
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 
                      transition-all duration-200 pointer-events-none
                      ${
                        isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                  >
                    <span
                      className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 
                      px-2 py-1 rounded-md text-sm whitespace-nowrap shadow-lg"
                    >
                      {item.label}
                    </span>
                  </MotionDiv>
                )}
                <Link
                  href={item.path}
                  className={`relative flex items-center justify-center p-2
                    ${
                      isActive
                        ? "text-sky-500 dark:text-sky-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                  onClick={() => setActiveItem(item.path)}
                  aria-current={isActive ? "page" : undefined}
                  style={
                    isClient
                      ? {
                          transform: `scale(${isActive ? scale * 1.1 : scale})`,
                          transition:
                            "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }
                      : {}
                  }
                >
                  <item.icon className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </li>
            );
          })}
        </ul>
      </MotionDiv>
    </div>
  );
};

export default FooterNavigation;
