import React from 'react';
import { Check } from 'lucide-react';

interface ValidationStepsProps {
  currentStep: number;
}

const ValidationSteps: React.FC<ValidationStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Informations Personnelles' },
    { number: 2, title: 'Informations Professionnelles' },
    { number: 3, title: 'Détails de l\'Investissement' },
    { number: 4, title: 'Documents Requis' },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex flex-col items-center flex-1">
            {index !== 0 && (
              <div
                className={`absolute left-0 top-5 -translate-y-1/2 h-0.5 w-full ${
                  step.number <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
            <div
              className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.number < currentStep
                  ? 'bg-blue-600 border-blue-600'
                  : step.number === currentStep
                  ? 'border-blue-600 text-blue-600'
                  : 'border-gray-200 text-gray-400'
              }`}
            >
              {step.number < currentStep ? (
                <Check className={`w-6 h-6 text-white`} />
              ) : (
                <span className={step.number === currentStep ? 'text-blue-600' : ''}>
                  {step.number}
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-center">
              <span className={step.number === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidationSteps;