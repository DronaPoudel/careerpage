
import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import CustomFormField from '../ui/CustomFormField';
import { validateWorkExperience } from '../../utils/validation';
import { WorkExperience } from '../../context/FormContext';
import { Plus, X, PenLine, Briefcase } from 'lucide-react';

const WorkExperienceForm: React.FC = () => {
  const { state, dispatch } = useForm();
  const { workExperiences } = state;
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentExperience, setCurrentExperience] = useState<WorkExperience>({
    id: '',
    companyName: '',
    designation: '',
    durationMonths: '',
    responsibilities: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setCurrentExperience(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate current field
    const newErrors = {
      ...validationErrors,
      [name]: ''
    };
    
    if (!value && ['companyName', 'designation', 'durationMonths'].includes(name)) {
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    if (name === 'durationMonths' && value) {
      const months = parseInt(value, 10);
      
      if (isNaN(months) || months <= 0) {
        newErrors[name] = 'Duration must be a positive number';
      }
    }
    
    setValidationErrors(newErrors);
  };
  
  const handleAddExperience = () => {
    // Full validation before adding
    const errors = validateWorkExperience(currentExperience);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    const id = currentExperience.id || `exp-${Date.now()}`;
    
    if (editMode && editId) {
      dispatch({
        type: 'UPDATE_WORK_EXPERIENCE',
        payload: {
          id: editId,
          data: { ...currentExperience, id }
        }
      });
      
      setEditMode(false);
      setEditId(null);
    } else {
      dispatch({
        type: 'ADD_WORK_EXPERIENCE',
        payload: { ...currentExperience, id }
      });
    }
    
    // Reset the form
    setCurrentExperience({
      id: '',
      companyName: '',
      designation: '',
      durationMonths: '',
      responsibilities: ''
    });
    
    setValidationErrors({});
  };
  
  const handleEdit = (experience: WorkExperience) => {
    setCurrentExperience(experience);
    setEditMode(true);
    setEditId(experience.id);
  };
  
  const handleRemove = (id: string) => {
    dispatch({
      type: 'REMOVE_WORK_EXPERIENCE',
      payload: id
    });
  };
  
  const handleNoExperience = () => {
    // Clear all experiences and continue
    workExperiences.forEach(exp => {
      dispatch({
        type: 'REMOVE_WORK_EXPERIENCE',
        payload: exp.id
      });
    });
    
    // Move to next step
    dispatch({
      type: 'SET_CURRENT_STEP',
      payload: 4
    });
  };
  
  const hasErrors = Object.values(validationErrors).some(error => error);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
        <p className="form-chip">Step 3 of 5</p>
      </div>
      
      {workExperiences.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Added Work Experiences</h3>
          <div className="space-y-3">
            {workExperiences.map((experience) => (
              <div 
                key={experience.id}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{experience.designation} at {experience.companyName}</h4>
                  <p className="text-sm text-gray-600">
                    {experience.durationMonths} months
                  </p>
                  {experience.responsibilities && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {experience.responsibilities}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(experience)}
                    className="p-1.5 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Edit experience"
                  >
                    <PenLine className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(experience.id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Remove experience"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="glass-card p-5 rounded-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {editMode ? 'Edit Experience' : 'Add Experience'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField 
            label="Company Name" 
            htmlFor="companyName" 
            error={validationErrors.companyName} 
            required
          >
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={currentExperience.companyName}
              onChange={handleChange}
              placeholder="e.g. ABC Company"
              className="custom-input"
              required
            />
          </CustomFormField>
          
          <CustomFormField 
            label="Designation" 
            htmlFor="designation" 
            error={validationErrors.designation} 
            required
          >
            <input
              id="designation"
              name="designation"
              type="text"
              value={currentExperience.designation}
              onChange={handleChange}
              placeholder="e.g. Marketing Manager"
              className="custom-input"
              required
            />
          </CustomFormField>
        </div>
        
        <CustomFormField 
          label="Duration (in months)" 
          htmlFor="durationMonths" 
          error={validationErrors.durationMonths} 
          required
        >
          <input
            id="durationMonths"
            name="durationMonths"
            type="number"
            min="1"
            value={currentExperience.durationMonths}
            onChange={handleChange}
            placeholder="e.g. 24"
            className="custom-input"
            required
          />
        </CustomFormField>
        
        <CustomFormField 
          label="Responsibilities" 
          htmlFor="responsibilities"
        >
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={currentExperience.responsibilities}
            onChange={handleChange}
            placeholder="Describe your key responsibilities and achievements"
            className="custom-input min-h-[120px]"
            rows={4}
          />
        </CustomFormField>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleAddExperience}
            disabled={hasErrors}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white ${
              hasErrors 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90'
            } transition-colors`}
          >
            <Plus className="w-4 h-4" />
            <span>{editMode ? 'Update' : 'Add'} Experience</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">No work experience?</h3>
            <p className="text-sm text-gray-600">You can proceed to the next step</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleNoExperience}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Skip this step
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
