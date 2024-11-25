import React, { useState } from 'react';
import { Shield, Cloud, Code, Lightbulb, Camera, Server, FileText, Wrench, ArrowRight, Phone, Calculator, Building, Lock, Database, Eye, Users, ChevronDown } from 'lucide-react';
import Modal from '../Modal';
import Logo from '../Logo';
import SurveillanceQuoteCalculator from '../calculators/SurveillanceQuoteCalculator';

interface TechProps {
  onContactClick: () => void;
}

const Tech: React.FC<TechProps> = ({ onContactClick }) => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);

  const handleQuoteSubmit = (data: any) => {
    setQuoteData(data);
    setShowQuote(false);
    // Rediriger vers le formulaire de contact avec les données du devis
    if (onContactClick) {
      onContactClick();
    }
  };

  const solutions = [
    {
      id: 'cybersecurity',
      icon: Shield,
      title: 'Cybersécurité et Protection des Données',
      description: 'Protection avancée de vos systèmes et données sensibles',
      features: [
        'Audit de sécurité complet',
        'Protection contre les cyberattaques',
        'Cryptage des données',
        'Formation en sécurité',
        'Surveillance 24/7',
      ],
      benefits: [
        'Protection continue',
        'Conformité aux normes',
        'Réduction des risques',
      ],
    },
    {
      id: 'cloud',
      icon: Cloud,
      title: 'Solutions Cloud et Logiciels Sur Mesure',
      description: 'Développement et déploiement de solutions cloud adaptées',
      features: [
        'Applications web et mobiles',
        'Solutions SaaS',
        'Intégration de systèmes',
        'Migration cloud',
        'Support technique',
      ],
      benefits: [
        'Scalabilité',
        'Performance optimale',
        'Coûts maîtrisés',
      ],
    },
    {
      id: 'surveillance',
      icon: Camera,
      title: 'Vidéosurveillance Intelligente',
      description: 'Systèmes de surveillance avancés avec IA',
      features: [
        'Caméras HD/4K',
        'Analyse vidéo en temps réel',
        'Détection de mouvements',
        'Reconnaissance faciale',
        'Stockage sécurisé',
      ],
      benefits: [
        'Sécurité renforcée',
        'Surveillance 24/7',
        'Alertes en temps réel',
      ],
    },
    {
      id: 'document',
      icon: FileText,
      title: 'Gestion Documentaire',
      description: 'Solutions de gestion documentaire pour entreprises',
      features: [
        'Numérisation',
        'Archivage électronique',
        'Workflow documentaire',
        'Signature électronique',
        'Recherche avancée',
      ],
      benefits: [
        'Organisation optimisée',
        'Accès facile',
        'Économie de temps',
      ],
    },
    {
      id: 'maintenance',
      icon: Wrench,
      title: 'Service de Maintenance',
      description: 'Support et maintenance de vos systèmes IT',
      features: [
        'Maintenance préventive',
        'Support technique 24/7',
        'Mises à jour système',
        'Sauvegarde des données',
        'Résolution rapide',
      ],
      benefits: [
        'Disponibilité maximale',
        'Performance optimale',
        'Tranquillité d\'esprit',
      ],
    },
  ];

  const SolutionModal = ({ solution }: { solution: typeof solutions[0] }) => {
    const Icon = solution.icon;
    return (
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-8">
          <Icon className="h-10 w-10 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-6">{solution.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités</h4>
              <ul className="space-y-2">
                {solution.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <ChevronDown className="h-4 w-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Avantages</h4>
              <ul className="space-y-2">
                {solution.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <ChevronDown className="h-4 w-4 text-green-600 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onContactClick}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Phone className="h-5 w-5 mr-2" />
            Nous contacter
          </button>
          {solution.id === 'surveillance' && (
            <button
              onClick={() => {
                setSelectedSolution(null);
                setShowQuote(true);
              }}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Demander un devis
            </button>
          )}
        </div>
      </div>
    );
  };

  const SolutionsView = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Logo className="h-10 w-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Nos Solutions</h2>
          </div>
          <button
            onClick={() => setShowSolutions(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-8">
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Secteur : NTIC et Intégration Technologique
            </h3>
            <p className="text-blue-700">
              Clients cibles : Entreprises, institutions gouvernementales, ONG
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{solution.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedSolution(solution.id)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section id="tech" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SoftNet Tech</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leader en solutions technologiques innovantes, nous accompagnons votre transformation digitale avec expertise et sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {solutions.slice(0, 3).map((solution) => {
              const Icon = solution.icon;
              return (
                <div key={solution.id} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowSolutions(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Découvrir nos solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {showSolutions && <SolutionsView />}

      {selectedSolution && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSolution(null)}
        >
          <SolutionModal
            solution={solutions.find(s => s.id === selectedSolution)!}
          />
        </Modal>
      )}

      {showQuote && (
        <Modal
          isOpen={true}
          onClose={() => setShowQuote(false)}
        >
          <SurveillanceQuoteCalculator onSubmit={handleQuoteSubmit} />
        </Modal>
      )}
    </>
  );
};

export default Tech;