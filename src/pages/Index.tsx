
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight, Briefcase, CreditCard, Users, Building, CheckCircle } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Start Your Career with Nabil Bank
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join one of Nepal's leading financial institutions. We're looking for talented individuals to grow with us.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link
                  to="/career-form"
                  className="btn-primary flex items-center space-x-2 transition-transform hover:scale-105"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <a
                  href="#positions"
                  className="btn-outline flex items-center space-x-2"
                >
                  <span>View Positions</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Nabil Bank?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer more than just a job. Discover the benefits of building your career with us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Building className="w-10 h-10 text-primary" />,
                  title: 'Established Legacy',
                  description: 'Join a bank with over 35 years of trusted service in Nepal\'s financial sector.'
                },
                {
                  icon: <CreditCard className="w-10 h-10 text-primary" />,
                  title: 'Competitive Benefits',
                  description: 'Enjoy attractive compensation packages, health benefits, and retirement plans.'
                },
                {
                  icon: <Users className="w-10 h-10 text-primary" />,
                  title: 'Growth Opportunities',
                  description: 'Develop your career with continuous learning and advancement possibilities.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section id="positions" className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our current vacancies and find the role that matches your skills and aspirations.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  title: 'Assistant Relationship Manager',
                  department: 'Retail Banking',
                  location: 'Kathmandu',
                  type: 'Full-time'
                },
                {
                  title: 'Branch Operations Officer',
                  department: 'Operations',
                  location: 'Pokhara',
                  type: 'Full-time'
                },
                {
                  title: 'Digital Banking Manager',
                  department: 'Digital Banking',
                  location: 'Kathmandu',
                  type: 'Full-time'
                },
                {
                  title: 'Risk Management Officer',
                  department: 'Risk',
                  location: 'Kathmandu',
                  type: 'Full-time'
                }
              ].map((position, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-100 rounded-xl p-6 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center text-sm text-gray-600">
                      <span className="mr-4">
                        <Briefcase className="w-4 h-4 inline mr-1" />
                        {position.department}
                      </span>
                      <span>
                        <Building className="w-4 h-4 inline mr-1" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    to="/career-form"
                    className="flex-shrink-0 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our streamlined application process makes it easy to join our team.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Submit Application',
                    description: 'Fill out our online form with your personal details and qualifications.'
                  },
                  {
                    step: '02',
                    title: 'Interview Process',
                    description: 'Selected candidates will be invited for interviews to assess their fit.'
                  },
                  {
                    step: '03',
                    title: 'Join Our Team',
                    description: 'Successful candidates will receive an offer to become part of our organization.'
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="glass-card p-6 rounded-xl h-full">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <span className="text-primary font-semibold">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Career with Us?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Take the first step towards a rewarding career at Nabil Bank. Our online application process is quick and easy.
              </p>
              
              <Link
                to="/career-form"
                className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="mt-8 flex items-center justify-center space-x-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Quick Process</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Secure Upload</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Easy Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
