import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-2">JobSphere</h2>
          <p className="text-sm text-white/80">
            Your gateway to a better career. Find your dream job or hire top talent effortlessly.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-yellow-300 transition">Browse Jobs</Link></li>
            <li><Link to="/post-job" className="hover:text-yellow-300 transition">Post a Job</Link></li>
            <li><Link to="/login" className="hover:text-yellow-300 transition">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-white/90">
            <li><a href="#" className="hover:text-yellow-300 transition">Blog</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Support</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex gap-4">
            <a target="_blank" href="https://github.com/VikashMalav" className="hover:text-yellow-300 transition"><Github /></a>
            <a target="_blank" href="https://www.linkedin.com/in/vikash-malav/" className="hover:text-yellow-300 transition"><Linkedin /></a>
            <a target="_blank" href="mailto:info@jobsphere.com" className="hover:text-yellow-300 transition"><Mail /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-white/70 text-sm mt-10 border-t border-white/20 pt-6">
        &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
