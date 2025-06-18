import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
          About JobSphere
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Connecting talents with opportunities — smarter, faster, better.
        </p>
      </div>

      {/* Section */}
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">🌟 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At JobSphere, our mission is to empower job seekers and companies by bridging the talent gap.
            We aim to make job discovery seamless, transparent, and truly impactful for everyone involved.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">🚀 What We Do</h2>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a fresher looking to kickstart your career, or a company trying to find the perfect candidate —
            JobSphere provides a powerful platform built with MERN stack and designed with efficiency and usability in mind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">🎯 Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Clean and modern UI/UX</li>
            <li>Advanced filtering, search, and pagination</li>
            <li>Real-time job application process</li>
            <li>Built using React, Redux Toolkit, Node.js, and MongoDB</li>
          </ul>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mt-8">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-3xl font-bold text-indigo-600">100+</h3>
            <p className="text-sm text-gray-600">Jobs Listed</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-3xl font-bold text-indigo-600">50+</h3>
            <p className="text-sm text-gray-600">Companies</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-3xl font-bold text-indigo-600">500+</h3>
            <p className="text-sm text-gray-600">Applicants</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-3xl font-bold text-indigo-600">100%</h3>
            <p className="text-sm text-gray-600">Free to Use</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
