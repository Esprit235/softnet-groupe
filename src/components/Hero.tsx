import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onAboutClick: () => void;
  onSubsidiaryClick: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick, onAboutClick, onSubsidiaryClick }) => {
  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-green-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center lg:text-left lg:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Innover pour un{' '}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              avenir durable
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            SOFTNET Groupe SA, leader dans les technologies, l'agro-industrie, la mobilité et les énergies renouvelables au Tchad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onContactClick}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Nous contacter
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={onAboutClick}
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      {/* Subsidiaries preview */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 'tech',
              title: 'Tech',
              description: 'Solutions technologiques innovantes',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
            },
            {
              id: 'agro',
              title: 'Agro',
              description: 'Microfinance et agro-industrie',
              image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
            },
            {
              id: 'mobility',
              title: 'Mobility',
              description: 'Transport urbain intelligent',
              image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80',
            },
            {
              id: 'energies',
              title: 'Energies',
              description: 'Solutions énergétiques durables',
              image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80',
            }
          ].map((subsidiary) => (
            <button
              key={subsidiary.id}
              onClick={() => onSubsidiaryClick(subsidiary.id)}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url(${subsidiary.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
              </div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{subsidiary.title}</h3>
                <p className="text-gray-200">{subsidiary.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;