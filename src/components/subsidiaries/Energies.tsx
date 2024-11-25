import React, { useState } from 'react';
import { Sun, Battery, Wrench, Users } from 'lucide-react';
import EnergyQuoteCalculator from '../calculators/EnergyQuoteCalculator';
import Modal from '../Modal';

interface EnergiesProps {
  onContactClick?: () => void;
}

const Energies: React.FC<EnergiesProps> = ({ onContactClick }) => {
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);

  const services = [
    {
      icon: <Sun className="h-8 w-8 text-yellow-600" />,
      title: 'Solutions Solaires',
      description: 'Installation de panneaux solaires pour particuliers et entreprises.',
    },
    {
      icon: <Battery className="h-8 w-8 text-yellow-600" />,
      title: 'Systèmes Hybrides',
      description: 'Solutions combinant énergie solaire et batteries de stockage.',
    },
    {
      icon: <Wrench className="h-8 w-8 text-yellow-600" />,
      title: 'Maintenance',
      description: 'Service d\'entretien et support technique continu.',
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-600" />,
      title: 'Électrification Rurale',
      description: 'Projets d\'accès à l\'énergie pour les zones isolées.',
    },
  ];

  const stats = [
    { value: '1MW+', label: 'Capacité installée' },
    { value: '50+', label: 'Villages électrifiés' },
    { value: '1000+', label: 'Installations réalisées' },
    { value: '24/7', label: 'Support technique' },
  ];

  const projects = [
    {
      title: 'Électrification Villageoise',
      description: 'Projet d\'électrification solaire pour 10 villages.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80',
    },
    {
      title: 'Centre Commercial Solaire',
      description: 'Installation solaire pour un grand centre commercial.',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80',
    },
  ];

  const handleQuoteSubmit = (data: any) => {
    setQuoteData(data);
    setShowQuoteCalculator(false);
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <section id="energies" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SoftNet Energies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solutions énergétiques durables pour un avenir plus vert.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-yellow-50 rounded-xl p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Projets Phares</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl group">
                <div className="aspect-[16/9]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-200">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => setShowQuoteCalculator(true)}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors"
          >
            Demander un devis
          </button>
        </div>
      </div>

      <Modal isOpen={showQuoteCalculator} onClose={() => setShowQuoteCalculator(false)}>
        <EnergyQuoteCalculator onSubmit={handleQuoteSubmit} />
      </Modal>
    </section>
  );
};

export default Energies;