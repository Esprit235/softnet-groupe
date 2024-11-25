import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onContactClick: () => void;
  onAboutClick: () => void;
  onSubsidiaryClick: (id: string) => void;
  onSectionClick: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onAboutClick,
  onSubsidiaryClick,
  onSectionClick
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <div className="mb-6">
              <Logo className="h-12 w-auto" inverted={true} />
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <p>
                  Avenue du Palais de la Démocratie<br />
                  Gassi Rue 7124, Porte 4242<br />
                  N'Djamena, Tchad
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <p>+235 66 55 44 33</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:contact@softnet-td.com" className="hover:text-blue-400 transition-colors">
                  contact@softnet-td.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-blue-400 transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={onAboutClick}
                  className="hover:text-blue-400 transition-colors"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSectionClick('projects')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Projets
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Filiales */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Nos Filiales</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSubsidiaryClick('tech')}
                  className="hover:text-blue-400 transition-colors"
                >
                  SoftNet Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSubsidiaryClick('agro')}
                  className="hover:text-blue-400 transition-colors"
                >
                  SoftNet Agro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSubsidiaryClick('mobility')}
                  className="hover:text-blue-400 transition-colors"
                >
                  SoftNet Mobility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSubsidiaryClick('energies')}
                  className="hover:text-blue-400 transition-colors"
                >
                  SoftNet Energies
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">WhatsApp</h3>
            <div className="space-y-2">
              {[
                { number: '66554433', display: '+235 66 55 44 33' },
                { number: '90554433', display: '+235 90 55 44 33' },
                { number: '68554433', display: '+235 68 55 44 33' },
              ].map((phone, index) => (
                <div key={index}>
                  <a
                    href={`https://wa.me/235${phone.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {phone.display}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p>
            © {currentYear} SOFTNET Groupe SA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;