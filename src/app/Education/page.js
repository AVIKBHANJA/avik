import React from 'react';
import { GraduationCap, Award, Calendar, School, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      school: "Heritage Institute of Technology",
      location: "Kolkata, West Bengal, India",
      year: "2022-2026",
      gpa: "8.59/10.0",
      achievements: [
        "Joined Google Developers Student Club as a member",
        "Participated in Various Hackathon "
        
      ]
    },
    {
      degree: "High School (Class XII)",
      school: " Uttarpara Amarendra Vidyapith",
      location: "Uttarpara, Hooghly",
      year: "2020-2022",
      gpa: "93%",
      achievements: [
        "Secured 3rd position in my School",
        "Topper in Chemistry with a score of 98%",
        
      ]
    },
    {
      degree: "Class X",
      school: " Uttarpara Amarendra Vidyapith",
      location: "Uttarpara, Hooghly",
      year: "2018-2020",
      gpa: "92.27%",
      achievements: [
        "Secured a position in the top 10 of the school",
        
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education Journey
          </h2>
          <div className="w-20 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic path in pursuit of excellence in Computer Science and Software Engineering
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline line - Desktop: Center, Mobile: Left */}
          <div 
            className="absolute hidden md:block left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500 dark:bg-blue-400"
            style={{ background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6)' }}
          />
          <div 
            className="absolute md:hidden left-6 h-full w-0.5 bg-blue-500 dark:bg-blue-400"
            style={{ background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6)' }}
          />

          {/* Education Cards */}
          {education.map((edu, index) => (
            <div key={index} className="relative mb-12">
              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className={`flex items-center justify-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
                  </div>

                  {/* Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <TimelineCard education={edu} />
                  </div>
                  <div className="w-5/12" />
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex">
                {/* Timeline Dot */}
                <div className="absolute left-6 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
                </div>
                {/* Card */}
                <div className="ml-12 w-full">
                  <TimelineCard education={edu} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ education }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
    {/* Header */}
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {education.degree}
        </h3>
        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium">
          {education.gpa}
        </span>
      </div>
      
      {/* School Info */}
      <div className="space-y-1">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <School className="w-4 h-4 mr-2" />
          <span>{education.school}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{education.location}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{education.year}</span>
        </div>
      </div>
    </div>

  

    {/* Achievements */}
    <div className="space-y-3">
      <div className="flex items-center">
        <Award className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
        <h4 className="font-semibold text-gray-900 dark:text-white">
          Key Achievements
        </h4>
      </div>
      <ul className="space-y-2">
        {education.achievements.map((achievement, i) => (
          <li 
            key={i}
            className="flex items-start text-gray-600 dark:text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2 mr-3" />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Education;