
import { FormData } from '../context/FormContext';
import { toast } from 'sonner';

// Simulate API endpoints for form submission
export const submitApplication = async (formData: FormData): Promise<{ success: boolean; message: string; applicationId?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate OCR processing for ID documents
    const ocrResult = await processOCR(formData.documents.nationalIdFront);
    
    // For demo purposes, we'll just return a success response
    // In a real implementation, you would send this data to your backend
    console.log('Form submitted:', formData);
    console.log('OCR result:', ocrResult);
    
    return {
      success: true,
      message: 'Application submitted successfully',
      applicationId: 'APP-' + Math.floor(100000 + Math.random() * 900000)
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: 'Failed to submit application. Please try again later.'
    };
  }
};

// Mock function to simulate OCR processing
const processOCR = async (file: File | null): Promise<any> => {
  if (!file) return null;
  
  // Simulate OCR processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock OCR result
  return {
    idNumber: 'ID' + Math.floor(10000000 + Math.random() * 90000000),
    name: 'Detected Name',
    dateOfIssue: '2020-01-01',
    dateOfExpiry: '2030-01-01'
  };
};

// Mock function to fetch applications for admin panel
export const fetchApplications = async (): Promise<any[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return [
      {
        id: 'APP-123456',
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Officer',
        status: 'Pending',
        submittedAt: '2023-06-15T10:30:00Z'
      },
      {
        id: 'APP-234567',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        position: 'Manager',
        status: 'Reviewed',
        submittedAt: '2023-06-14T09:15:00Z'
      },
      {
        id: 'APP-345678',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        position: 'Assistant',
        status: 'Rejected',
        submittedAt: '2023-06-13T14:45:00Z'
      },
      {
        id: 'APP-456789',
        name: 'Emily Williams',
        email: 'emily.williams@example.com',
        position: 'Officer',
        status: 'Shortlisted',
        submittedAt: '2023-06-12T11:20:00Z'
      },
      {
        id: 'APP-567890',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        position: 'Manager',
        status: 'Pending',
        submittedAt: '2023-06-11T16:00:00Z'
      }
    ];
  } catch (error) {
    console.error('Error fetching applications:', error);
    toast.error('Failed to fetch applications');
    return [];
  }
};

// Mock function to get application details
export const getApplicationDetails = async (id: string): Promise<any> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data for the requested application
    const mockApplications = await fetchApplications();
    const application = mockApplications.find(app => app.id === id);
    
    if (!application) {
      throw new Error('Application not found');
    }
    
    // Add more detailed information
    return {
      ...application,
      personalInfo: {
        name: application.name,
        nameNepali: 'नाम थर',
        dob: '1990-01-01',
        mobile: '9876543210',
        email: application.email,
        address: 'Kathmandu, Nepal'
      },
      educations: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Business Administration',
          institution: 'Tribhuvan University',
          passingYear: '2018',
          grade: 'A'
        }
      ],
      workExperiences: [
        {
          id: 'exp-1',
          companyName: 'ABC Company',
          designation: 'Junior Officer',
          durationMonths: '24',
          responsibilities: 'Handled customer service and administrative tasks'
        }
      ],
      preferences: {
        jobPosition: application.position,
        expectedSalary: '50000',
        preferredLocation: 'Kathmandu'
      },
      documents: {
        nationalIdFront: 'id-front.jpg',
        nationalIdBack: 'id-back.jpg',
        nationalIdDetails: 'ID number: 12345678'
      }
    };
  } catch (error) {
    console.error('Error fetching application details:', error);
    toast.error('Failed to fetch application details');
    return null;
  }
};

// Mock function to update application status
export const updateApplicationStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Updated application ${id} status to ${status}`);
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    return false;
  }
};
