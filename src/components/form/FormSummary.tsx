
import React from 'react';
import { useForm } from '../../context/FormContext';
import { CheckCircle, Calendar, Phone, Mail, MapPin, GraduationCap, Briefcase, PenSquare, MapPinned, CreditCard } from 'lucide-react';

const FormSummary: React.FC = () => {
  const { state } = useForm();
  const { personalInfo, educations, workExperiences, preferences } = state;

  return (
    <div className="space-y-6">
      <div className="space-y-2 flex flex-col items-center text-center mb-6">
        <div className="p-3 bg-green-50 rounded-full mb-2">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Application Summary</h2>
        <p className="text-gray-600 max-w-md">
          Please review your information before submitting your application
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <PenSquare className="w-5 h-5 mr-2 text-primary" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{personalInfo.name}</p>
            </div>
            
            {personalInfo.nameNepali && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Name in Nepali</p>
                <p className="font-medium">{personalInfo.nameNepali}</p>
              </div>
            )}
            
            <div className="space-y-1 flex items-start">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{personalInfo.dob}</p>
              </div>
            </div>
            
            <div className="space-y-1 flex items-start">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{personalInfo.mobile}</p>
              </div>
            </div>
            
            <div className="space-y-1 flex items-start">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{personalInfo.email}</p>
              </div>
            </div>
            
            <div className="space-y-1 flex items-start">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{personalInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-primary" />
            Educational Qualifications
          </h3>
          
          <div className="space-y-4">
            {educations.map((education, index) => (
              <div key={education.id} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{education.degree}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="text-gray-500">Institution:</span> {education.institution}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-gray-500">Year:</span> {education.passingYear}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-gray-500">Grade:</span> {education.grade}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-primary" />
            Work Experience
          </h3>
          
          {workExperiences.length > 0 ? (
            <div className="space-y-4">
              {workExperiences.map((experience, index) => (
                <div key={experience.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{experience.designation} at {experience.companyName}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-gray-500">Duration:</span> {experience.durationMonths} months
                  </p>
                  {experience.responsibilities && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="text-gray-500">Responsibilities:</span> {experience.responsibilities}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No work experience added</p>
          )}
        </div>
        
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MapPinned className="w-5 h-5 mr-2 text-primary" />
            Job Preferences
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Preferred Position</p>
              <p className="font-medium">{preferences.jobPosition}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Expected Salary</p>
              <p className="font-medium">NPR {parseInt(preferences.expectedSalary).toLocaleString()}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Preferred Location</p>
              <p className="font-medium">{preferences.preferredLocation}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary" />
            Document Uploads
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">National ID (Front)</p>
              <p className="font-medium text-green-600">Uploaded</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">National ID (Back)</p>
              <p className="font-medium text-green-600">Uploaded</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          By submitting this application, you confirm that all the information provided is true and accurate.
          Nabil Bank reserves the right to verify the information and take appropriate action if any information
          is found to be false or misleading.
        </p>
      </div>
    </div>
  );
};

export default FormSummary;
