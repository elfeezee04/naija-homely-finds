import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  PlusCircle, 
  MessageSquare, 
  User, 
  Menu, 
  X 
} from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Naija Homely Finds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/properties"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/properties') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            
            <Link
              to="/post-property"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/post-property') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>List Property</span>
            </Link>
            
            <Link
              to="/messages"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/messages') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/properties"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/properties') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Properties</span>
              </Link>
              
              <Link
                to="/post-property"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/post-property') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PlusCircle className="h-4 w-4" />
                <span>List Property</span>
              </Link>
              
              <Link
                to="/messages"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/messages') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;