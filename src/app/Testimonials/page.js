"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

export default function Testimonials() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState(""); // Changed from email
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
        .insert([{ name, designation, testimonial, company, approved: false }]); // Changed email to designation

      if (error) throw error;

      // Clear the form
      setName("");
      setDesignation(""); // Changed from email
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
          body: JSON.stringify({ name, designation, testimonial }), // Changed email to designation
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white mb-12">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center py-10">Testimonials</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="testimonials-display">
            <h2 className="text-2xl font-semibold mb-6">What People Say</h2>
            <div className="space-y-6">
              {isLoading ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <p className="text-lg">Loading testimonials...</p>
                </div>
              ) : allTestimonials.length > 0 ? (
                allTestimonials.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800 p-6 rounded-lg shadow-md"
                  >
                    <p className="italic text-lg mb-4">"{item.testimonial}"</p>
                    <div className="text-right">
                      <p className="font-bold">{item.name}</p>
                      {item.designation && (
                        <p className="text-sm text-gray-400">{item.designation}</p>
                      )}
                      {item.company && (
                        <p className="text-sm text-gray-400">{item.company}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <p className="text-lg">
                    No testimonials yet. Be the first to share your experience!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="submission-form">
            <h2 className="text-2xl font-semibold mb-6">
              Share Your Experience
            </h2>

            {message && (
              <div
                className={`p-4 rounded-md mb-6 ${
                  message.includes("Error") ? "bg-red-900" : "bg-green-900"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                />
              </div>

              <div>
                <label htmlFor="designation" className="block mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                  placeholder="e.g. Marketing Director, Software Engineer"
                />
              </div>

              <div>
                <label htmlFor="company" className="block mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                />
              </div>

              <div>
                <label htmlFor="testimonial" className="block mb-2">
                  Your Testimonial
                </label>
                <textarea
                  id="testimonial"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  required
                  rows="5"
                  className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-md font-semibold disabled:bg-blue-800 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Testimonial"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}