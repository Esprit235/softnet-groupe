import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onContactClick: () => void;
  onAboutClick: () => void;
  onSubsidiaryClick: (id: string) => void;
  onSectionClick: (section: string) => void;
  activeSubsidiary: string | null;
  activeSection: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onContactClick, 
  onAboutClick, 
  onSubsidiaryClick,
  onSectionClick,
  activeSubsidiary,
  activeSection
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const subsidiaries = [
    { id: 'tech', name: 'Tech' },
    { id: 'agro', name: 'Agro' },
    { id: 'mobility', name: 'Mobility' },
    { id: 'energies', name: 'Energies' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <Logo className="h-10 w-auto" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onAboutClick}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              À propos
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <span>Nos Filiales</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  {subsidiaries.map((subsidiary) => (
                    <button
                      key={subsidiary.id}
                      onClick={() => onSubsidiaryClick(subsidiary.id)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeSubsidiary === subsidiary.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {subsidiary.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => onSectionClick('projects')}
              className={`text-gray-700 hover:text-blue-600 transition-colors ${
                activeSection === 'projects' ? 'text-blue-600' : ''
              }`}
            >
              Projets
            </button>
            <button
              onClick={() => onSectionClick('investors')}
              className={`text-gray-700 hover:text-blue-600 transition-colors ${
                activeSection === 'investors' ? 'text-blue-600' : ''
              }`}
            >
              Investisseurs
            </button>
            <button
              onClick={onContactClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Nous contacter
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onAboutClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              À propos
            </button>
            {subsidiaries.map((subsidiary) => (
              <button
                key={subsidiary.id}
                onClick={() => {
                  onSubsidiaryClick(subsidiary.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  activeSubsidiary === subsidiary.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {subsidiary.name}
              </button>
            ))}
            <button
              onClick={() => {
                onSectionClick('projects');
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeSection === 'projects'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Projets
            </button>
            <button
              onClick={() => {
                onSectionClick('investors');
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeSection === 'investors'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Investisseurs
            </button>
            <button
              onClick={() => {
                onContactClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md"
            >
              Nous contacter
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;