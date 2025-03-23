
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchApplications, getApplicationDetails, updateApplicationStatus } from '../services/api';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, AlertCircle, Download, User, Mail, Calendar, Building, FileText, Check } from 'lucide-react';

const Admin: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentApplication, setCurrentApplication] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  
  // Fetch applications on component mount
  useEffect(() => {
    const getApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    
    getApplications();
  }, []);
  
  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || app.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // View application details
  const handleViewDetails = async (id: string) => {
    try {
      const details = await getApplicationDetails(id);
      if (details) {
        setCurrentApplication(details);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching application details:', error);
      toast.error('Failed to load application details');
    }
  };
  
  // Update application status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      setUpdatingStatus(true);
      const success = await updateApplicationStatus(id, status);
      
      if (success) {
        // Update local state
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status } : app
        ));
        
        if (currentApplication && currentApplication.id === id) {
          setCurrentApplication({ ...currentApplication, status });
        }
        
        toast.success(`Application status updated to ${status}`);
      } else {
        toast.error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating status');
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';
    let icon = <Clock className="w-4 h-4 mr-1" />;
    
    switch (status.toLowerCase()) {
      case 'pending':
        bgColor = 'bg-yellow-50';
        textColor = 'text-yellow-700';
        icon = <Clock className="w-4 h-4 mr-1" />;
        break;
      case 'reviewed':
        bgColor = 'bg-blue-50';
        textColor = 'text-blue-700';
        icon = <Eye className="w-4 h-4 mr-1" />;
        break;
      case 'shortlisted':
        bgColor = 'bg-green-50';
        textColor = 'text-green-700';
        icon = <CheckCircle className="w-4 h-4 mr-1" />;
        break;
      case 'rejected':
        bgColor = 'bg-red-50';
        textColor = 'text-red-700';
        icon = <XCircle className="w-4 h-4 mr-1" />;
        break;
      default:
        icon = <AlertCircle className="w-4 h-4 mr-1" />;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {icon}
        {status}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">
                  Manage and review all job applications
                </p>
              </div>
              
              <button className="mt-4 md:mt-0 btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Export Applications
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, email, or ID"
                      className="custom-input pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      className="custom-input"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">Loading applications...</p>
                  </div>
                ) : filteredApplications.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredApplications.map((application) => (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{application.name}</div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {application.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{application.position}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={application.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(application.submittedAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(application.id)}
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">No applications found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { 
                    label: 'Total Applications', 
                    value: applications.length,
                    icon: <FileText className="w-5 h-5 text-blue-500" />,
                    color: 'bg-blue-50'
                  },
                  { 
                    label: 'Pending Review', 
                    value: applications.filter(app => app.status === 'Pending').length,
                    icon: <Clock className="w-5 h-5 text-yellow-500" />,
                    color: 'bg-yellow-50'
                  },
                  { 
                    label: 'Shortlisted', 
                    value: applications.filter(app => app.status === 'Shortlisted').length,
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    color: 'bg-green-50'
                  },
                  { 
                    label: 'Rejected', 
                    value: applications.filter(app => app.status === 'Rejected').length,
                    icon: <XCircle className="w-5 h-5 text-red-500" />,
                    color: 'bg-red-50'
                  }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center">
                      <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Application Details Modal */}
      {showModal && currentApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Application Details
                      </h3>
                      <StatusBadge status={currentApplication.status} />
                    </div>
                    
                    <div className="mt-4 space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <User className="w-5 h-5 text-gray-400 mr-2" />
                          <h4 className="font-medium text-gray-900">Personal Information</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{currentApplication.personalInfo.name}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{currentApplication.personalInfo.email}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{currentApplication.personalInfo.mobile}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium">{currentApplication.personalInfo.dob}</p>
                          </div>
                          
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{currentApplication.personalInfo.address}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Building className="w-5 h-5 text-gray-400 mr-2" />
                          <h4 className="font-medium text-gray-900">Job Preferences</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Position</p>
                            <p className="font-medium">{currentApplication.preferences.jobPosition}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Expected Salary</p>
                            <p className="font-medium">NPR {parseInt(currentApplication.preferences.expectedSalary).toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{currentApplication.preferences.preferredLocation}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* More sections for education, experience, etc. can be added here */}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleUpdateStatus(currentApplication.id, 'Shortlisted')}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Shortlist
                  </button>
                  
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleUpdateStatus(currentApplication.id, 'Rejected')}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 sm:mt-0 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Admin;
