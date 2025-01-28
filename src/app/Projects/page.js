"use client";
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, ChevronRight } from 'lucide-react';
import Img1 from "../../../public/socialPostGen.png";
import Img2 from "../../../public/tictactoe.png";
import Img3 from "../../../public/investmentcalculator.png";
import Img4 from "../../../public/avik-sblog.png";

import Image from 'next/image';
const Projects = () => {
  const projects = [
    {
      title: "Social Post Generator",
      description: "AI-powered tool that generates social media posts, captions, and hashtags for content creators and marketers.",
      technologies: ["NextJS", "openai/gpt-4o-mini", "Tailwind CSS" ],
      image: Img1,
      github: "https://github.com/AVIKBHANJA/socialPostGenerator",
      demo: "https://social-post-generator-coral.vercel.app/",
      category: "Full Stack"
    },
    {
      title: "Avik's Blog",
      description: "A personal blog built with ReactJS and Tailwind CSS with crud operations and authentication.",
      technologies: ["ReactJS", "Tailwind CSS", "Firebase", "React-Quill", "MongoDB", "ExpressJS" , "NodeJS" ],
      image: Img4,
      github: "https://github.com/AVIKBHANJA/Avik-sBlog",
      demo: "https://avik-sblog.onrender.com/",
      category: "Full Stack"
    },
    {
      title: "React Tic Tac Toe",
      description: "A simple tic-tac-toe game built with ReactJS.",
      technologies: ["ReactJS", "CSS" ],
      image: Img2,
      github: "https://github.com/AVIKBHANJA/React_tic_tac_toe",
      demo: "https://react-tic-tac-toe-mu-orcin.vercel.app/",
      category: "Frontend"
    },
    {
      title: "Investment Calculator",
      description: "A simple investment calculator built with ReactJS.",
      technologies: ["ReactJS", "CSS" ],
      image: Img3,
      github: "https://github.com/AVIKBHANJA/investmentCalculator",
      demo: "https://investment-calculator-ten-inky.vercel.app/",
      category: "Frontend"
    },
  ];

  return (
    <section className="py-24 px-4 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Animated background dots */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing my journey through code - from concept to creation
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Decorative gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
                <div className="h-full w-full bg-white dark:bg-gray-800 rounded-2xl" />
              </div>

              <div className="relative">
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;