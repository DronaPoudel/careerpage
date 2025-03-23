
import React from 'react';
import { useForm } from '../../context/FormContext';
import CustomFormField from '../ui/CustomFormField';
import { validatePreferences } from '../../utils/validation';

const PreferencesForm: React.FC = () => {
  const { state, dispatch } = useForm();
  const { preferences, errors } = state;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { [name]: value }
    });
    
    // Validate all preferences
    const validationErrors = validatePreferences({
      ...preferences,
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
        <h2 className="text-2xl font-semibold text-gray-900">Job Preferences</h2>
        <p className="form-chip">Step 4 of 5</p>
      </div>
      
      <CustomFormField 
        label="Preferred Job Position" 
        htmlFor="jobPosition" 
        error={errors.jobPosition} 
        required
      >
        <select
          id="jobPosition"
          name="jobPosition"
          value={preferences.jobPosition}
          onChange={handleChange}
          className="custom-input"
          required
        >
          <option value="" disabled>Select a position</option>
          <option value="Assistant">Assistant</option>
          <option value="Officer">Officer</option>
          <option value="Manager">Manager</option>
        </select>
      </CustomFormField>
      
      <CustomFormField 
        label="Expected Salary (NPR)" 
        htmlFor="expectedSalary" 
        error={errors.expectedSalary} 
        required
      >
        <input
          id="expectedSalary"
          name="expectedSalary"
          type="number"
          min="0"
          step="1000"
          value={preferences.expectedSalary}
          onChange={handleChange}
          placeholder="e.g. 50000"
          className="custom-input"
          required
        />
      </CustomFormField>
      
      <CustomFormField 
        label="Preferred Location" 
        htmlFor="preferredLocation" 
        error={errors.preferredLocation} 
        required
      >
        <input
          id="preferredLocation"
          name="preferredLocation"
          type="text"
          value={preferences.preferredLocation}
          onChange={handleChange}
          placeholder="e.g. Kathmandu"
          className="custom-input"
          required
        />
      </CustomFormField>
      
      <div className="glass-card p-5 rounded-xl mt-6">
        <h3 className="font-medium text-gray-900 mb-2">Salary Expectations</h3>
        <p className="text-sm text-gray-600">
          Please provide your realistic salary expectations. This helps us match you with appropriate positions.
          The salary should be mentioned in Nepalese Rupees (NPR).
        </p>
      </div>
      
      <div className="glass-card p-5 rounded-xl">
        <h3 className="font-medium text-gray-900 mb-2">Location Preferences</h3>
        <p className="text-sm text-gray-600">
          Indicate your preferred work location. If you're flexible, you can mention multiple locations 
          separated by commas, or simply write "Flexible".
        </p>
      </div>
    </div>
  );
};

export default PreferencesForm;
