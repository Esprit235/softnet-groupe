import React, { useState, useEffect } from 'react';
import { Sun, Battery, Home, Building2, Zap, Calculator, ArrowRight } from 'lucide-react';
import Logo from '../Logo';

interface QuoteCalculatorProps {
  onSubmit: (data: any) => void;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [buildingType, setBuildingType] = useState<string>('');
  const [surfaceArea, setSurfaceArea] = useState<number>(0);
  const [consumption, setConsumption] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [customizations, setCustomizations] = useState({
    batteryBackup: false,
    monitoring: false,
    maintenance: false,
  });

  const buildingTypes = [
    { id: 'residential', label: 'Résidentiel', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
  ];

  const products = [
    { 
      id: 'solar_panels', 
      label: 'Panneaux Solaires', 
      icon: Sun,
      basePrice: 2000, // Prix doublé
      description: 'Panneaux photovoltaïques haute efficacité'
    },
    { 
      id: 'battery', 
      label: 'Système de Stockage', 
      icon: Battery,
      basePrice: 4000, // Prix doublé
      description: 'Batteries lithium-ion pour stockage d\'énergie'
    },
    { 
      id: 'hybrid', 
      label: 'Système Hybride', 
      icon: Zap,
      basePrice: 6000, // Prix doublé
      description: 'Solution complète solaire + stockage'
    },
  ];

  useEffect(() => {
    calculateEstimate();
  }, [buildingType, surfaceArea, consumption, selectedProducts, customizations]);

  const calculateEstimate = () => {
    let total = 0;
    
    // Base cost calculation with doubled rates
    const baseRate = buildingType === 'commercial' ? 200 : 150; // Doublé
    total += (surfaceArea * baseRate) + (consumption * 4); // Taux de consommation doublé

    // Add product costs
    selectedProducts.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.basePrice;
      }
    });

    // Add customization costs (doublés)
    if (customizations.batteryBackup) total += 4000;
    if (customizations.monitoring) total += 1000;
    if (customizations.maintenance) total += 2000;

    setEstimatedCost(total);
  };

  const handleSubmit = () => {
    onSubmit({
      buildingType,
      surfaceArea,
      consumption,
      selectedProducts,
      customizations,
      estimatedCost,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Type de Bâtiment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buildingTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setBuildingType(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      buildingType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-4 ${
                      buildingType === type.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className="text-center font-medium">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Caractéristiques</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surface (m²)
                </label>
                <input
                  type="number"
                  min="0"
                  value={surfaceArea}
                  onChange={(e) => setSurfaceArea(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consommation mensuelle moyenne (kWh)
                </label>
                <input
                  type="number"
                  min="0"
                  value={consumption}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product) => {
                const Icon = product.icon;
                const isSelected = selectedProducts.includes(product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProducts(prev => 
                      isSelected 
                        ? prev.filter(id => id !== product.id)
                        : [...prev, product.id]
                    )}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-4 ${
                      isSelected ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className="text-center font-medium mb-2">{product.label}</p>
                    <p className="text-sm text-gray-500 text-center">{product.description}</p>
                    <p className="text-center font-semibold mt-4">
                      {product.basePrice.toLocaleString()} USD
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Options</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={customizations.batteryBackup}
                  onChange={(e) => setCustomizations(prev => ({
                    ...prev,
                    batteryBackup: e.target.checked
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>Système de batterie de secours (+4000 USD)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={customizations.monitoring}
                  onChange={(e) => setCustomizations(prev => ({
                    ...prev,
                    monitoring: e.target.checked
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>Système de surveillance en temps réel (+1000 USD)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={customizations.maintenance}
                  onChange={(e) => setCustomizations(prev => ({
                    ...prev,
                    maintenance: e.target.checked
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>Contrat de maintenance annuel (+2000 USD)</span>
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Récapitulatif</h3>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex justify-center mb-6">
                <Logo className="h-12 w-auto" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-gray-600">Type de bâtiment:</div>
                <div className="font-medium">
                  {buildingType === 'residential' ? 'Résidentiel' : 'Commercial'}
                </div>
                <div className="text-gray-600">Surface:</div>
                <div className="font-medium">{surfaceArea} m²</div>
                <div className="text-gray-600">Consommation:</div>
                <div className="font-medium">{consumption} kWh/mois</div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium mb-2">Solutions choisies:</h4>
                <ul className="space-y-2">
                  {selectedProducts.map(productId => {
                    const product = products.find(p => p.id === productId);
                    return product ? (
                      <li key={productId} className="flex justify-between">
                        <span>{product.label}</span>
                        <span className="font-medium">
                          {product.basePrice.toLocaleString()} USD
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              {Object.entries(customizations).some(([_, value]) => value) && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-2">Options:</h4>
                  <ul className="space-y-2">
                    {customizations.batteryBackup && (
                      <li className="flex justify-between">
                        <span>Batterie de secours</span>
                        <span className="font-medium">4000 USD</span>
                      </li>
                    )}
                    {customizations.monitoring && (
                      <li className="flex justify-between">
                        <span>Surveillance en temps réel</span>
                        <span className="font-medium">1000 USD</span>
                      </li>
                    )}
                    {customizations.maintenance && (
                      <li className="flex justify-between">
                        <span>Contrat de maintenance</span>
                        <span className="font-medium">2000 USD</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total estimé:</span>
                  <span>{estimatedCost.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Calculateur de Devis</h2>
        </div>
        <div className="text-sm text-gray-500">
          Étape {step} sur 5
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full mb-8">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={() => setStep(prev => prev - 1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Retour
          </button>
        )}
        {step < 5 ? (
          <button
            onClick={() => setStep(prev => prev + 1)}
            className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Obtenir le devis
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteCalculator;