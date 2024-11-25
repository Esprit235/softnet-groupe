import React, { useState, useEffect, useRef } from 'react';
import { Camera, HardDrive, Monitor, Server, Calculator, ArrowRight, Download, Wrench } from 'lucide-react';
import Logo from '../Logo';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface SurveillanceQuoteCalculatorProps {
  onSubmit: (data: any) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const SurveillanceQuoteCalculator: React.FC<SurveillanceQuoteCalculatorProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({});
  const [totalCost, setTotalCost] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Liste complète des caméras Hikvision
  const cameras: Product[] = [
    { id: 'cam_2mp_dome', name: 'Caméra Dôme 2MP', price: 75, description: 'Hikvision DS-2CD2123G0-I' },
    { id: 'cam_2mp_bullet', name: 'Caméra Bullet 2MP', price: 82.5, description: 'Hikvision DS-2CD2T23G0-I5' },
    { id: 'cam_4mp_dome', name: 'Caméra Dôme 4MP', price: 112.5, description: 'Hikvision DS-2CD2143G0-I' },
    { id: 'cam_4mp_bullet', name: 'Caméra Bullet 4MP', price: 120, description: 'Hikvision DS-2CD2T43G0-I5' },
    { id: 'cam_8mp_dome', name: 'Caméra Dôme 8MP', price: 187.5, description: 'Hikvision DS-2CD2183G0-I' },
    { id: 'cam_8mp_bullet', name: 'Caméra Bullet 8MP', price: 195, description: 'Hikvision DS-2CD2T83G0-I5' },
    { id: 'cam_ptz_2mp', name: 'Caméra PTZ 2MP', price: 375, description: 'Hikvision DS-2DE4225IW-DE' },
    { id: 'cam_ptz_4mp', name: 'Caméra PTZ 4MP', price: 487.5, description: 'Hikvision DS-2DE4425IW-DE' }
  ];

  // Liste complète des NVRs Hikvision
  const nvrs: Product[] = [
    { id: 'nvr_8ch', name: 'NVR 8 canaux', price: 187.5, description: 'Hikvision DS-7608NI-K2' },
    { id: 'nvr_16ch', name: 'NVR 16 canaux', price: 262.5, description: 'Hikvision DS-7616NI-K2' },
    { id: 'nvr_32ch', name: 'NVR 32 canaux', price: 487.5, description: 'Hikvision DS-7732NI-K4' },
    { id: 'nvr_64ch', name: 'NVR 64 canaux', price: 750, description: 'Hikvision DS-9664NI-I8' },
    { id: 'nvr_128ch', name: 'NVR 128 canaux', price: 1125, description: 'Hikvision DS-96128NI-I16' },
    { id: 'nvr_256ch', name: 'NVR 256 canaux', price: 1875, description: 'Hikvision DS-96256NI-I24' }
  ];

  // Liste complète des disques durs surveillance
  const hardDrives: Product[] = [
    { id: 'hdd_1tb', name: 'Disque Dur 1TB', price: 52.5, description: 'WD Purple Surveillance' },
    { id: 'hdd_2tb', name: 'Disque Dur 2TB', price: 75, description: 'WD Purple Surveillance' },
    { id: 'hdd_4tb', name: 'Disque Dur 4TB', price: 112.5, description: 'WD Purple Surveillance' },
    { id: 'hdd_6tb', name: 'Disque Dur 6TB', price: 150, description: 'WD Purple Surveillance' },
    { id: 'hdd_8tb', name: 'Disque Dur 8TB', price: 225, description: 'WD Purple Surveillance' },
    { id: 'hdd_10tb', name: 'Disque Dur 10TB', price: 300, description: 'WD Purple Surveillance' },
    { id: 'hdd_12tb', name: 'Disque Dur 12TB', price: 375, description: 'WD Purple Surveillance' },
    { id: 'hdd_14tb', name: 'Disque Dur 14TB', price: 450, description: 'WD Purple Surveillance' }
  ];

  // Liste complète des écrans professionnels
  const monitors: Product[] = [
    { id: 'mon_32', name: 'Écran 32"', price: 300, description: 'Moniteur professionnel Full HD' },
    { id: 'mon_43', name: 'Écran 43"', price: 450, description: 'Moniteur professionnel 4K' },
    { id: 'mon_55', name: 'Écran 55"', price: 600, description: 'Moniteur professionnel 4K' },
    { id: 'mon_65', name: 'Écran 65"', price: 750, description: 'Moniteur professionnel 4K' },
    { id: 'mon_75', name: 'Écran 75"', price: 1125, description: 'Moniteur professionnel 4K' },
    { id: 'mon_85', name: 'Écran 85"', price: 1500, description: 'Moniteur professionnel 4K' }
  ];

  // Liste des accessoires
  const accessories: Product[] = [
    { id: 'switch_8p', name: 'Switch PoE 8 ports', price: 112.5, description: 'Hikvision DS-3E0109P-E/M' },
    { id: 'switch_16p', name: 'Switch PoE 16 ports', price: 187.5, description: 'Hikvision DS-3E0318P-E/M' },
    { id: 'switch_24p', name: 'Switch PoE 24 ports', price: 262.5, description: 'Hikvision DS-3E0326P-E/M' },
    { id: 'cable_cat6', name: 'Câble CAT6 (305m)', price: 112.5, description: 'Câble réseau extérieur' },
    { id: 'ups_1kva', name: 'UPS 1KVA', price: 225, description: 'Onduleur ligne-interactive' },
    { id: 'ups_2kva', name: 'UPS 2KVA', price: 375, description: 'Onduleur ligne-interactive' },
    { id: 'ups_3kva', name: 'UPS 3KVA', price: 562.5, description: 'Onduleur ligne-interactive' },
    { id: 'rack_6u', name: 'Rack 6U', price: 75, description: 'Armoire murale 6U' },
    { id: 'rack_9u', name: 'Rack 9U', price: 112.5, description: 'Armoire murale 9U' },
    { id: 'rack_12u', name: 'Rack 12U', price: 150, description: 'Armoire murale 12U' }
  ];

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const product = [...cameras, ...nvrs, ...hardDrives, ...monitors, ...accessories]
        .find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
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
      pdf.save('devis-surveillance.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      selectedProducts,
      totalCost,
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
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
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

  useEffect(() => {
    calculateTotal();
  }, [selectedProducts]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderProductSection(cameras, <Camera className="h-6 w-6 text-blue-600" />, "Caméras IP");
      case 2:
        return renderProductSection(nvrs, <Server className="h-6 w-6 text-blue-600" />, "NVRs");
      case 3:
        return renderProductSection(hardDrives, <HardDrive className="h-6 w-6 text-blue-600" />, "Disques Durs");
      case 4:
        return renderProductSection(monitors, <Monitor className="h-6 w-6 text-blue-600" />, "Écrans");
      case 5:
        return renderProductSection(accessories, <Wrench className="h-6 w-6 text-blue-600" />, "Accessoires");
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Récapitulatif</h3>
            <div ref={quoteRef} className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-center mb-6">
                <Logo className="h-12 w-auto" />
              </div>
              
              <div className="space-y-6">
                {[
                  { title: 'Caméras', products: cameras },
                  { title: 'NVRs', products: nvrs },
                  { title: 'Disques Durs', products: hardDrives },
                  { title: 'Écrans', products: monitors },
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
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{totalCost.toLocaleString()} USD</span>
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
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
          <Calculator className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Calculateur de Devis - Vidéosurveillance</h2>
        </div>
        <div className="text-sm text-gray-500">
          Étape {step} sur 6
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full mb-8">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${(step / 6) * 100}%` }}
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
        {step < 6 && (
          <button
            onClick={() => setStep(prev => prev + 1)}
            className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveillanceQuoteCalculator;