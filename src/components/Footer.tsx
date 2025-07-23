import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Naija Homely Finds</span>
            </Link>
            <p className="text-background/80">
              Nigeria's premier real estate platform connecting property seekers 
              with trusted agents and landlords.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/80 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/properties" className="block text-background/80 hover:text-primary">
                Browse Properties
              </Link>
              <Link to="/post-property" className="block text-background/80 hover:text-primary">
                List Property
              </Link>
              <Link to="/register" className="block text-background/80 hover:text-primary">
                Join as Agent
              </Link>
              <Link to="/about" className="block text-background/80 hover:text-primary">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-background/80 hover:text-primary">
                Help Center
              </Link>
              <Link to="/contact" className="block text-background/80 hover:text-primary">
                Contact Us
              </Link>
              <Link to="/privacy" className="block text-background/80 hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-background/80 hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80">+234 800 HOMELY</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80">info@naijahomelyfinds.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-background/80">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/80">
            © 2024 Naija Homely Finds. All rights reserved. Built with ❤️ for Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;