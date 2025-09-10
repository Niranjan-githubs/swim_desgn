import { useState, useEffect, useRef } from 'react';
import { Palette, Wrench, Droplets, Shield, Sparkles, Settings, Star, Award, Users, Clock } from 'lucide-react';
import FlowingMenu from './FlowingMenu';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [scrambledNumbers, setScrambledNumbers] = useState({
    experience: '00+',
    projects: '000+',
    engineers: '00+',
    development: '000K+'
  });
  const [hasScrambled, setHasScrambled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Service images array
  const serviceImages = [
    "/services/view-hotel-pool.jpg",
    "/services/photorealistic-wooden-house-interior-with-timber-decor-furnishings.jpg",
    "/services/view-hotel-pool (1).jpg",
    "/services/view-hotel-pool.jpg",
    "/services/photorealistic-wooden-house-interior-with-timber-decor-furnishings.jpg",
    "/services/view-hotel-pool (1).jpg"
  ];

  const stats = [
    { 
      number: '15+', 
      label: 'Years of Experience', 
      icon: Clock,
      key: 'experience'
    },
    { 
      number: '280+', 
      label: 'Pools Completed', 
      icon: Award,
      key: 'projects'
    },
    { 
      number: '15+', 
      label: 'Expert Engineers', 
      icon: Users,
      key: 'engineers'
    },
    { 
      number: '600K+', 
      label: 'SQ. FT. Development', 
      icon: Star,
      key: 'development'
    }
  ];

  const services = [
    {
      icon: Palette,
      title: "Custom Pool Design",
      description: "Tailored pool designs that reflect your style and complement your landscape. From modern geometric shapes to natural lagoon-style pools.",
      features: ["3D Design Visualization", "Site Analysis", "Permit Assistance", "CAD Drawings"]
    },
    {
      icon: Wrench,
      title: "Pool Installation",
      description: "Professional installation using the latest techniques and highest quality materials. Our certified team ensures every detail is perfect.",
      features: ["Excavation & Grading", "Plumbing & Electrical", "Equipment Installation", "Quality Finishing"]
    },
    {
      icon: Droplets,
      title: "Water Features",
      description: "Add elegance with waterfalls, fountains, spa jets, and lighting systems that create a stunning nighttime ambiance.",
      features: ["Waterfalls & Fountains", "LED Lighting Systems", "Spa Integration", "Automation Controls"]
    },
    {
      icon: Sparkles,
      title: "Pool Renovation",
      description: "Transform your existing pool with modern upgrades, new finishes, and enhanced features to extend its life and beauty.",
      features: ["Resurfacing & Refinishing", "Equipment Upgrades", "Feature Additions", "Energy Efficiency"]
    },
    {
      icon: Settings,
      title: "Maintenance Services",
      description: "Keep your pool in pristine condition with our comprehensive maintenance programs and expert technical support.",
      features: ["Weekly Cleaning", "Chemical Balancing", "Equipment Servicing", "Seasonal Preparation"]
    },
    {
      icon: Shield,
      title: "Warranty & Support",
      description: "Peace of mind with comprehensive warranties and 24/7 support. We stand behind our work with industry-leading guarantees.",
      features: ["10-Year Structural Warranty", "2-Year Equipment Warranty", "24/7 Emergency Support", "Annual Inspections"]
    }
  ];


  // Only include clients with confirmed working images
  const allClients = [
    { 
      name: "Hotel Jungle Stay Madurai", 
      logo: "/logo/image 1.png",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      name: "Olympia Panache", 
      logo: "/logo/image 2.png",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      name: "Delphi Public School", 
      logo: "/logo/Image 3.png",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      name: "Vijayam Institutions", 
      logo: "/logo/image 4.png",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    { 
      name: "Natwest Aura", 
      logo: "/logo/image 5.png",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    { 
      name: "Parampara Holiday Resort", 
      logo: "/logo/image 6.png",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    { 
      name: "Vox Group", 
      logo: "/logo/image 8.png",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    { 
      name: "Havelock Island Beach Resort", 
      logo: "/logo/image 9.png",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    { 
      name: "Trusted Partner", 
      logo: "/logo/thumb.jpg",
      color: "text-violet-600",
      bgColor: "bg-violet-50"
    },
    { 
      name: "Premium Client", 
      logo: "/logo/Screenshot 2025-09-10 161352.png",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  // Use only the confirmed working clients
  const clients = allClients;
  
  console.log(`Displaying ${clients.length} client logos:`, clients.map(c => c.name));

  // Scramble effect function - only numbers
  const scrambleText = (text: string) => {
    const numbers = '0123456789';
    return text.split('').map((char) => {
      if (char === '+') return '+';
      if (char === 'K') return 'K';
      return numbers[Math.floor(Math.random() * numbers.length)];
    }).join('');
  };

  // Intersection Observer to trigger scramble when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasScrambled) {
            setHasScrambled(true);
            
            // Start scramble animation
            const interval = setInterval(() => {
              setScrambledNumbers({
                experience: scrambleText('15+'),
                projects: scrambleText('280+'),
                engineers: scrambleText('15+'),
                development: scrambleText('600K+')
              });
            }, 100);

            // Stop scramble after 2 seconds and show final numbers
            const timeout = setTimeout(() => {
              clearInterval(interval);
              setScrambledNumbers({
                experience: '15+',
                projects: '280+',
                engineers: '15+',
                development: '600K+'
              });
            }, 2000);

            return () => {
              clearInterval(interval);
              clearTimeout(timeout);
            };
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasScrambled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section ref={sectionRef} id="services" className="pt-8 pb-16 sm:pb-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-cyan-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Stats Section - Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-12 md:mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group relative">
              {/* Floating particles background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 sm:top-4 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-4 sm:top-8 right-2 sm:right-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-1 h-1 bg-sky-400 rounded-full animate-bounce"></div>
              </div>
              
              <div className="relative">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 font-mono">
                  {scrambledNumbers[stat.key as keyof typeof scrambledNumbers]}
                </div>
                <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-1 sm:w-2 h-1 sm:h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
              </div>
              
              <div className="text-gray-600 text-xs sm:text-sm font-medium relative z-10">
                {stat.label}
              </div>
              
              {/* Icon with animation */}
              <div className="mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 mx-auto text-blue-500 animate-bounce" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-6 sm:mb-12 md:mb-16 lg:mb-20 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full blur-2xl"></div>
          </div>
          {/* Left - Pool Image with Logo */}
          <div className="relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl">
              <img 
                src={serviceImages[activeService] || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"}
                alt={services[activeService]?.title || "Luxury Pool Design"}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              
              {/* Service indicator dots */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                {services.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === activeService 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-3 h-3 sm:w-4 sm:h-4 bg-white/30 rounded-full animate-pulse backdrop-blur-sm"></div>
              <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400/80 rounded-full animate-bounce backdrop-blur-sm"></div>
              <div className="absolute top-1/2 right-6 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-400/60 rounded-full animate-ping"></div>
              

              

            </div>
          </div>

          {/* Right - Flowing Menu */}
          <div className="h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <FlowingMenu 
              items={[
                { 
                  link: '#', 
                  text: 'Custom Pool Design', 
                  image: '/services/view-hotel-pool.jpg',
                  icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                },
                { 
                  link: '#', 
                  text: 'Pool Installation', 
                  image: '/services/photorealistic-wooden-house-interior-with-timber-decor-furnishings.jpg',
                  icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                },
                { 
                  link: '#', 
                  text: 'Pool Renovation', 
                  image: '/services/view-hotel-pool.jpg',
                  icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                },
                { 
                  link: '#', 
                  text: 'Maintenance Services', 
                  image: '/services/photorealistic-wooden-house-interior-with-timber-decor-furnishings.jpg',
                  icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                }
              ]} 
            />
          </div>
        </div>

        {/* Clientele Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="mb-4 sm:mb-6 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Trusted by Premium Clients</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Delivering excellence to resorts and consultants across India</p>
          </div>
          
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            
            <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12 animate-scroll">
              {/* First set of logos */}
              {clients.map((client, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 group">
                  <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 w-24 sm:w-28 md:w-32 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white p-2 sm:p-3">
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      style={{ aspectRatio: 'auto' }}
                      onError={(e) => {
                        console.log(`Failed to load image: ${client.logo} for client: ${client.name}`);
                        // Remove the entire client container
                        const container = e.currentTarget.closest('.flex-shrink-0') as HTMLElement;
                        if (container) {
                          container.style.display = 'none';
                        }
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${client.logo} for client: ${client.name}`);
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless infinite scroll */}
              {clients.map((client, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 group">
                  <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 w-24 sm:w-28 md:w-32 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white p-2 sm:p-3">
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      style={{ aspectRatio: 'auto' }}
                      onError={(e) => {
                        console.log(`Failed to load image: ${client.logo} for client: ${client.name}`);
                        // Remove the entire client container
                        const container = e.currentTarget.closest('.flex-shrink-0') as HTMLElement;
                        if (container) {
                          container.style.display = 'none';
                        }
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${client.logo} for client: ${client.name}`);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 