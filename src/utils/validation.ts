
import { PersonalInfo, Education, WorkExperience, Preferences, Documents } from '../context/FormContext';

export const validatePersonalInfo = (data: PersonalInfo): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Name validation (alphabets only)
  if (!data.name) {
    errors.name = 'Name is required';
  } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
    errors.name = 'Name should contain alphabets only';
  }

  // Name in Nepali validation (optional)
  // No specific validation for Nepali characters

  // Date of Birth validation
  if (!data.dob) {
    errors.dob = 'Date of Birth is required';
  } else {
    const today = new Date();
    const birthDate = new Date(data.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18) {
      errors.dob = 'You must be at least 18 years old';
    } else if (age > 65) {
      errors.dob = 'Age exceeds the maximum limit';
    }
  }

  // Mobile number validation (10 digits)
  if (!data.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(data.mobile)) {
    errors.mobile = 'Mobile number must be 10 digits';
  }

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Address validation
  if (!data.address) {
    errors.address = 'Address is required';
  }

  return errors;
};

export const validateEducation = (data: Education): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Degree validation
  if (!data.degree) {
    errors.degree = 'Degree is required';
  }

  // Institution validation
  if (!data.institution) {
    errors.institution = 'Institution is required';
  }

  // Passing year validation
  if (!data.passingYear) {
    errors.passingYear = 'Passing year is required';
  } else {
    const year = parseInt(data.passingYear, 10);
    const currentYear = new Date().getFullYear();
    
    if (isNaN(year) || year < 1950 || year > currentYear) {
      errors.passingYear = `Year must be between 1950 and ${currentYear}`;
    }
  }

  // Grade validation
  if (!data.grade) {
    errors.grade = 'Grade is required';
  }

  return errors;
};

export const validateWorkExperience = (data: WorkExperience): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Company name validation
  if (!data.companyName) {
    errors.companyName = 'Company name is required';
  }

  // Designation validation
  if (!data.designation) {
    errors.designation = 'Designation is required';
  }

  // Duration validation
  if (!data.durationMonths) {
    errors.durationMonths = 'Duration is required';
  } else {
    const months = parseInt(data.durationMonths, 10);
    
    if (isNaN(months) || months <= 0) {
      errors.durationMonths = 'Duration must be a positive number';
    }
  }

  // No validation for responsibilities (optional)

  return errors;
};

export const validatePreferences = (data: Preferences): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Job position validation
  if (!data.jobPosition) {
    errors.jobPosition = 'Job position is required';
  }

  // Expected salary validation
  if (!data.expectedSalary) {
    errors.expectedSalary = 'Expected salary is required';
  } else {
    const salary = parseFloat(data.expectedSalary);
    
    if (isNaN(salary) || salary <= 0) {
      errors.expectedSalary = 'Salary must be a positive number';
    }
  }

  // Preferred location validation
  if (!data.preferredLocation) {
    errors.preferredLocation = 'Preferred location is required';
  }

  return errors;
};

export const validateDocuments = (data: Documents): Record<string, string> => {
  const errors: Record<string, string> = {};

  // National ID Front validation
  if (!data.nationalIdFront) {
    errors.nationalIdFront = 'National ID Front image is required';
  } else {
    const fileType = data.nationalIdFront.type;
    if (!['image/jpeg', 'image/png'].includes(fileType)) {
      errors.nationalIdFront = 'Only JPG and PNG files are allowed';
    }
    
    // File size validation (max 5MB)
    if (data.nationalIdFront.size > 5 * 1024 * 1024) {
      errors.nationalIdFront = 'File size should not exceed 5MB';
    }
  }

  // National ID Back validation
  if (!data.nationalIdBack) {
    errors.nationalIdBack = 'National ID Back image is required';
  } else {
    const fileType = data.nationalIdBack.type;
    if (!['image/jpeg', 'image/png'].includes(fileType)) {
      errors.nationalIdBack = 'Only JPG and PNG files are allowed';
    }
    
    // File size validation (max 5MB)
    if (data.nationalIdBack.size > 5 * 1024 * 1024) {
      errors.nationalIdBack = 'File size should not exceed 5MB';
    }
  }

  // National ID Details validation (optional)
  
  return errors;
};

export const isStepComplete = (step: number, state: any): boolean => {
  switch (step) {
    case 1: // Personal Info
      return Object.keys(validatePersonalInfo(state.personalInfo)).length === 0;
    case 2: // Education
      return state.educations.length > 0 && 
        state.educations.every((edu: Education) => Object.keys(validateEducation(edu)).length === 0);
    case 3: // Work Experience
      return state.workExperiences.length === 0 || 
        state.workExperiences.every((exp: WorkExperience) => 
          Object.keys(validateWorkExperience(exp)).length === 0);
    case 4: // Preferences
      return Object.keys(validatePreferences(state.preferences)).length === 0;
    case 5: // Documents
      return Object.keys(validateDocuments(state.documents)).length === 0;
    default:
      return false;
  }
};
