"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

const cities = [
  { label: "Noida",        href: "/cities/noida" },
  { label: "Greater Noida",href: "/cities/greater-noida" },
  { label: "Gurgaon",      href: "/cities/gurgaon" },
  { label: "Faridabad",    href: "/cities/faridabad" },
  { label: "Ghaziabad",    href: "/cities/ghaziabad" },
  { label: "Delhi",        href: "/cities/delhi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCities = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCitiesOpen(true);
  };
  const closeCities = () => {
    closeTimer.current = setTimeout(() => setCitiesOpen(false), 150);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="PropTech NCR — A Helping Hand For A Happy Home"
              width={220}
              height={185}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: "/properties",   label: "Properties" },
              { href: "/new-launches", label: "New Launches" },
              { href: "/about",        label: "About" },
              { href: "/contact",      label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-body font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-brand-blue"
                    : "text-gray-600 hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Cities dropdown */}
            <div className="relative" onMouseLeave={closeCities} onMouseEnter={openCities}>
              <button
                onClick={() => setCitiesOpen(!citiesOpen)}
                className="text-base font-body font-medium transition-colors flex items-center gap-1 text-gray-600 hover:text-brand-blue"
              >
                Cities
                <svg className={`w-3.5 h-3.5 transition-transform ${citiesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {citiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  {cities.map((city) => (
                    <Link
                      key={city.href}
                      href={city.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-accent hover:text-brand-blue font-body transition-colors"
                      onClick={() => setCitiesOpen(false)}
                    >
                      <svg className="w-3.5 h-3.5 text-brand-blue/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {city.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999649937?text=Hi%2C%20I%27m%20interested%20in%20properties%20in%20NCR."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-body font-semibold hover:bg-[#1ebe5d] transition-colors shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            <Link href="/properties" className="block py-2.5 text-sm font-body font-medium text-gray-700 hover:text-brand-blue" onClick={() => setMenuOpen(false)}>Properties</Link>
            <Link href="/new-launches" className="block py-2.5 text-sm font-body font-medium text-gray-700 hover:text-brand-blue" onClick={() => setMenuOpen(false)}>New Launches</Link>
            <div className="py-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cities</div>
              {cities.map((city) => (
                <Link key={city.href} href={city.href} className="block py-1.5 pl-3 text-sm text-gray-600 hover:text-brand-blue font-body" onClick={() => setMenuOpen(false)}>{city.label}</Link>
              ))}
            </div>
            <Link href="/about" className="block py-2.5 text-sm font-body font-medium text-gray-700 hover:text-brand-blue" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block py-2.5 text-sm font-body font-medium text-gray-700 hover:text-brand-blue" onClick={() => setMenuOpen(false)}>Contact</Link>
            <a href="https://wa.me/919999649937" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2.5 text-sm font-body font-semibold text-[#25D366]">
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
