import React from 'react';
import { BarChart, TrendingUp, Users, Globe } from 'lucide-react';

const InvestorPresentation = () => {
  const highlights = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: 'Croissance',
      value: '+45%',
      description: 'Croissance annuelle',
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Clients',
      value: '10k+',
      description: 'Clients actifs',
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: 'Présence',
      value: '3',
      description: 'Pays',
    },
  ];

  const sectors = [
    { name: 'Tech', percentage: 40 },
    { name: 'Agro', percentage: 25 },
    { name: 'Mobility', percentage: 20 },
    { name: 'Energies', percentage: 15 },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <BarChart className="h-8 w-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">Présentation Investisseurs</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {highlights.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-4">
              {item.icon}
              <div>
                <p className="text-gray-600">{item.title}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Distribution */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Distribution du Chiffre d'Affaires</h4>
        <div className="space-y-4">
          {sectors.map((sector, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{sector.name}</span>
                <span>{sector.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${sector.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          Télécharger la présentation complète
        </button>
      </div>
    </div>
  );
};

export default InvestorPresentation;