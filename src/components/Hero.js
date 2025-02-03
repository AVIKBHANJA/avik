"use client";

import { Github, Mail, ChevronDown, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileImg from "../../public/profile.png";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Frontend Web Developer",
    "Full Stack Web Developer",
    "React Native Developer",
  ];

  useEffect(() => {
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
  }, [typingText, textIndex, isDeleting]);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    
    <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800" />
      </div>

      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
            style={{
              width: `${(i + 1) * 300}px`,
              height: `${(i + 1) * 300}px`,
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 text-center relative z-10"
      >
        {/* Profile Image */}
        <motion.div
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
          <motion.div
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
        </motion.div>

        {/* Name and Role */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400"
        >
          Avik Bhanja
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="h-8 mb-8"
        >
          <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {typingText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12 text-lg"
        >
          Computer Science student passionate about creating innovative web & mobile
          solutions. 
        </motion.p>

        {/* Social Links */}
        <motion.div
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
            { icon: Linkedin, href: "https://www.linkedin.com/in/avikbhanja/", label: "LinkedIn" },
            {
              icon: Mail,
              href: "mailto:avikbhanja2@gmail.com",
              label: "Email",
            },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
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
            </motion.a>
          ))}
         
        </motion.div>
        
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          delay: 1.5,
          duration: 1.5,
          repeat: Infinity,
        }}
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.button>
      
    </section>
  );
};

export default Hero;
