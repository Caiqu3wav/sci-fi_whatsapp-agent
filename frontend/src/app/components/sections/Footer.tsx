import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Link  from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-primary-200 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sci-Fi AI</h3>
            <p className="text-gray-400">
            Part of the sci-fi franchise of artificial intelligence solutions, 
            bringing innovation and efficiency to your communication.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Smart automation</li>
              <li>Data analytics</li>
              <li>Advanced customization</li>
              <li>WhatsApp Integration</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Blog</li>
            <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Suport</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help central</li>
              <li>Documentation</li>
              <li>System status</li>
              <li>Privacity policies</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col bg-primary-200 md:flex-row justify-between items-center pt-8 border-t border-purple-500/20">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Sci-Fi AI. All rights reserved.
          </p>
          <div className="flex space-x-6 px-2 border-gray-500">
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};