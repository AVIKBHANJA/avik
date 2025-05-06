"use client";

import { Github, Mail, Linkedin } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import ProfileImg from "../../public/profile.png";
import { MotionDiv, MotionH1, MotionP, MotionA } from "@/utils/motion";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const texts = [
    "Frontend Web Developer",
    "Full Stack Web Developer",
    "React Native Developer",
  ];

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(currentText.slice(0, typingText.length + 1));
        if (typingText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setTypingText(currentText.slice(0, typingText.length - 1));
        if (typingText.length === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typingText, textIndex, isDeleting, isClient]);

  // Basic layout without animations for SSR
  if (!isClient) {
    return (
      <section className="min-h-screen mb-10 relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
        {/* Background dots - works for both light and dark mode */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(100, 116, 139) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="w-48 h-48 mx-auto mb-12">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 p-1 bg-white dark:bg-gray-800">
              <Image
                src={ProfileImg}
                priority
                alt="Avik Bhanja | Full-Stack & Frontend Web Developer in Kolkata"
                width={192}
                height={192}
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
            Avik Bhanja
          </h1>
          <div className="h-8 mb-8">
            <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Frontend Web Developer
              <span className="animate-pulse">|</span>
            </span>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12 text-lg">
            Computer Science student passionate about creating innovative web &
            mobile solutions.
          </p>
          <div className="flex justify-center space-x-6">
            {/* Social icons */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Animated background dots - Fixed for light and dark themes */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(100, 116, 139) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 text-center relative z-10"
      >
        {/* Profile Image */}
        <Suspense fallback={<div className="w-48 h-48 mx-auto mb-12"></div>}>
          <MotionDiv
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-48 h-48 mx-auto mb-12 "
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 p-1 bg-white dark:bg-gray-800">
              <Image
                src={ProfileImg}
                priority
                alt="Avik Bhanja | Full-Stack & Frontend Web Developer in Kolkata"
                width={192}
                height={192}
                className="rounded-full"
              />
            </div>
            <MotionDiv
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -inset-2 rounded-full border-2 border-blue-500/30 dark:border-blue-400/30"
            />
          </MotionDiv>
        </Suspense>

        {/* Name and Role */}
        <Suspense
          fallback={
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Avik Bhanja
            </h1>
          }
        >
          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400"
          >
            Avik Bhanja
          </MotionH1>
        </Suspense>

        <Suspense fallback={<div className="h-8 mb-8"></div>}>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="h-8 mb-8"
          >
            <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              {typingText}
              <span className="animate-pulse">|</span>
            </span>
          </MotionDiv>
        </Suspense>

        {/* Description */}
        <Suspense
          fallback={
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12 text-lg"></p>
          }
        >
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12 text-lg"
          >
            Computer Science student passionate about creating innovative web &
            mobile solutions.
          </MotionP>
        </Suspense>

        {/* Social Links */}
        <Suspense
          fallback={<div className="flex justify-center space-x-6"></div>}
        >
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-6"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/AVIKBHANJA",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/avikbhanja/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:avikbhanja2@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <MotionA
                key={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={24} />
              </MotionA>
            ))}
          </MotionDiv>
        </Suspense>
      </MotionDiv>
    </section>
  );
};

export default Hero;
