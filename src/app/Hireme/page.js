"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Globe, Laptop, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Hireme = () => {
  const { theme } = useTheme();
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if all required fields are filled
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.projectType ||
        !formData.description
      ) {
        setSubmitStatus("error");
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
        setIsSubmitting(false);
        return;
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || "Not provided",
        project_type: formData.projectType,
        description: formData.description,
      };

      await emailjs.send(
        "service_vm9juqp",
        "template_fgk0fkn",
        templateParams,
        "jwtr0tVSltzXln76t"
      );

      setSubmitStatus("success");
      // Clear form after successful submission
      setFormData(initialFormState);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Email error:", error);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Animated background dots */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Hire Me
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let me help you create something
            amazing with my development services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Service Cards */}
          <div className="space-y-6">
            {/* Web Development Card */}
            <div className="block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                  Web Development
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Full-stack solutions from concept to deployment. Custom
                websites, web applications, and CMS development.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />{" "}
                  Responsive design
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> API
                  integration
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />{" "}
                  Database development
                </li>
              </ul>
            </div>

            {/* Frontend Development Card */}
            <div className="block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Laptop className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                  Frontend Development
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Creating beautiful, interactive user interfaces with modern
                frameworks and best practices.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />{" "}
                  React/Next.js expertise
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />{" "}
                  Tailwind CSS/SCSS
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />{" "}
                  Animations & interactions
                </li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Request a Free Consultation
            </h2>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Company Input */}
              <div>
                <label
                  htmlFor="company"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label
                htmlFor="projectType"
                className="block mb-2 text-gray-700 dark:text-gray-300"
              >
                Service Type
              </label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                required
              >
                <option value="">Select a service</option>
                <option value="web-development">Web Development</option>
                <option value="frontend-development">
                  Frontend Development
                </option>
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-gray-700 dark:text-gray-300"
              >
                Project Description
              </label>
              <textarea
                id="description"
                placeholder="Tell me about your project requirements , timeline , budget etc."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none resize-none text-gray-900 dark:text-white"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              }`}
            >
              <Send
                className={`w-5 h-5 ${
                  isSubmitting ? "animate-spin" : "animate-none"
                }`}
              />
              <span>{isSubmitting ? "Sending..." : "Submit Request"}</span>
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-green-600 dark:text-green-400">
                  Thank you! Your project request has been sent. I'll get back
                  to you shortly.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <p className="text-red-600 dark:text-red-400">
                  Oops! Something went wrong. Please try again later or contact
                  me directly.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hireme;
