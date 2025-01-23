"use client";

import { useState } from "react";

export default function ContactForm() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the Terms before submitting.");
      return;
    }
    // Put your form submission logic here (e.g., API call)
    alert("Form submitted!");
  };

  return (
    <section className="py-16">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Top text */}
        <span className="text-sm uppercase text-gray-500 block mb-2">
          Tagline
        </span>
        <h2 className="text-3xl font-bold mb-2">Contact us</h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-1 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
              placeholder="Type your message..."
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-primary border-gray-300 rounded mr-2"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-teal-700 text-white font-semibold px-6 py-2 rounded-md 
                         hover:bg-teal-800 focus:outline-none focus:ring-2 
                         focus:ring-teal-400 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
