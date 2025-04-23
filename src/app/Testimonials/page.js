"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useTheme } from "../../context/ThemeContext";

export default function Testimonials() {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch approved testimonials on component mount
  useEffect(() => {
    fetchTestimonials();

    // Set up real-time subscription to testimonials table
    const channel = supabase
      .channel("testimonials-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "testimonials",
        },
        (payload) => {
          console.log("Change received:", payload);
          // Refresh testimonials when any change happens
          fetchTestimonials();
        }
      )
      .subscribe();

    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchTestimonials() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
        return;
      }

      console.log("Fetched testimonials:", data);
      setAllTestimonials(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Insert the testimonial into Supabase
      const { error } = await supabase
        .from("testimonials")
        .insert([{ name, designation, testimonial, company, approved: false }]);

      if (error) throw error;

      // Clear the form
      setName("");
      setDesignation("");
      setTestimonial("");
      setCompany("");
      setMessage(
        "Thank you for your testimonial! It will be reviewed and published soon."
      );

      // Optionally, send a notification about the new testimonial
      try {
        await fetch("/api/send-testimonial-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, designation, testimonial }),
        });
      } catch (notifyError) {
        console.error("Failed to send notification:", notifyError);
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setMessage("Error submitting testimonial. Please try again later.");
    } finally {
      setLoading(false);
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

      <div className="container mx-auto relative z-10">
        <h1 className="text-5xl font-bold text-center py-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Testimonials
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="testimonials-display">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              What People Say
            </h2>
            <div className="space-y-6">
              {isLoading ? (
                <div className="p-6 rounded-lg shadow-md text-center bg-white dark:bg-gray-800 transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Loading testimonials...
                  </p>
                </div>
              ) : allTestimonials.length > 0 ? (
                allTestimonials.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300"
                  >
                    <p className="italic text-lg mb-4 text-gray-700 dark:text-gray-300">
                      "{item.testimonial}"
                    </p>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      {item.designation && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.designation}
                        </p>
                      )}
                      {item.company && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.company}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-lg shadow-md text-center bg-white dark:bg-gray-800 transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    No testimonials yet. Be the first to share your experience!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="submission-form">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Share Your Experience
            </h2>

            {message && (
              <div
                className={`p-4 rounded-md mb-6 ${
                  message.includes("Error")
                    ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                }`}
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-lg shadow-md space-y-6 bg-white dark:bg-gray-800 transition-all duration-300"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="designation"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  placeholder="e.g. Marketing Director, Software Engineer"
                />
              </div>

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
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="testimonial"
                  className="block mb-2 text-gray-700 dark:text-gray-300"
                >
                  Your Testimonial
                </label>
                <textarea
                  id="testimonial"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  required
                  rows="5"
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none resize-none text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-4 rounded-lg text-white font-medium transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                }`}
              >
                {loading ? "Submitting..." : "Submit Testimonial"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
