import React from 'react';
import { Car, Package, ShoppingBag, MapPin } from 'lucide-react';

const Mobility = () => {
  const services = [
    {
      icon: <Car className="h-8 w-8 text-orange-600" />,
      title: 'Transport Urbain',
      description: 'Plateforme SoftNet Go pour la réservation de motos-taxis et taxis.',
    },
    {
      icon: <Package className="h-8 w-8 text-orange-600" />,
      title: 'Service de Livraison',
      description: 'Livraison rapide pour particuliers et entreprises.',
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-orange-600" />,
      title: 'Marketplace',
      description: 'Plateforme de vente en ligne pour les commerçants locaux.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-orange-600" />,
      title: 'Suivi en Temps Réel',
      description: 'Localisation GPS et suivi des commandes en direct.',
    },
  ];

  const features = [
    'Réservation instantanée',
    'Paiement sécurisé',
    'Notation des chauffeurs',
    'Historique des courses',
    'Support client 24/7',
    'Tarifs transparents',
  ];

  const cities = [
    {
      name: 'N\'Djamena',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80',
      status: 'Disponible',
    },
    {
      name: 'Moundou',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
      status: 'Bientôt disponible',
    },
  ];

  return (
    <section id="mobility" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SoftNet Mobility</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Révolutionnez vos déplacements urbains avec notre solution de transport intelligente.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-orange-50 rounded-xl p-12 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Fonctionnalités Principales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Villes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cities.map((city, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl group">
                <div className="aspect-[16/9]">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{city.name}</h4>
                  <p className="text-gray-200">{city.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
          >
            Télécharger SoftNet Go
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mobility;