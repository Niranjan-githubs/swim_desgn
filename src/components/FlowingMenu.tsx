import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Palette, Wrench, Droplets, Shield, Sparkles, Settings } from 'lucide-react';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  icon: React.ReactNode;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const setItemRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) {
      itemRefs.current[idx] = el;
    }
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent, idx: number) => {
    const itemRef = itemRefs.current[idx];
    const marqueeRef = marqueeRefs.current[idx];
    const marqueeInnerRef = marqueeInnerRefs.current[idx];

    if (!itemRef || !marqueeRef || !marqueeInnerRef) return;

    const rect = itemRef.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef, marqueeInnerRef], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent, idx: number) => {
    const itemRef = itemRefs.current[idx];
    const marqueeRef = marqueeRefs.current[idx];
    const marqueeInnerRef = marqueeInnerRefs.current[idx];

    if (!itemRef || !marqueeRef || !marqueeInnerRef) return;

    const rect = itemRef.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef, { y: edge === 'top' ? '-101%' : '101%' }).to(marqueeInnerRef, {
      y: edge === 'top' ? '101%' : '-101%'
    });
  };

  return (
    <div className="w-full h-full bg-white">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 relative overflow-hidden text-center border-b border-gray-200 last:border-b-0"
            ref={(el) => setItemRef(el, idx)}
          >
            <a
              className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-gray-800 text-[2.5vh] hover:text-blue-600 focus:text-blue-600 focus-visible:text-blue-600 transition-colors duration-300"
              href={item.link}
              onMouseEnter={(ev) => handleMouseEnter(ev, idx)}
              onMouseLeave={(ev) => handleMouseLeave(ev, idx)}
            >
              <div className="flex items-center space-x-3">
                {/* Icon */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <div className="text-white text-sm">
                    {item.icon}
                  </div>
                </div>
                {/* Text */}
                <span>{item.text}</span>
              </div>
            </a>

            <div
              className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-blue-50 translate-y-[101%]"
              ref={(el) => (marqueeRefs.current[idx] = el)}
            >
              <div className="h-full w-[200%] flex" ref={(el) => (marqueeInnerRefs.current[idx] = el)}>
                <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <React.Fragment key={`${idx}-${i}`}>
                      <span className="text-blue-800 uppercase font-normal text-[2.5vh] leading-[1.2] p-[1vh_1vw_0]">
                        {item.text}
                      </span>

                      <div
                        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center shadow-lg"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default FlowingMenu;