import React, { useState } from 'react';
import { Users, Target, Award, Lightbulb, Calendar, Building, Globe, Users2, ChevronRight, ChevronDown, Shield, Cloud, Camera, FileText, Wrench, Leaf, Car, Sun } from 'lucide-react';
import JoinForm from './forms/JoinForm';
import Modal from './Modal';
import Logo from './Logo';

interface AboutProps {
  onContactClick: () => void;
}

const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [activeSubsidiary, setActiveSubsidiary] = useState<string | null>(null);

  const organization = {
    ceo: {
      name: 'Abdellatif RAMADANE DAOUDA',
      title: 'Président-Directeur Général (PDG)',
      role: 'Supervision de l\'ensemble des activités du groupe et définition de la stratégie globale',
    },
    executives: [
      {
        name: 'Amina TAHIR SENOUSSI',
        title: 'Directeur Financier (CFO)',
        role: 'Gestion des finances du groupe et répartition des budgets',
      },
      {
        name: 'Alaina Moussa Menhem',
        title: 'Directeur des Opérations (COO)',
        role: 'Supervision des opérations quotidiennes et coordination entre filiales',
      },
    ],
    subsidiaries: [
      {
        id: 'tech',
        name: 'SoftNet Tech SA',
        director: 'Abdel Aziz HISSEIN ALI',
        title: 'Directeur Technique',
        color: 'blue',
        icon: Shield,
        description: 'Solutions technologiques et cybersécurité',
        solutions: [
          {
            icon: Shield,
            name: 'Cybersécurité',
            description: 'Protection des données et systèmes',
          },
          {
            icon: Cloud,
            name: 'Solutions Cloud',
            description: 'Développement et hébergement',
          },
          {
            icon: Camera,
            name: 'Vidéosurveillance',
            description: 'Systèmes de sécurité intelligents',
          },
          {
            icon: FileText,
            name: 'Gestion Documentaire',
            description: 'Solutions GED entreprises',
          },
          {
            icon: Wrench,
            name: 'Maintenance',
            description: 'Support technique continu',
          },
        ],
        team: [
          'Chef de Projet NTIC',
          'Responsable Cybersécurité',
          'Ingénieurs Développement',
          'Techniciens Support',
        ]
      },
      {
        id: 'agro',
        name: 'SoftNet Agro SA',
        color: 'green',
        icon: Leaf,
        description: 'Microfinance agricole et agro-industrie',
        team: [
          'Directeur Agro-Industriel',
          'Responsable Plateforme Karima',
          'Responsable Exportation',
        ]
      },
      {
        id: 'mobility',
        name: 'SoftNet Mobility SA',
        color: 'orange',
        icon: Car,
        description: 'Transport urbain intelligent',
        team: [
          'Directeur Mobilité et Logistique',
          'Responsable des Opérations Urbaines',
          'Responsable Marketplace',
        ]
      },
      {
        id: 'energies',
        name: 'SoftNet Energies SA',
        color: 'yellow',
        icon: Sun,
        description: 'Solutions énergétiques durables',
        team: [
          'Directeur des Énergies Renouvelables',
          'Responsable des Projets Solaires',
          'Responsable Maintenance et Services',
        ]
      }
    ]
  };

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Découvrez SOFTNET Groupe SA : L'Innovation au Service de l'Excellence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis sa création en 2010, SOFTNET Groupe SA s'est imposée comme un acteur clé dans les technologies 
            de pointe et les solutions innovantes au Tchad et en Afrique.
          </p>
        </div>

        {/* Organization section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Notre Organisation</h2>
          <div className="max-w-7xl mx-auto">
            {/* CEO Card */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{organization.ceo.name}</h3>
                    <p className="text-blue-100 mb-4">{organization.ceo.title}</p>
                    <p className="text-sm text-blue-100">{organization.ceo.role}</p>
                  </div>
                  <div className="hidden md:block">
                    <Logo className="h-16 w-auto" inverted={true} />
                  </div>
                </div>
              </div>
            </div>

            {/* Executives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {organization.executives.map((executive, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{executive.name}</h4>
                  <p className="text-blue-600 mb-3">{executive.title}</p>
                  <p className="text-sm text-gray-600">{executive.role}</p>
                </div>
              ))}
            </div>

            {/* Subsidiaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {organization.subsidiaries.map((subsidiary) => {
                const Icon = subsidiary.icon;
                const colorClass = getColorClass(subsidiary.color);
                
                return (
                  <div
                    key={subsidiary.id}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeSubsidiary === subsidiary.id ? 'ring-2 ring-blue-600' : ''
                    }`}
                    onClick={() => setActiveSubsidiary(activeSubsidiary === subsidiary.id ? null : subsidiary.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${colorClass}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{subsidiary.name}</h4>
                            <p className="text-sm text-gray-600">{subsidiary.description}</p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            activeSubsidiary === subsidiary.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>

                      {subsidiary.director && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">{subsidiary.director}</p>
                          <p className="text-sm text-gray-600">{subsidiary.title}</p>
                        </div>
                      )}

                      <div
                        className={`grid gap-4 transition-all duration-300 ${
                          activeSubsidiary === subsidiary.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          {subsidiary.solutions && (
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-3">Solutions</h5>
                              <div className="grid grid-cols-2 gap-3">
                                {subsidiary.solutions.map((solution, index) => {
                                  const SolutionIcon = solution.icon;
                                  return (
                                    <div key={index} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50">
                                      <SolutionIcon className="h-5 w-5 text-gray-400" />
                                      <div>
                                        <p className="font-medium text-sm">{solution.name}</p>
                                        <p className="text-xs text-gray-500">{solution.description}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Équipe</h5>
                            <ul className="space-y-2">
                              {subsidiary.team.map((role, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                                  {role}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Social Engagement */}
        <div className="mb-24 bg-gray-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Engagement Social</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            SOFTNET Groupe SA s'engage à participer activement au développement durable en soutenant 
            des initiatives locales dans les domaines de l'éducation, de la santé et de l'agriculture.
          </p>
          <div className="text-center">
            <button
              onClick={() => setShowJoinForm(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Nous rejoindre
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={showJoinForm} onClose={() => setShowJoinForm(false)}>
        <JoinForm onSubmit={() => setShowJoinForm(false)} />
      </Modal>
    </section>
  );
};

export default About;