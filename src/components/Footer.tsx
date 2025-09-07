import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Globe, Shield, Award, Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type definitions for EmailJS
declare global {
  interface Window {
    emailjs: {
      init: (key: string) => void;
      sendForm: (serviceId: string, templateId: string, form: HTMLFormElement, publicKey: string) => Promise<{ text: string }>;
      send: (serviceId: string, templateId: string, templateParams: any, publicKey: string) => Promise<{ text: string }>;
    };
  }
}

interface FormErrors {
  name?: string;
  message?: string;
  submit?: string;
}

interface FormState {
  name: string;
  message: string;
  submitting: boolean;
  submitted: boolean;
  errors: FormErrors | null;
}

const Footer = () => {
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [state, setState] = useState<FormState>({
    name: '',
    message: '',
    submitting: false,
    submitted: false,
    errors: null
  });

  // EmailJS configuration - Replace with your actual values
  const EMAIL_SERVICE_ID = 'service_0jdmqqt'; // Replace with your EmailJS service ID
  const EMAIL_TEMPLATE_ID = 'template_iwcojgg'; // Replace with your EmailJS template ID
  const EMAIL_PUBLIC_KEY = 'izJ9flFrw4YXA0ChA'; // Replace with your EmailJS public key
  // Cache busting timestamp: 2025-08-26 20:13:25

  // EmailJS is initialized in index.html

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setState(prev => ({ ...prev, errors: null }));

    // Validation
    const errors: FormErrors = {};
    if (!state.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!state.message.trim()) {
      errors.message = 'Message is required';
    }

    if (Object.keys(errors).length > 0) {
      setState(prev => ({ ...prev, errors }));
      return;
    }

    setState(prev => ({ ...prev, submitting: true }));

    try {
      // Format the message for WhatsApp - using the exact format that works
      const message = `Hello! I am interested in your swimming pool services.

Name: ${state.name}
Message: ${state.message}

I would like to discuss my pool requirements with you.`;

      // URL encode the message properly
      const encodedMessage = encodeURIComponent(message);
      
      // WhatsApp number in international format (no +, no leading zeros)
      const whatsappNumber = '919176203070';
      
      // Create WhatsApp URL using the exact format that works
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Debug: Log the URL to console
      console.log('WhatsApp URL:', whatsappURL);
      console.log('Original message:', message);
      console.log('Encoded message:', encodedMessage);
      
      // Try to redirect to WhatsApp
      const newWindow = window.open(whatsappURL, '_blank');
      
      // If the window doesn't open or there's an issue, try alternative encoding
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log('Trying alternative encoding...');
        const alternativeUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.replace(/\n/g, '%0A'))}`;
        window.open(alternativeUrl, '_blank');
      }
      
      // Reset form
      setState({
        name: '',
        message: '',
        submitting: false,
        submitted: true,
        errors: null
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, submitted: false }));
      }, 5000);

    } catch (error) {
      console.error('WhatsApp redirect error:', error);
      setState(prev => ({
        ...prev,
        submitting: false,
        errors: { submit: 'Failed to redirect to WhatsApp. Please try again or contact us directly.' }
      }));
    }
  };

  const navigateToPage = (pageName: string) => {
    navigate(`/${pageName}`);
    // Scroll to top of the page after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer id="contact" className="bg-white text-gray-800 border-t border-gray-200">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
            Let's Get in Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fill out the form below and we'll redirect you to WhatsApp to continue the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 px-8 py-10 shadow-lg">
            {state.submitted ? (
              // Success Message
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to WhatsApp!</h3>
                <p className="text-gray-600">Your message has been prepared and you should be redirected to WhatsApp. If not, please click the WhatsApp button below.</p>
                <button
                  onClick={() => {
                    const message = `Hello! I am interested in your swimming pool services.

Name: ${state.name}
Message: ${state.message}

I would like to discuss my pool requirements with you.`;
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappNumber = '919176203070';
                    
                    // Create WhatsApp URL using the exact format that works
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                    window.open(whatsappURL, '_blank');
                  }}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Open WhatsApp
                </button>


              </div>
            ) : (
              <form ref={form} className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-lg font-semibold text-gray-800">Name</label>
                <input
                  id="name"
                  name="user_name"
                  type="text"
                  required
                  className={`bg-white flex h-12 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300 ${
                    state.errors?.name 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                  placeholder="Enter your name"
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
                {state.errors?.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {state.errors.name}
                  </p>
                )}
              </div>

                              <div className="space-y-2">
                  <label htmlFor="message" className="text-lg font-semibold text-gray-800">Message</label>
                  <textarea
                    className={`bg-white flex min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-300 resize-none ${
                      state.errors?.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                    id="message"
                    name="message" // EmailJS template variable
                    placeholder="Enter your message"
                    value={state.message}
                    onChange={(e) => setState({ ...state, message: e.target.value })}
                  />
                  {state.errors?.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {state.errors.message}
                    </p>
                  )}
                                </div>

                {state.errors?.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {state.errors.submit}
                    </p>
                  </div>
                )}

                <button
                  className="group/btn relative block h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:from-blue-700 hover:via-sky-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  type="submit"
                  disabled={state.submitting}
                >
                  <span className="flex items-center justify-center">
                    {state.submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send via WhatsApp
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
            </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Connect with Us
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm">
                  <Mail className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 font-medium">Email us at</p>
                  <p className="text-gray-900 text-lg font-semibold">venienter@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm">
                  <Phone className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 font-medium">Call us at</p>
                  <p className="text-gray-900 text-lg font-semibold">+91 91762 03070</p>
                  <p className="text-gray-500 text-sm">24/7 Emergency Support</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm">
                  <MapPin className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 font-medium">Visit us at</p>
                  <p className="text-gray-900 text-lg font-semibold">3564,Rajammal Nagar,TNHB,Ayappakam,Chennai-600077</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm">
                  <Globe className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 font-medium">Visit our website</p>
                  <p className="text-gray-900 text-lg font-semibold">www.swimdesigners.com</p>
                  <p className="text-gray-500 text-sm">Explore our portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo.png"
                  alt="Swim Designers Logo"
                  className="h-8 w-8 object-contain"
                />
                <h3 className="text-xl font-bold text-gray-900">Swim Designers</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professional swimming pool design and construction services in South India. 
                Luxury pools, infinity edge, rooftop pools and more.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => navigateToPage('aboutus')}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPage('ourserv')}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPage('top')}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Types of Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/');
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Services</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => {
                      navigate('/ourserv');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('pool-design-consultation');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Pool Design & Consultation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/ourserv');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('construction-installation');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Construction & Installation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/ourserv');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('waterproofing-solutions');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Waterproofing Solutions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/ourserv');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('accessories-equipment');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Accessories & Equipment
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/ourserv');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('maintenance-repairs');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Maintenance & Repairs
                  </button>
                </li>
              </ul>
            </div>

            {/* Pool Types */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Pool Types</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('infinity-edge-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Infinity Edge Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('rooftop-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Rooftop Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('overflow-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Overflow Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('skimmer-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Skimmer Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('spa-pools-and-jacuzzis');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Spa Pools & Jacuzzis
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('kids-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Kids Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('olympic-and-semi-olympic-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Olympic Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('plunge-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Plunge Pools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      navigate('/top');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => {
                          const element = document.getElementById('aqua-therapy-pools');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm text-left"
                  >
                    Aqua Therapy Pools
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

     

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © 2025 Swim Designers. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
  {/* Bottom Section */}

export default Footer;