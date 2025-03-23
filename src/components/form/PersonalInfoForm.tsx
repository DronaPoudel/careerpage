
import React from 'react';
import { useForm } from '../../context/FormContext';
import CustomFormField from '../ui/CustomFormField';
import { validatePersonalInfo } from '../../utils/validation';

const PersonalInfoForm: React.FC = () => {
  const { state, dispatch } = useForm();
  const { personalInfo, errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [name]: value }
    });
    
    // Validate after change
    const validationErrors = validatePersonalInfo({
      ...personalInfo,
      [name]: value
    });
    
    dispatch({
      type: 'SET_ERRORS',
      payload: validationErrors
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
        <p className="form-chip">Step 1 of 5</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField 
          label="Full Name" 
          htmlFor="name" 
          error={errors.name} 
          required
        >
          <input
            id="name"
            name="name"
            type="text"
            value={personalInfo.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="custom-input"
            required
          />
        </CustomFormField>
        
        <CustomFormField 
          label="Name in Nepali (देवनागरी)" 
          htmlFor="nameNepali"
        >
          <input
            id="nameNepali"
            name="nameNepali"
            type="text"
            value={personalInfo.nameNepali}
            onChange={handleChange}
            placeholder="Enter your name in Nepali"
            className="custom-input"
          />
        </CustomFormField>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField 
          label="Date of Birth" 
          htmlFor="dob" 
          error={errors.dob} 
          required
        >
          <input
            id="dob"
            name="dob"
            type="date"
            value={personalInfo.dob}
            onChange={handleChange}
            className="custom-input"
            required
          />
        </CustomFormField>
        
        <CustomFormField 
          label="Mobile Number" 
          htmlFor="mobile" 
          error={errors.mobile} 
          required
        >
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={personalInfo.mobile}
            onChange={handleChange}
            placeholder="Enter 10 digit mobile number"
            className="custom-input"
            maxLength={10}
            required
          />
        </CustomFormField>
      </div>
      
      <CustomFormField 
        label="Email Address" 
        htmlFor="email" 
        error={errors.email} 
        required
      >
        <input
          id="email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="custom-input"
          required
        />
      </CustomFormField>
      
      <CustomFormField 
        label="Address" 
        htmlFor="address" 
        error={errors.address} 
        required
      >
        <input
          id="address"
          name="address"
          type="text"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder="Enter your current address"
          className="custom-input"
          required
        />
      </CustomFormField>
    </div>
  );
};

export default PersonalInfoForm;
