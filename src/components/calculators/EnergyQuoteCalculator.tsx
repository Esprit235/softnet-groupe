import React, { useState, useEffect, useRef } from 'react';
import { Sun, Battery, Wrench, Calculator, ArrowRight, Download, Zap, Home, Building2, Factory, Lightbulb, Plug } from 'lucide-react';
import Logo from '../Logo';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface EnergyQuoteCalculatorProps {
  onSubmit: (data: any) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  power?: number;
  capacity?: number;
}

const EnergyQuoteCalculator: React.FC<EnergyQuoteCalculatorProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [buildingType, setBuildingType] = useState('');
  const [consumption, setConsumption] = useState({
    daily: 0,
    peak: 0,
  });
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({});
  const [customizations, setCustomizations] = useState({
    installation: true,
    monitoring: false,
    maintenance: false,
    insurance: false,
  });
  const [totalCost, setTotalCost] = useState(0);
  const [systemSpecs, setSystemSpecs] = useState({
    totalPower: 0,
    storageCapacity: 0,
    dailyProduction: 0,
    backupTime: 0,
  });
  const quoteRef = useRef<HTMLDivElement>(null);

  // Panneaux solaires
  const solarPanels: Product[] = [
    { id: 'panel_400w', name: 'Panneau 400W Mono', price: 225, description: 'Panneau monocristallin haute efficacité', power: 400 },
    { id: 'panel_500w', name: 'Panneau 500W Mono', price: 300, description: 'Panneau monocristallin premium', power: 500 },
    { id: 'panel_600w', name: 'Panneau 600W Bifacial', price: 450, description: 'Panneau bifacial haute performance', power: 600 }
  ];

  // Onduleurs
  const inverters: Product[] = [
    { id: 'inv_3kw', name: 'Onduleur 3kW', price: 750, description: 'Onduleur hybride monophasé', power: 3000 },
    { id: 'inv_5kw', name: 'Onduleur 5kW', price: 1125, description: 'Onduleur hybride monophasé', power: 5000 },
    { id: 'inv_8kw', name: 'Onduleur 8kW', price: 1875, description: 'Onduleur hybride triphasé', power: 8000 },
    { id: 'inv_10kw', name: 'Onduleur 10kW', price: 2250, description: 'Onduleur hybride triphasé', power: 10000 }
  ];

  // Batteries
  const batteries: Product[] = [
    { id: 'bat_5kwh', name: 'Batterie 5kWh', price: 1875, description: 'Batterie Lithium LFP', capacity: 5 },
    { id: 'bat_10kwh', name: 'Batterie 10kWh', price: 3375, description: 'Batterie Lithium LFP', capacity: 10 },
    { id: 'bat_15kwh', name: 'Batterie 15kWh', price: 4875, description: 'Batterie Lithium LFP', capacity: 15 }
  ];

  // Accessoires
  const accessories: Product[] = [
    { id: 'mount_ground', name: 'Structure Sol', price: 375, description: 'Structure aluminium pour sol' },
    { id: 'mount_roof', name: 'Structure Toit', price: 300, description: 'Structure aluminium pour toit' },
    { id: 'meter', name: 'Compteur Intelligent', price: 225, description: 'Compteur bidirectionnel' },
    { id: 'protect', name: 'Kit Protection', price: 375, description: 'Parafoudre et disjoncteurs' },
    { id: 'cable', name: 'Kit Câblage', price: 450, description: 'Câbles solaires et connecteurs' }
  ];

  const buildingTypes = [
    { id: 'residential', label: 'Résidentiel', icon: Home, typical: { daily: 15, peak: 3 } },
    { id: 'commercial', label: 'Commercial', icon: Building2, typical: { daily: 50, peak: 10 } },
    { id: 'industrial', label: 'Industriel', icon: Factory, typical: { daily: 200, peak: 40 } }
  ];

  useEffect(() => {
    calculateSystemSpecs();
    calculateTotal();
  }, [selectedProducts, customizations]);

  const calculateSystemSpecs = () => {
    let totalPower = 0;
    let storageCapacity = 0;

    // Calculer la puissance totale des panneaux
    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const panel = solarPanels.find(p => p.id === productId);
      if (panel?.power) {
        totalPower += panel.power * quantity;
      }
    });

    // Calculer la capacité de stockage
    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const battery = batteries.find(p => p.id === productId);
      if (battery?.capacity) {
        storageCapacity += battery.capacity * quantity;
      }
    });

    // Calculer la production journalière estimée (en supposant 5 heures de soleil peak)
    const dailyProduction = totalPower * 5 / 1000; // kWh

    // Calculer le temps de backup basé sur la consommation
    const backupTime = consumption.daily > 0 
      ? (storageCapacity / consumption.daily) * 24 
      : 0;

    setSystemSpecs({
      totalPower,
      storageCapacity,
      dailyProduction,
      backupTime
    });
  };

  const calculateTotal = () => {
    let total = 0;

    // Coût des produits
    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const product = [...solarPanels, ...inverters, ...batteries, ...accessories]
        .find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });

    // Coût des services
    if (customizations.installation) total += total * 0.15; // 15% du coût matériel
    if (customizations.monitoring) total += 750;
    if (customizations.maintenance) total += total * 0.10; // 10% du coût matériel
    if (customizations.insurance) total += total * 0.05; // 5% du coût matériel

    setTotalCost(total);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: Math.max(0, quantity)
    }));
  };

  const downloadQuote = async () => {
    if (!quoteRef.current) return;

    try {
      const canvas = await html2canvas(quoteRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('devis-energie-solaire.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      buildingType,
      consumption,
      selectedProducts,
      customizations,
      totalCost,
      systemSpecs
    });
  };

  const renderProductSection = (products: Product[], icon: React.ReactNode, title: string) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-medium text-lg mb-2">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            {product.power && (
              <p className="text-sm text-blue-600 mb-2">Puissance: {product.power}W</p>
            )}
            {product.capacity && (
              <p className="text-sm text-blue-600 mb-2">Capacité: {product.capacity}kWh</p>
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-blue-600">
                {product.price.toLocaleString()} USD
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) - 1)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={selectedProducts[product.id] || 0}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                  className="w-16 text-center border rounded-md"
                />
                <button
                  onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) + 1)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Type de Bâtiment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {buildingTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setBuildingType(type.id);
                      setConsumption(type.typical);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      buildingType === type.id
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-4 ${
                      buildingType === type.id ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                    <p className="text-center font-medium">{type.label}</p>
                  </button>
                );
              })}
            </div>

            {buildingType && (
              <div className="mt-8 space-y-4">
                <h4 className="font-medium text-gray-900">Consommation Électrique</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Consommation journalière (kWh)
                    </label>
                    <input
                      type="number"
                      value={consumption.daily}
                      onChange={(e) => setConsumption(prev => ({
                        ...prev,
                        daily: Number(e.target.value)
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Puissance maximale (kW)
                    </label>
                    <input
                      type="number"
                      value={consumption.peak}
                      onChange={(e) => setConsumption(prev => ({
                        ...prev,
                        peak: Number(e.target.value)
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return renderProductSection(solarPanels, <Sun className="h-6 w-6 text-yellow-600" />, "Panneaux Solaires");
      
      case 3:
        return renderProductSection(inverters, <Zap className="h-6 w-6 text-yellow-600" />, "Onduleurs");
      
      case 4:
        return renderProductSection(batteries, <Battery className="h-6 w-6 text-yellow-600" />, "Batteries");
      
      case 5:
        return renderProductSection(accessories, <Plug className="h-6 w-6 text-yellow-600" />, "Accessoires");
      
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Services Additionnels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={customizations.installation}
                    onChange={(e) => setCustomizations(prev => ({
                      ...prev,
                      installation: e.target.checked
                    }))}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>Installation professionnelle (+15%)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={customizations.monitoring}
                    onChange={(e) => setCustomizations(prev => ({
                      ...prev,
                      monitoring: e.target.checked
                    }))}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>Système de surveillance en temps réel (+750 USD)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={customizations.maintenance}
                    onChange={(e) => setCustomizations(prev => ({
                      ...prev,
                      maintenance: e.target.checked
                    }))}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>Contrat de maintenance annuel (+10%)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={customizations.insurance}
                    onChange={(e) => setCustomizations(prev => ({
                      ...prev,
                      insurance: e.target.checked
                    }))}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>Assurance équipement (+5%)</span>
                </label>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Spécifications du Système</h4>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Puissance totale:</span>
                    <span className="font-medium">{systemSpecs.totalPower.toLocaleString()}W</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Capacité de stockage:</span>
                    <span className="font-medium">{systemSpecs.storageCapacity.toLocaleString()}kWh</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Production journalière est.:</span>
                    <span className="font-medium">{systemSpecs.dailyProduction.toFixed(1)}kWh</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Autonomie backup:</span>
                    <span className="font-medium">{systemSpecs.backupTime.toFixed(1)}h</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Récapitulatif</h3>
            <div ref={quoteRef} className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-center mb-6">
                <Logo className="h-12 w-auto" />
              </div>
              
              <div className="space-y-6">
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Informations Client</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type de bâtiment:</span>
                      <span className="ml-2 font-medium">
                        {buildingTypes.find(t => t.id === buildingType)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Consommation journalière:</span>
                      <span className="ml-2 font-medium">{consumption.daily}kWh</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Puissance maximale:</span>
                      <span className="ml-2 font-medium">{consumption.peak}kW</span>
                    </div>
                  </div>
                </div>

                {[
                  { title: 'Panneaux Solaires', products: solarPanels },
                  { title: 'Onduleurs', products: inverters },
                  { title: 'Batteries', products: batteries },
                  { title: 'Accessoires', products: accessories }
                ].map((section) => (
                  <div key={section.title} className="border-b pb-4">
                    <h4 className="font-medium mb-2">{section.title}</h4>
                    {section.products.map((product) => {
                      const quantity = selectedProducts[product.id] || 0;
                      if (quantity > 0) {
                        return (
                          <div key={product.id} className="flex justify-between text-sm">
                            <span>{product.name} x{quantity}</span>
                            <span>{(product.price * quantity).toLocaleString()} USD</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-2">Services</h4>
                  {customizations.installation && (
                    <div className="flex justify-between text-sm">
                      <span>Installation professionnelle</span>
                      <span>{(totalCost * 0.15).toLocaleString()} USD</span>
                    </div>
                  )}
                  {customizations.monitoring && (
                    <div className="flex justify-between text-sm">
                      <span>Système de surveillance</span>
                      <span>750 USD</span>
                    </div>
                  )}
                  {customizations.maintenance && (
                    <div className="flex justify-between text-sm">
                      <span>Contrat de maintenance</span>
                      <span>{(totalCost * 0.10).toLocaleString()} USD</span>
                    </div>
                  )}
                  {customizations.insurance && (
                    <div className="flex justify-between text-sm">
                      <span>Assurance équipement</span>
                      <span>{(totalCost * 0.05).toLocaleString()} USD</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{totalCost.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Spécifications Techniques</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Puissance installée:</span>
                      <span className="ml-2 font-medium">{systemSpecs.totalPower.toLocaleString()}W</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Capacité de stockage:</span>
                      <span className="ml-2 font-medium">{systemSpecs.storageCapacity.toLocaleString()}kWh</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Production journalière est.:</span>
                      <span className="ml-2 font-medium">{systemSpecs.dailyProduction.toFixed(1)}kWh</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Autonomie backup:</span>
                      <span className="ml-2 font-medium">{systemSpecs.backupTime.toFixed(1)}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={downloadQuote}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 mr-4"
              >
                <Download className="h-5 w-5 mr-2" />
                Télécharger le devis
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Obtenir le devis
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
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
          <Calculator className="h-8 w-8 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">Calculateur de Devis - Énergie Solaire</h2>
        </div>
        <div className="text-sm text-gray-500">
          Étape {step} sur 7
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full mb-8">
        <div
          className="h-2 bg-yellow-600 rounded-full transition-all duration-500"
          style={{ width: `${(step / 7) * 100}%` }}
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
        {step < 7 && (
          <button
            onClick={() => setStep(prev => prev + 1)}
            className="ml-auto flex items-center px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EnergyQuoteCalculator;