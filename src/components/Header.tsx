
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-800">SpeedyIntervue</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-slate-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-slate-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
            </div>
          </nav>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-primary-800 hover:bg-primary-900 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
              <a href="#features" className="text-slate-600 hover:text-primary-700 block px-3 py-2 rounded-md text-base font-medium">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-primary-700 block px-3 py-2 rounded-md text-base font-medium">
                Pricing
              </a>
              <a href="#about" className="text-slate-600 hover:text-primary-700 block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <div className="pt-4 pb-3 border-t border-slate-200">
                <div className="flex flex-col space-y-2 px-3">
                  <Button variant="outline" onClick={() => navigate('/login')} className="w-full">
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/signup')} className="w-full bg-primary-800 hover:bg-primary-900">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
