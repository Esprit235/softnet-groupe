import React, { useState } from 'react';
import { TrendingUp, Shield, Users } from 'lucide-react';
import AnnualReport from './investors/AnnualReport';
import InvestorPresentation from './investors/InvestorPresentation';
import SecureArea from './investors/SecureArea';
import BecomeInvestor from './investors/BecomeInvestor';

const Investors = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const opportunities = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: 'Croissance Rapide',
      description: 'Un marché en pleine expansion avec des perspectives de croissance exceptionnelles.',
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Investissement Sécurisé',
      description: 'Des projets solides avec des garanties et une gestion transparente.',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Impact Social',
      description: 'Contribution au développement économique et social de l\'Afrique.',
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'annual-report':
        return <AnnualReport />;
      case 'presentation':
        return <InvestorPresentation />;
      case 'secure-area':
        return <SecureArea />;
      case 'become-investor':
        return <BecomeInvestor />;
      default:
        return null;
    }
  };

  return (
    <section id="investors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Espace Investisseurs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez-nous dans notre mission de transformation digitale et de développement durable en Afrique.
          </p>
        </div>

        {/* Investment Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                {opportunity.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{opportunity.title}</h3>
              <p className="text-gray-600">{opportunity.description}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { id: 'annual-report', title: 'Rapport Annuel' },
            { id: 'presentation', title: 'Présentation Investisseurs' },
            { id: 'secure-area', title: 'Espace Sécurisé' },
            { id: 'become-investor', title: 'Devenir Investisseur' },
          ].map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveSection(activeSection === button.id ? null : button.id)}
              className={`px-6 py-3 rounded-md transition-colors ${
                activeSection === button.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {button.title}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        {activeSection && (
          <div className="mt-8">
            {renderSection()}
          </div>
        )}
      </div>
    </section>
  );
};

export default Investors;