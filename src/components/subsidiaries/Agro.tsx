import React from 'react';
import { Sprout, Coins, Factory, Truck } from 'lucide-react';

const Agro = () => {
  const services = [
    {
      icon: <Coins className="h-8 w-8 text-green-600" />,
      title: 'Microfinance Agricole',
      description: 'Plateforme Karima pour le financement et le soutien des projets agricoles.',
    },
    {
      icon: <Factory className="h-8 w-8 text-green-600" />,
      title: 'Transformation Agroalimentaire',
      description: 'Transformation et valorisation des produits agricoles locaux.',
    },
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      title: 'Logistique et Exportation',
      description: 'Solutions complètes de stockage, transport et exportation.',
    },
    {
      icon: <Sprout className="h-8 w-8 text-green-600" />,
      title: 'Support Technique',
      description: 'Formation et accompagnement des agriculteurs.',
    },
  ];

  const stats = [
    { value: '5000+', label: 'Agriculteurs financés' },
    { value: '1000', label: 'Hectares cultivés' },
    { value: '2000+', label: 'Emplois créés' },
    { value: '10+', label: 'Pays d\'exportation' },
  ];

  const projects = [
    {
      title: 'Programme Karima',
      description: 'Financement et accompagnement des agriculteurs locaux.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
    },
    {
      title: 'Centre de Transformation',
      description: 'Usine moderne de transformation des produits agricoles.',
      image: 'https://images.unsplash.com/photo-1595841696677-6ff36f10c078?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="agro" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SoftNet Agro</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Catalyseur de la microfinance agricole et de l'agro-industrie au Tchad.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-green-50 rounded-xl p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Réalisations</h3>
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
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Rejoindre le programme Karima
          </a>
        </div>
      </div>
    </section>
  );
};

export default Agro;