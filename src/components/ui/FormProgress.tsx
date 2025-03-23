
import React from 'react';
import { useForm } from '../../context/FormContext';
import { isStepComplete } from '../../utils/validation';
import { CheckIcon } from 'lucide-react';

interface FormProgressProps {
  steps: string[];
}

const FormProgress: React.FC<FormProgressProps> = ({ steps }) => {
  const { state } = useForm();
  const { currentStep } = state;

  return (
    <div className="w-full mb-8 overflow-hidden">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep || 
            (stepNumber === currentStep && isStepComplete(stepNumber, state));
          
          return (
            <React.Fragment key={stepNumber}>
              {index > 0 && (
                <div className={`flex-1 hidden sm:flex items-center ${isCompleted ? 'bg-primary' : 'bg-gray-200'} h-0.5 mx-2 transition-colors duration-300`} />
              )}
              
              <div className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-primary text-primary' 
                      : isCompleted 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  isActive ? 'text-primary' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                } transition-colors duration-300`}>
                  {step}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;
