
import React from 'react';

interface CustomFormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  label,
  htmlFor,
  error,
  required = false,
  className = '',
  children
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={htmlFor} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      {error && (
        <p className="mt-1 text-sm text-red-500 animate-slide-up">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomFormField;
