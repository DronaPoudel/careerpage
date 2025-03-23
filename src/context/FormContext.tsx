
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the form data types
export interface PersonalInfo {
  name: string;
  nameNepali: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  passingYear: string;
  grade: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  designation: string;
  durationMonths: string;
  responsibilities: string;
}

export interface Preferences {
  jobPosition: 'Assistant' | 'Officer' | 'Manager' | '';
  expectedSalary: string;
  preferredLocation: string;
}

export interface Documents {
  nationalIdFront: File | null;
  nationalIdBack: File | null;
  nationalIdDetails: string;
}

export interface FormData {
  currentStep: number;
  personalInfo: PersonalInfo;
  educations: Education[];
  workExperiences: WorkExperience[];
  preferences: Preferences;
  documents: Documents;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: Record<string, string>;
}

// Define action types
type Action =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'REMOVE_WORK_EXPERIENCE'; payload: string }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<Preferences> }
  | { type: 'UPDATE_DOCUMENTS'; payload: Partial<Documents> }
  | { type: 'SET_IS_SUBMITTING'; payload: boolean }
  | { type: 'SET_IS_SUBMITTED'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'CLEAR_ERRORS' };

// Initial state
const initialState: FormData = {
  currentStep: 1,
  personalInfo: {
    name: '',
    nameNepali: '',
    dob: '',
    mobile: '',
    email: '',
    address: ''
  },
  educations: [],
  workExperiences: [],
  preferences: {
    jobPosition: '',
    expectedSalary: '',
    preferredLocation: ''
  },
  documents: {
    nationalIdFront: null,
    nationalIdBack: null,
    nationalIdDetails: ''
  },
  isSubmitting: false,
  isSubmitted: false,
  errors: {}
};

// Reducer function
const formReducer = (state: FormData, action: Action): FormData => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        educations: [...state.educations, action.payload]
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        educations: state.educations.map(education =>
          education.id === action.payload.id
            ? { ...education, ...action.payload.data }
            : education
        )
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        educations: state.educations.filter(education => education.id !== action.payload)
      };
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperiences: [...state.workExperiences, action.payload]
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperiences: state.workExperiences.map(workExp =>
          workExp.id === action.payload.id
            ? { ...workExp, ...action.payload.data }
            : workExp
        )
      };
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperiences: state.workExperiences.filter(workExp => workExp.id !== action.payload)
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'UPDATE_DOCUMENTS':
      return {
        ...state,
        documents: { ...state.documents, ...action.payload }
      };
    case 'SET_IS_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_IS_SUBMITTED':
      return { ...state, isSubmitted: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    default:
      return state;
  }
};

// Create context
interface FormContextType {
  state: FormData;
  dispatch: React.Dispatch<Action>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
