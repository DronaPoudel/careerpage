
import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import CustomFormField from '../ui/CustomFormField';
import { validateDocuments } from '../../utils/validation';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const DocumentUploadForm: React.FC = () => {
  const { state, dispatch } = useForm();
  const { documents, errors } = state;
  
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Update form state
      dispatch({
        type: 'UPDATE_DOCUMENTS',
        payload: { [name]: file }
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        if (name === 'nationalIdFront') {
          setFrontPreview(reader.result as string);
        } else if (name === 'nationalIdBack') {
          setBackPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Validate documents
      const validationErrors = validateDocuments({
        ...documents,
        [name]: file
      });
      
      dispatch({
        type: 'SET_ERRORS',
        payload: validationErrors
      });
    }
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    dispatch({
      type: 'UPDATE_DOCUMENTS',
      payload: { [name]: value }
    });
  };
  
  const isValidFileType = (file: File | null) => {
    if (!file) return false;
    return ['image/jpeg', 'image/png'].includes(file.type);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Document Upload</h2>
        <p className="form-chip">Step 5 of 5</p>
      </div>
      
      <div className="glass-card p-5 rounded-xl">
        <h3 className="font-medium text-gray-900 mb-2">Important Instructions</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Upload clear, legible images of your National ID (front and back)</li>
          <li>Accepted formats: JPG, PNG</li>
          <li>Maximum file size: 5MB per image</li>
          <li>Ensure all details are clearly visible in the images</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CustomFormField 
            label="National ID (Front)" 
            htmlFor="nationalIdFront" 
            error={errors.nationalIdFront} 
            required
          >
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all duration-200 hover:bg-gray-50">
              {frontPreview ? (
                <div className="w-full">
                  <div className="relative">
                    <img 
                      src={frontPreview} 
                      alt="ID Front Preview" 
                      className="w-full h-40 object-contain rounded-lg mb-2"
                    />
                    {isValidFileType(documents.nationalIdFront) ? (
                      <CheckCircle className="absolute bottom-3 right-3 w-5 h-5 text-green-500 bg-white rounded-full" />
                    ) : (
                      <AlertCircle className="absolute bottom-3 right-3 w-5 h-5 text-red-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                      {documents.nationalIdFront?.name}
                    </span>
                    <label 
                      htmlFor="nationalIdFront" 
                      className="text-xs text-primary font-medium cursor-pointer"
                    >
                      Change
                    </label>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-sm text-center text-gray-600 mb-2">
                    Drag & drop an image or click to browse
                  </p>
                  <label 
                    htmlFor="nationalIdFront"
                    className="px-4 py-2 bg-primary text-white text-sm rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Upload Front
                  </label>
                </>
              )}
              <input
                id="nationalIdFront"
                name="nationalIdFront"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </div>
          </CustomFormField>
        </div>
        
        <div>
          <CustomFormField 
            label="National ID (Back)" 
            htmlFor="nationalIdBack" 
            error={errors.nationalIdBack} 
            required
          >
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all duration-200 hover:bg-gray-50">
              {backPreview ? (
                <div className="w-full">
                  <div className="relative">
                    <img 
                      src={backPreview} 
                      alt="ID Back Preview" 
                      className="w-full h-40 object-contain rounded-lg mb-2"
                    />
                    {isValidFileType(documents.nationalIdBack) ? (
                      <CheckCircle className="absolute bottom-3 right-3 w-5 h-5 text-green-500 bg-white rounded-full" />
                    ) : (
                      <AlertCircle className="absolute bottom-3 right-3 w-5 h-5 text-red-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                      {documents.nationalIdBack?.name}
                    </span>
                    <label 
                      htmlFor="nationalIdBack" 
                      className="text-xs text-primary font-medium cursor-pointer"
                    >
                      Change
                    </label>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-sm text-center text-gray-600 mb-2">
                    Drag & drop an image or click to browse
                  </p>
                  <label 
                    htmlFor="nationalIdBack"
                    className="px-4 py-2 bg-primary text-white text-sm rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Upload Back
                  </label>
                </>
              )}
              <input
                id="nationalIdBack"
                name="nationalIdBack"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </div>
          </CustomFormField>
        </div>
      </div>
      
      <CustomFormField 
        label="National ID Details (Optional)" 
        htmlFor="nationalIdDetails"
      >
        <textarea
          id="nationalIdDetails"
          name="nationalIdDetails"
          value={documents.nationalIdDetails}
          onChange={handleTextChange}
          placeholder="Add any additional details about your National ID (e.g. ID number, issuance date)"
          className="custom-input min-h-[120px]"
          rows={4}
        />
      </CustomFormField>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">OCR Processing Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                We use Optical Character Recognition (OCR) to extract information from your ID. 
                Please ensure your uploaded images are clear and all text is legible. 
                The extracted information will be used to verify your application details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
