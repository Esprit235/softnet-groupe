import React from 'react';
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';

const Projects = () => {
  const categories = ['Tous', 'Tech', 'Agro', 'Mobility', 'Energies'];
  const [activeCategory, setActiveCategory] = React.useState('Tous');

  const projects = [
    {
      title: 'Infrastructure Cloud Gouvernementale',
      category: 'Tech',
      date: '2024',
      client: 'Institutions Gouvernementales',
      description: 'Déploiement d\'une infrastructure cloud sécurisée pour la gestion des données sensibles.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    },
    {
      title: 'Programme Karima Agro',
      category: 'Agro',
      date: '2023',
      client: 'Agriculteurs locaux',
      description: 'Plateforme de microfinance pour soutenir les projets agricoles innovants.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
    },
    {
      title: 'SoftNet Go N\'Djamena',
      category: 'Mobility',
      date: '2024',
      client: 'Transport urbain',
      description: 'Déploiement de la plateforme de transport urbain intelligent.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80',
    },
    {
      title: 'Électrification Rurale Solaire',
      category: 'Energies',
      date: '2023',
      client: 'Communautés rurales',
      description: 'Installation de systèmes solaires dans 10 villages.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80',
    },
  ];

  const filteredProjects = activeCategory === 'Tous'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Projets</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos réalisations et l'impact que nous créons dans différents secteurs.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {project.category}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{project.client}</span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;