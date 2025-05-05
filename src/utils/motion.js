"use client";

// Import only the specific features we need from framer-motion
// This pattern allows for better tree-shaking
import {
  motion,
  AnimatePresence,
  useScroll,
  useInView,
  useAnimation,
} from "framer-motion";

// Pre-configured motion components with commonly used animations
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionA = motion.a;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionP = motion.p;

// Common animations - reused across components to reduce duplication
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const scale = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

// Export hooks directly
export { AnimatePresence, useScroll, useInView, useAnimation };

// Lightweight animation variants
export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

// Additional performance optimization - only animations commonly used
export const createHoverTapAnimation = (
  hoverScale = 1.05,
  tapScale = 0.95
) => ({
  whileHover: { scale: hoverScale },
  whileTap: { scale: tapScale },
});
