import React, { useState, useEffect } from "react";

interface Image {
  src: string;
  alt: string;
}

interface CardCarouselProps {
  images: Image[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  images,
  autoplayDelay = 2500,
  showPagination = true,
  showNavigation = true,
}) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplayDelay, length]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + length) % length);
  const next = () => setCurrent((prev) => (prev + 1) % length);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex justify-center items-center w-full overflow-hidden">
        {images.map((img, idx) => (
          <div
            key={img.src}
            className={`transition-all duration-500 ease-in-out ${idx === current ? "opacity-100 scale-100 z-10" : "opacity-40 scale-90 z-0"}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "auto",
              width: "80%",
              height: "60vh",
              display: idx === current ? "block" : "none",
              borderRadius: "32px",
              boxShadow: "0 0 40px rgba(0,0,0,0.15)",
              background: "#fff",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "32px",
                display: "block",
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>
      {showNavigation && (
        <div className="flex justify-between w-full mt-4 px-8">
          <button onClick={prev} className="text-2xl px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">&#8592;</button>
          <button onClick={next} className="text-2xl px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">&#8594;</button>
        </div>
      )}
      {showPagination && (
        <div className="flex justify-center items-center mt-6 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300"}`}
              style={{ border: "none" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
