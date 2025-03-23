
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Clock, ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Success: React.FC = () => {
  const location = useLocation();
  const applicationId = new URLSearchParams(location.search).get('id') || 'APP-000000';
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-primary/5 p-8 text-center border-b border-gray-100">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mx-auto mb-6 w-20 h-20 bg-green-50 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
                <p className="text-gray-600 mb-4">
                  Your application has been successfully received and is now being processed.
                </p>
                
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-800">
                  Application ID: <span className="text-primary">{applicationId}</span>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Application Review</h3>
                      <p className="text-gray-600 text-sm">
                        Our HR team will review your application and qualifications.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Initial Screening</h3>
                      <p className="text-gray-600 text-sm">
                        If shortlisted, you'll be contacted for an initial phone or online interview.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">In-person Interview</h3>
                      <p className="text-gray-600 text-sm">
                        Successful candidates will be invited for an in-person interview at our office.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-start">
                  <Clock className="flex-shrink-0 w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <p className="text-sm text-gray-600">
                    The review process typically takes 2-3 weeks. We appreciate your patience during this time.
                    You can check your application status with the application ID provided above.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <FileText className="flex-shrink-0 w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      We've sent an email confirmation with your application details to the email address you provided.
                      If you don't receive it within 24 hours, please check your spam folder.
                    </p>
                    <a href="#" className="text-sm text-primary font-medium flex items-center">
                      Contact support <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/"
                    className="btn-primary"
                  >
                    Return to Home
                  </Link>
                  
                  <Link
                    to="/admin"
                    className="btn-outline"
                  >
                    Go to Admin Panel
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
