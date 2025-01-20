'use client';

import { useState } from 'react';
import { Code, Database, Layout, Terminal, Palette, Server, Brain, PenToolIcon } from 'lucide-react';
import Image from 'next/image';

import ReactLogo from "../../../public/react.png";
import NodeLogo from "../../../public/node.png";
import FlutterLogo from "../../../public/flutter.webp";
import TailwindLogo from "../../../public/tailwind.png";
import BootstrapLogo from "../../../public/Bootstrap.webp";
import PythonLogo from "../../../public/Python.webp";
import CppLogo from "../../../public/cpp.webp";
import CLogo from "../../../public/c.webp";
import JsLogo from "../../../public/javascript.png";
import TsLogo from "../../../public/Ts.webp";

import MongoLogo from "../../../public/mongo.png";
import MysqlLogo from "../../../public/mysql.webp";
import FirebaseLogo from "../../../public/firebase.png";
import GitLogo from "../../../public/Git.png";
import PostmanLogo from "../../../public/postman.webp";
import LinuxLogo from "../../../public/linux.webp";
import NextLogo from "../../../public/nextjs.webp";
import JavaLogo from "../../../public/java.webp";




const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      icon: Layout,
      title: "Frontend Development",
      skills: [
        { name: "NextJS", icon: NextLogo },
        { name: "React/ React Native", icon: ReactLogo },
        { name: "Node", icon: NodeLogo},
        { name: "Flutter", icon: FlutterLogo },
        { name: "Tailwind", icon: TailwindLogo},
        { name: "Bootstrap", icon: BootstrapLogo }
      ]
    },
    languages: {
      icon: Code,
      title: "Programming Languages",
      skills: [
        { name: "Python", icon: PythonLogo },
        { name: "Java", icon: JavaLogo },
        { name: "C", icon: CLogo },
        { name: "C++", icon:  CppLogo},
        { name: "JavaScript", icon: JsLogo },
        { name: "TypeScript", icon:  TsLogo}
      ]
    },
    database: {
      icon: Database,
      title: "Databases",
      skills: [
        { name: "MongoDB", icon: MongoLogo },
        { name: "MySQL", icon: MysqlLogo },
        { name: "Firebase", icon: FirebaseLogo }
      ]
    },
    tools: {
      icon: Terminal,
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: GitLogo },
        { name: "Postman", icon: PostmanLogo },
        { name: "Linux", icon: LinuxLogo }
      ]
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My Skills
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical expertise and proficiency in various technologies
          </p>
        </div>

        {/* Skills Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, { icon: Icon, title }]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:shadow-md'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{title}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skillCategories[activeCategory].skills.map((skill) => (
            <div
              key={skill.name}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.name}
              </span>
            </div>
          ))}
</div>
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Code, label: "Languages", value: "7+" },
            { icon: Layout, label: "Frameworks", value: "5+" },
            { icon: Database, label: "Databases", value: "4+" },
            { icon: PenToolIcon, label: "Dev Tools", value: "10+" }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
              <Icon className="w-8 h-8 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</h4>
              <p className="text-gray-600 dark:text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;