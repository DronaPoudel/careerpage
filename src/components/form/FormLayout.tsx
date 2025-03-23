
import React, { ReactNode } from 'react';
import FormProgress from '../ui/FormProgress';
import { useForm } from '../../context/FormContext';
import { isStepComplete } from '../../utils/validation';
import { motion, AnimatePresence } from 'framer-motion';

interface FormLayoutProps {
  children: ReactNode;
  steps: string[];
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  steps,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const { state } = useForm();
  const { currentStep } = state;
  
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;
  const canProceed = isStepComplete(currentStep, state);

  return (
    <div className="form-container animate-fade-in">
      <FormProgress steps={steps} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="form-step"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`btn-outline ${
            isFirstStep ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canProceed || state.isSubmitting}
            className={`btn-primary ${
              !canProceed || state.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {state.isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={`btn-primary ${
              !canProceed ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FormLayout;
