import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['(555) 123-POOL', '(555) 123-7665'],
      action: 'Call now for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@aquadesigns.com', 'quotes@aquadesigns.com'],
      action: 'Email us your project details'
    },
    {
      icon: MapPin,
      title: 'Service Areas',
      details: ['Los Angeles County', 'Orange County', 'Ventura County'],
      action: 'We serve all of Southern California'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 7:00 AM - 6:00 PM', 'Sat: 8:00 AM - 4:00 PM', 'Sun: By Appointment'],
      action: '24/7 emergency service available'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-sky-500/20 text-sky-300 rounded-full px-6 py-2 mb-4">
            <Send className="mr-2" size={16} />
            <span className="text-sm font-semibold">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Pool Project Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your backyard? Contact us for a free consultation and detailed quote. 
            Our experts are here to bring your pool dreams to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Get Your Free Quote</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />
                <h4 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h4>
                <p className="text-gray-300">
                  Your message has been sent successfully. We'll contact you within 24 hours to discuss your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white placeholder-gray-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white"
                    >
                      <option value="" className="text-gray-800">Select project type</option>
                      <option value="new-pool" className="text-gray-800">New Pool Installation</option>
                      <option value="renovation" className="text-gray-800">Pool Renovation</option>
                      <option value="spa" className="text-gray-800">Spa Addition</option>
                      <option value="water-features" className="text-gray-800">Water Features</option>
                      <option value="maintenance" className="text-gray-800">Maintenance Services</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white"
                    >
                      <option value="" className="text-gray-800">Select budget range</option>
                      <option value="under-50k" className="text-gray-800">Under $50,000</option>
                      <option value="50k-100k" className="text-gray-800">$50,000 - $100,000</option>
                      <option value="100k-150k" className="text-gray-800">$100,000 - $150,000</option>
                      <option value="over-150k" className="text-gray-800">Over $150,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white"
                    >
                      <option value="" className="text-gray-800">Select timeline</option>
                      <option value="asap" className="text-gray-800">ASAP</option>
                      <option value="1-3-months" className="text-gray-800">1-3 months</option>
                      <option value="3-6-months" className="text-gray-800">3-6 months</option>
                      <option value="6-12-months" className="text-gray-800">6-12 months</option>
                      <option value="planning" className="text-gray-800">Just planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-sky-400 focus:outline-none transition-colors text-white placeholder-gray-300 resize-none"
                    placeholder="Tell us about your vision, property size, special requirements, or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} />
                  Send My Request
                </button>

                <p className="text-sm text-gray-300 text-center">
                  By submitting this form, you agree to receive communications from AquaDesigns. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                Ready to discuss your pool project? Reach out to us through any of the methods below. 
                Our team is standing by to answer your questions and provide expert guidance.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{info.title}</h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-300 mb-1">{detail}</p>
                      ))}
                      <p className="text-sm text-sky-300 mt-2">{info.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30">
              <h4 className="font-semibold text-lg mb-2 text-red-300">Emergency Service</h4>
              <p className="text-gray-300 mb-2">Pool equipment malfunction? Water quality issues?</p>
              <p className="text-red-300 font-semibold">Call (555) 911-POOL for 24/7 emergency service</p>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Why Choose AquaDesigns?</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-sky-400 mb-2">24h</div>
              <p className="text-sm text-gray-300">Response Time for Quotes</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-sky-400 mb-2">10Y</div>
              <p className="text-sm text-gray-300">Structural Warranty</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-sky-400 mb-2">100%</div>
              <p className="text-sm text-gray-300">Satisfaction Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;