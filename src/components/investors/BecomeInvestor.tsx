import React, { useState } from 'react';
import { Send, Building, User, Mail, Phone, Globe, Upload } from 'lucide-react';
import PaymentModal from './PaymentModal';
import ValidationSteps from './ValidationSteps';

const BecomeInvestor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    country: '',
    investmentAmount: '',
    interests: [] as string[],
    message: '',
    documents: {
      idCard: null as File | null,
      proofOfAddress: null as File | null,
      bankStatement: null as File | null,
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectors = [
    { id: 'tech', label: 'Technologies' },
    { id: 'agro', label: 'Agro-industrie' },
    { id: 'mobility', label: 'Mobilité' },
    { id: 'energies', label: 'Énergies Renouvelables' },
  ];

  const investmentRanges = [
    { value: '10k-50k', label: '10,000 - 50,000', amount: 10000 },
    { value: '50k-100k', label: '50,000 - 100,000', amount: 50000 },
    { value: '100k-500k', label: '100,000 - 500,000', amount: 100000 },
    { value: '500k+', label: '500,000+', amount: 500000 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'investmentAmount') {
      const range = investmentRanges.find(r => r.value === value);
      if (range) {
        setSelectedAmount(range.amount);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentType: keyof typeof formData.documents) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file,
      },
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.firstName) errors.push("Le prénom est requis");
        if (!formData.lastName) errors.push("Le nom est requis");
        if (!formData.email) errors.push("L'email est requis");
        if (!formData.phone) errors.push("Le numéro de téléphone est requis");
        break;
      case 2:
        if (!formData.company) errors.push("Le nom de l'entreprise est requis");
        if (!formData.position) errors.push("La fonction est requise");
        if (!formData.country) errors.push("Le pays est requis");
        break;
      case 3:
        if (!formData.investmentAmount) errors.push("Le montant d'investissement est requis");
        if (formData.interests.length === 0) errors.push("Sélectionnez au moins un secteur d'intérêt");
        break;
      case 4:
        if (!formData.documents.idCard) errors.push("La pièce d'identité est requise");
        if (!formData.documents.proofOfAddress) errors.push("Le justificatif de domicile est requis");
        if (!formData.documents.bankStatement) errors.push("Le relevé bancaire est requis");
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setValidationErrors([]);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowPayment(true);
    } catch (error) {
      setValidationErrors(['Une erreur est survenue lors de la vérification des documents.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (details: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        position: '',
        email: '',
        phone: '',
        country: '',
        investmentAmount: '',
        interests: [],
        message: '',
        documents: {
          idCard: null,
          proofOfAddress: null,
          bankStatement: null,
        },
      });
      
      setCurrentStep(1);
      setShowPayment(false);
      alert('Votre investissement a été traité avec succès. Notre équipe vous contactera prochainement.');
    } catch (error) {
      console.error('Error processing payment:', error);
      setValidationErrors(['Une erreur est survenue lors du traitement du paiement.']);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Entreprise
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Fonction
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Pays
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Montant d'investissement envisagé (USD)
              </label>
              <select
                id="investmentAmount"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Sélectionnez une fourchette</option>
                {investmentRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label} USD
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteurs d'intérêt
              </label>
              <div className="grid grid-cols-2 gap-4">
                {sectors.map((sector) => (
                  <div key={sector.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={sector.id}
                      name="interests"
                      value={sector.id}
                      checked={formData.interests.includes(sector.id)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={sector.id} className="ml-2 text-sm text-gray-700">
                      {sector.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optionnel)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Partagez-nous vos objectifs d'investissement..."
              ></textarea>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Documents requis
              </label>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="idCard" className="block text-sm text-gray-600 mb-2">
                    Pièce d'identité
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="idCard"
                      onChange={(e) => handleFileChange(e, 'idCard')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="idCard"
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <Upload className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formData.documents.idCard ? formData.documents.idCard.name : 'Choisir un fichier'}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="proofOfAddress" className="block text-sm text-gray-600 mb-2">
                    Justificatif de domicile
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="proofOfAddress"
                      onChange={(e) => handleFileChange(e, 'proofOfAddress')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="proofOfAddress"
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <Upload className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formData.documents.proofOfAddress ? formData.documents.proofOfAddress.name : 'Choisir un fichier'}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="bankStatement" className="block text-sm text-gray-600 mb-2">
                    Relevé bancaire
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="bankStatement"
                      onChange={(e) => handleFileChange(e, 'bankStatement')}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="bankStatement"
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <Upload className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formData.documents.bankStatement ? formData.documents.bankStatement.name : 'Choisir un fichier'}
                      </span>
                    </label>
                  </div>
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
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <Building className="h-8 w-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">Devenir Investisseur</h3>
      </div>

      <ValidationSteps currentStep={currentStep} />

      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 rounded-md">
          <ul className="list-disc list-inside text-red-600">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        {renderStepContent()}

        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Précédent
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Vérification en cours...
                </>
              ) : (
                <>
                  Procéder au paiement
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {showPayment && (
        <PaymentModal
          amount={selectedAmount}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default BecomeInvestor;