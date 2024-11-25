import React, { useState } from 'react';
import { Send, Upload, Briefcase, GraduationCap, User, Mail, Phone, FileText } from 'lucide-react';

interface JoinFormProps {
  onSubmit?: (data: any) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ onSubmit }) => {
  const [formType, setFormType] = useState<'membership' | 'recruitment' | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    position: '',
    motivation: '',
    cv: null as File | null,
    interests: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cv: file }));
    }
  };

  if (!formType) {
    return (
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Rejoignez-nous</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setFormType('membership')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Adhésion</h4>
            <p className="text-gray-600 text-sm">
              Devenez membre de notre réseau et bénéficiez de nos services
            </p>
          </button>
          <button
            onClick={() => setFormType('recruitment')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Recrutement</h4>
            <p className="text-gray-600 text-sm">
              Rejoignez notre équipe et participez à notre mission
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">
          {formType === 'membership' ? 'Formulaire d\'adhésion' : 'Candidature'}
        </h3>
        <button
          onClick={() => setFormType(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {formType === 'recruitment' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Formation
              </label>
              <textarea
                rows={3}
                required
                value={formData.education}
                onChange={e => setFormData(prev => ({ ...prev, education: e.target.value }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez votre parcours académique..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expérience professionnelle
              </label>
              <textarea
                rows={3}
                required
                value={formData.experience}
                onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez votre expérience professionnelle..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CV
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="cv-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Télécharger un fichier</span>
                      <input
                        id="cv-upload"
                        name="cv-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC jusqu'à 10MB</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formType === 'membership' ? 'Motivation' : 'Lettre de motivation'}
          </label>
          <textarea
            rows={4}
            required
            value={formData.motivation}
            onChange={e => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={formType === 'membership' 
              ? 'Pourquoi souhaitez-vous rejoindre notre réseau ?'
              : 'Pourquoi souhaitez-vous rejoindre notre équipe ?'
            }
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Envoyer
            <Send className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;