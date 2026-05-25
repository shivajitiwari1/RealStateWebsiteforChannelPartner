"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  { src: "/images/hero/hero1.jpg", alt: "Modern luxury villa" },
  { src: "/images/hero/hero2.jpg", alt: "Premium apartment interior" },
  { src: "/images/hero/hero3.jpg", alt: "Contemporary apartment" },
  { src: "/images/hero/hero4.jpg", alt: "Luxury property NCR" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Background slides */}
      <div className="absolute inset-0">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${img.src}')`,
              opacity: i === current ? 1 : 0,
            }}
            aria-hidden={i !== current}
          />
        ))}
      </div>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-gray-900/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-transparent to-transparent pointer-events-none" />

      {/* Slide dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none">
        {IMAGES.map((_, i) => (
          <div
            key={i}
            className={`rounded-full bg-white transition-all duration-500 ${i === current ? "w-6 h-1.5 opacity-100" : "w-1.5 h-1.5 opacity-40"}`}
          />
        ))}
      </div>
    </>
  );
}
