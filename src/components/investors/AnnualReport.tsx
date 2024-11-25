import React from 'react';
import { FileText, Download, ChevronRight } from 'lucide-react';

const AnnualReport = () => {
  const reports = [
    {
      year: '2023',
      title: 'Rapport Annuel 2023',
      size: '2.4 MB',
      url: '#',
      highlights: [
        'Croissance de 45% du chiffre d\'affaires',
        'Expansion dans 2 nouveaux pays',
        'Lancement de 3 nouvelles filiales',
      ],
    },
    {
      year: '2022',
      title: 'Rapport Annuel 2022',
      size: '2.1 MB',
      url: '#',
      highlights: [
        'Investissement majeur en R&D',
        'Partenariats stratégiques',
        'Développement durable',
      ],
    },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <FileText className="h-8 w-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">Rapports Annuels</h3>
      </div>

      <div className="space-y-6">
        {reports.map((report, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{report.title}</h4>
                <p className="text-gray-500 text-sm">Taille du fichier: {report.size}</p>
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </button>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-gray-900">Points clés :</h5>
              <ul className="space-y-1">
                {report.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnualReport;