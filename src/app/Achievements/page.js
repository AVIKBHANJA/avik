import React from "react";
import { Award, BookOpen, Code, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import PostmanLogo from "../../../public/postman.webp";
import GoogleLogo from "../../../public/google.webp";
import BSVBLogo from "../../../public/BSVB.webp";
import UdemyLogo from "../../../public/udemy.webp";
const Achievements = () => {
  const certifications = [
    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      logo: PostmanLogo,
      issueDate: "Apr 2023",
      credentialUrl:
        "https://badgr.com/public/assertions/OlT__c2YTLSaPrMx5Hn7XQ?identity__email=avik.bhanja.it26@heritageit.edu.in",
      skills: [
        "REST APIs",
        "API Development",
        "Postman API",
        "HTTP Methods",
        "Response Codes",
      ],
    },
    {
      title: "Google Cloud Digital Leader Training",
      issuer: "Coursera",
      logo: GoogleLogo,
      issueDate: "Nov 2023",
      credentialUrl:
        "https://www.coursera.org/account/accomplishments/professional-cert/BBZ3U4PQLGRS",
      skills: [
        "Google Cloud Platform",
        "Cloud Computing",
        "Cloud Services",
        "Cloud Deployment",
      ],
    },
    {
      title: "Bitcoin Basics : Protocol and Design Course Cerificate",
      issuer: "BSV Blockchain Academy",
      logo: BSVBLogo,
      issueDate: "May 2023",
      credentialUrl:
        "https://academy.bsvblockchain.org/student/certificate/4894691a4bdf24b86f75d61c81842d4c",
      skills: [
        "Bitcoin",
        "Blockchain",
        "Cryptocurrency",
        "Bitcoin Protocol",
        "Bitcoin Design",
      ],
    },
    {
      title: "Master Course in Cyber Security & Cyber Security Awareness",
      issuer: "Udemy",
      logo: UdemyLogo,
      issueDate: "July 2023",
      credentialUrl:
        "https://www.udemy.com/certificate/UC-e3da2d2a-a9cc-4045-978b-589d9692aef5/",
      skills: [
        "Cyber Security",
        "Network Security",
        "Web Security",
        "Security Awareness",
        "Security Protocols",
      ],
    },
    {
      title: "Python Programming for Beginners | Full Course in Hindi",
      issuer: "Udemy",
      logo: UdemyLogo,
      issueDate: "Aug 2023",
      credentialUrl:
        "https://www.udemy.com/certificate/UC-e528ed74-26ff-410d-995c-53f95726ff7a/",
      skills: [
        "Python",
        "Programming",
        "Data Structures",
        "Algorithms",
        "Python Libraries",
      ],
    },
  ];

  const achievements = [
    {
      title: "Most Commendable Performance - Student Paper Competition",
      year: "2023",
      description:
        "Awarded for excellent performance in robotics research by IEEE Robotics Club, HITK.",
    },
    {
      title: "Solved 100+ DSA Problems",
      year: "2025",
      description:
        "Solved 100+ DSA problems on various coding platforms, sharpening problem-solving and algorithmic skills.",
    },
  ];

  const codingProfiles = [
    {
      platform: "LeetCode",
      link: "https://leetcode.com/u/avikbhanja3/",
      insights:
        " Accomplished solving 50+ easy and 8+ medium problems, showcasing a strong foundation in problem-solving and algorithm.",
    },
    {
      platform: "HackerRank",
      link: "https://www.hackerrank.com/profile/avikbhanja3",
      insights: "Earned 2 stars in Java and C, and 3 stars in Python, demonstrating proficiency across multiple programming languages.",
    },
    {
      platform:"GeeksforGeeks",
      link:"https://www.geeksforgeeks.org/user/avikbhey03/",
      insights:"Solved 10+ basic, 25+ easy, and 50+ medium problems, including topics like KMP Algorithm, Fractional Knapsack, and Gold Mine Problem, demonstrating expertise in DSA and problem-solving."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements & Certifications
          </h2>
          <div className="w-20 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my accomplishments, certifications, and contributions
            in technology
          </p>
        </div>

        {/* Certifications Timeline */}
        <div className="relative mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Certifications
          </h3>

          {/* Timeline line */}
          <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className="absolute md:hidden left-6 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

          {certifications.map((cert, index) => (
            <div key={index} className="relative mb-12">
              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div
                  className={`flex items-center justify-center ${
                    index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
                  </div>

                  {/* Card */}
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}
                  >
                    <CertificationCard certification={cert} />
                  </div>
                  <div className="w-5/12" />
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex">
                <div className="absolute left-6 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
                </div>
                <div className="ml-12 w-full">
                  <CertificationCard certification={cert} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Timeline */}
        <div className="relative mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Achievements
          </h3>

          {/* Timeline line */}
          <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className="absolute md:hidden left-6 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

          {achievements.map((achievement, index) => (
            <div key={index} className="relative mb-12">
              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div
                  className={`flex items-center justify-center ${
                    index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
                  </div>

                  {/* Card */}
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}
                  >
                    <AchievementCard achievement={achievement} />
                  </div>
                  <div className="w-5/12" />
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex">
                <div className="absolute left-6 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800" />
                </div>
                <div className="ml-12 w-full">
                  <AchievementCard achievement={achievement} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coding Profiles */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <div className="flex items-center justify-center">
            Coding Profiles 
            <a
              href="https://codolio.com/profile/avikbhanja/card"
              className="text-blue-500 hover:text-blue-600 transition-colors "
            >
              <ExternalLink className="w-5 h-5" />
            </a>
           
            </div>
            
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {codingProfiles.map((profile, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {profile.platform}
                  </h4>
                  <a
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.insights}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Creation */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Content Creation
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              As a part-time content creator, I share my knowledge and
              experiences in technology, web development, and programming on
              platforms like YouTube and Instagram, engaging with an
              enthusiastic community of learners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CertificationCard = ({ certification }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
    <div className="flex items-start gap-4">
      <Image
        src={certification.logo}
        alt={`${certification.issuer} logo`}
        width={48}
        height={48}
        className="rounded-full object-cover"
        unoptimized // For external URLs
      />

      <div className="flex-1">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {certification.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {certification.issuer}
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          Issued {certification.issueDate}
        </p>

        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 mb-4"
        >
          Show credential <ExternalLink className="w-4 h-4" />
        </a>

        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {certification.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AchievementCard = ({ achievement }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-3">
      <Award className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
        {achievement.title}
      </h4>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mb-3">
      {achievement.description}
    </p>
    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
      <Calendar className="w-4 h-4 mr-2" />
      {achievement.year}
    </div>
  </div>
);

export default Achievements;
