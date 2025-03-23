
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from '../context/FormContext';
import { submitApplication } from '../services/api';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FormLayout from '../components/form/FormLayout';
import PersonalInfoForm from '../components/form/PersonalInfoForm';
import EducationForm from '../components/form/EducationForm';
import WorkExperienceForm from '../components/form/WorkExperienceForm';
import PreferencesForm from '../components/form/PreferencesForm';
import DocumentUploadForm from '../components/form/DocumentUploadForm';
import FormSummary from '../components/form/FormSummary';

const FormSteps = [
  'Personal Information',
  'Education',
  'Work Experience',
  'Preferences',
  'Documents',
  'Summary'
];

const CareerFormContent: React.FC = () => {
  const { state, dispatch } = useForm();
  const { currentStep, isSubmitting } = state;
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < FormSteps.length) {
      dispatch({
        type: 'SET_CURRENT_STEP',
        payload: currentStep + 1
      });
      
      // Clear any existing errors
      dispatch({
        type: 'CLEAR_ERRORS'
      });
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch({
        type: 'SET_CURRENT_STEP',
        payload: currentStep - 1
      });
      
      // Clear any existing errors
      dispatch({
        type: 'CLEAR_ERRORS'
      });
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch({
        type: 'SET_IS_SUBMITTING',
        payload: true
      });
      
      // Submit the application
      const result = await submitApplication(state);
      
      if (result.success) {
        dispatch({
          type: 'SET_IS_SUBMITTED',
          payload: true
        });
        
        toast.success('Application submitted successfully!');
        
        // Navigate to success page with application ID
        navigate(`/success?id=${result.applicationId}`);
      } else {
        toast.error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch({
        type: 'SET_IS_SUBMITTING',
        payload: false
      });
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <WorkExperienceForm />;
      case 4:
        return <PreferencesForm />;
      case 5:
        return <DocumentUploadForm />;
      case 6:
        return <FormSummary />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <motion.div 
          className="container mx-auto px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nabil Bank Career Application</h1>
            <p className="text-gray-600">
              Complete the form below to apply for open positions at Nabil Bank
            </p>
          </div>
          
          <FormLayout
            steps={FormSteps}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          >
            {renderFormStep()}
          </FormLayout>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

const CareerForm: React.FC = () => {
  return (
    <FormProvider>
      <CareerFormContent />
    </FormProvider>
  );
};

export default CareerForm;
