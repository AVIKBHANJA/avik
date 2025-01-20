'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Phone,
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Send
} from 'lucide-react';

const Contact = () => {
  const initialFormState = {
    title: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    linkedin: '',
    github: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace these with your actual EmailJS credentials
      const templateParams = {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        linkedin: formData.linkedin || 'Not provided',
        github: formData.github || 'Not provided',
        message: formData.message
      };

      await emailjs.send(
        'service_vm9juqp', 
        'template_srgnyqc', 
        templateParams,
        'jwtr0tVSltzXln76t' 
      );

      setSubmitStatus('success');
      // Clear form after successful submission
      setFormData(initialFormState);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
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
      <div className="absolute inset-0 opacity-30 dark:opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Contact Me
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's connect! Whether you have a project in mind or just want to say hello, I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          <div className="space-y-6">
            {/* Phone Card */}
            <a href="tel:+918910782478" 
               className="block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Phone className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Let's Talk</h3>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a href="mailto:avikbhanja2@gmail.com"
               className="block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Mail className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email Me</h3>
                  <p className="text-gray-600 dark:text-gray-400">avikbhanja2@gmail.com</p>
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a href="https://wa.me/918910782478"
               target="_blank"
               rel="noopener noreferrer"
               className="block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <MessageCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400">Message Me!</p>
                </div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl space-y-6">
            {/* Title Select */}
            <div>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                required
              >
                <option value="">Choose your Title</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
                <option value="dr">Dr.</option>
              </select>
            </div>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <input
                type="tel"
                placeholder="Your Phone Number (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Company Input */}
            <div>
              <input
                type="text"
                placeholder="Your Company Name (Optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Social Links */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Linkedin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="LinkedIn URL (Optional)"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full p-3 pl-12 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Github className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="GitHub Username (Optional)"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full p-3 pl-12 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <textarea
                placeholder="Type Your Message Here"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-all ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              <Send className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : 'animate-none'}`} />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-green-600 dark:text-green-400">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <p className="text-red-600 dark:text-red-400">
                  Oops! Something went wrong. Please try again later.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;