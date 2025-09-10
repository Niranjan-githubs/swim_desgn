import { useState, useEffect } from 'react';
import { HoverExpand } from '../ui/hover-expand';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reviews = [
    {
      image: "/reviews/rev 1.jpg",
      text: "Swim Designers provided excellent services and technical support throughout our project. They delivered a beautiful pool that exceeded our expectations. Overall a great experience!"
    },
    {
      image: "/reviews/rev 2.jpg",
      text: "Veni Ent completed our pool project with outstanding workmanship. The team was professional, punctual, and delivered exactly what was promised. Highly recommend their services!"
    },
    {
      image: "/reviews/ee.jpg",
      text: "Veni Ent designed, supplied, erected, installed and commissioned our infinity pool. They are very good in quality, sticking to design, timely delivery, and prompt after sales service support."
    },
    {
      image: "/reviews/ee 2.jpg",
      text: "Swim Designers delivered an excellent pool design and construction for our resort. The team was highly professional and delivered exactly what we envisioned. Perfect execution!"
    },
    {
      image: "/reviews/ee3.jpg",
      text: "Veni Ent's work quality and attention to detail was amazing. Our rooftop pool turned out better than expected! The team was professional and completed the project on time."
    },
    {
      image: "/reviews/ee4.jpg",
      text: "Swim Designers provided outstanding service from start to finish. Their expertise in pool construction and design is unmatched. Highly recommend for anyone looking for quality work!"
    }
  ];

  // Mobile Layout
  const MobileLayout = () => (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-sky-100 text-sky-700 rounded-full px-4 sm:px-6 py-2 mb-4">
            <span className="text-xs sm:text-sm font-semibold">Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 break-words">
            Discover what our satisfied customers have to say about their pool experience. 
            Hover over the images to explore and click to read the full reviews.
          </p>
        </div>

        {/* HoverExpand Component */}
        <div className="w-full overflow-hidden">
          <HoverExpand
            reviews={reviews}
            initialSelectedIndex={0}
            thumbnailHeight={300}
            modalImageSize={500}
            maxThumbnails={6}
          />
        </div>
      </div>
    </section>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-sky-100 text-sky-700 rounded-full px-4 sm:px-6 py-2 mb-4">
            <span className="text-xs sm:text-sm font-semibold">Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 break-words">
            Discover what our satisfied customers have to say about their pool experience. 
            Hover over the images to explore and click to read the full reviews.
          </p>
        </div>

        {/* Desktop HoverExpand Component - Centered */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl">
            <HoverExpand
              reviews={reviews}
              initialSelectedIndex={0}
              thumbnailHeight={300}
              modalImageSize={500}
              maxThumbnails={6}
            />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
};

export default About;