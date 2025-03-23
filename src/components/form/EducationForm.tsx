
import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import CustomFormField from '../ui/CustomFormField';
import { validateEducation } from '../../utils/validation';
import { Education } from '../../context/FormContext';
import { Plus, X, PenLine } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { state, dispatch } = useForm();
  const { educations, errors } = state;
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: '',
    degree: '',
    institution: '',
    passingYear: '',
    grade: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setCurrentEducation(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate current field
    const newErrors = {
      ...validationErrors,
      [name]: ''
    };
    
    if (!value && ['degree', 'institution', 'passingYear', 'grade'].includes(name)) {
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    if (name === 'passingYear' && value) {
      const year = parseInt(value, 10);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(year) || year < 1950 || year > currentYear) {
        newErrors[name] = `Year must be between 1950 and ${currentYear}`;
      }
    }
    
    setValidationErrors(newErrors);
  };
  
  const handleAddEducation = () => {
    // Full validation before adding
    const errors = validateEducation(currentEducation);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    const id = currentEducation.id || `edu-${Date.now()}`;
    
    if (editMode && editId) {
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: {
          id: editId,
          data: { ...currentEducation, id }
        }
      });
      
      setEditMode(false);
      setEditId(null);
    } else {
      dispatch({
        type: 'ADD_EDUCATION',
        payload: { ...currentEducation, id }
      });
    }
    
    // Reset the form
    setCurrentEducation({
      id: '',
      degree: '',
      institution: '',
      passingYear: '',
      grade: ''
    });
    
    setValidationErrors({});
  };
  
  const handleEdit = (education: Education) => {
    setCurrentEducation(education);
    setEditMode(true);
    setEditId(education.id);
  };
  
  const handleRemove = (id: string) => {
    dispatch({
      type: 'REMOVE_EDUCATION',
      payload: id
    });
  };
  
  const hasErrors = Object.values(validationErrors).some(error => error);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Educational Qualifications</h2>
        <p className="form-chip">Step 2 of 5</p>
      </div>
      
      {educations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Added Qualifications</h3>
          <div className="space-y-3">
            {educations.map((education) => (
              <div 
                key={education.id}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{education.degree}</h4>
                  <p className="text-sm text-gray-600">
                    {education.institution} • {education.passingYear} • Grade: {education.grade}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(education)}
                    className="p-1.5 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Edit education"
                  >
                    <PenLine className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(education.id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Remove education"
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
          {editMode ? 'Edit Qualification' : 'Add Qualification'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField 
            label="Degree/Qualification" 
            htmlFor="degree" 
            error={validationErrors.degree} 
            required
          >
            <input
              id="degree"
              name="degree"
              type="text"
              value={currentEducation.degree}
              onChange={handleChange}
              placeholder="e.g. Bachelor of Business Administration"
              className="custom-input"
              required
            />
          </CustomFormField>
          
          <CustomFormField 
            label="Institution" 
            htmlFor="institution" 
            error={validationErrors.institution} 
            required
          >
            <input
              id="institution"
              name="institution"
              type="text"
              value={currentEducation.institution}
              onChange={handleChange}
              placeholder="e.g. Tribhuvan University"
              className="custom-input"
              required
            />
          </CustomFormField>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField 
            label="Passing Year" 
            htmlFor="passingYear" 
            error={validationErrors.passingYear} 
            required
          >
            <input
              id="passingYear"
              name="passingYear"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={currentEducation.passingYear}
              onChange={handleChange}
              placeholder="e.g. 2020"
              className="custom-input"
              required
            />
          </CustomFormField>
          
          <CustomFormField 
            label="Grade/GPA" 
            htmlFor="grade" 
            error={validationErrors.grade} 
            required
          >
            <input
              id="grade"
              name="grade"
              type="text"
              value={currentEducation.grade}
              onChange={handleChange}
              placeholder="e.g. A or 3.5"
              className="custom-input"
              required
            />
          </CustomFormField>
        </div>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleAddEducation}
            disabled={hasErrors}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white ${
              hasErrors 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90'
            } transition-colors`}
          >
            <Plus className="w-4 h-4" />
            <span>{editMode ? 'Update' : 'Add'} Qualification</span>
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>Please add all relevant educational qualifications. At least one qualification is required.</p>
      </div>
    </div>
  );
};

export default EducationForm;
