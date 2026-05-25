import Link from "next/link";

function FooterLogoMark() {
  return (
    <svg viewBox="0 0 82 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto flex-shrink-0">
      <defs>
        <linearGradient id="fblueG" x1="4" y1="60" x2="44" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A7DC4"/>
          <stop offset="100%" stopColor="#7AAED8"/>
        </linearGradient>
        <linearGradient id="fgrayG" x1="44" y1="2" x2="78" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#777777"/>
          <stop offset="100%" stopColor="#404040"/>
        </linearGradient>
      </defs>
      <polygon points="41,2 4,60 12,60"  fill="url(#fblueG)" opacity="0.68"/>
      <polygon points="41,2 15,60 23,60" fill="url(#fblueG)" opacity="0.80"/>
      <polygon points="41,2 26,60 34,60" fill="url(#fblueG)" opacity="0.91"/>
      <polygon points="41,2 37,60 44,60" fill="url(#fblueG)"/>
      <polygon points="41,2 44,60 78,60" fill="url(#fgrayG)"/>
      <rect x="47" y="40" width="5.5" height="5.5" rx="0.6" fill="#6AA3D8"/>
      <rect x="53.5" y="40" width="5.5" height="5.5" rx="0.6" fill="#6AA3D8"/>
      <rect x="47" y="46.5" width="5.5" height="5.5" rx="0.6" fill="#6AA3D8"/>
      <rect x="53.5" y="46.5" width="5.5" height="5.5" rx="0.6" fill="#6AA3D8"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <FooterLogoMark />
              <div>
                <div className="font-display font-bold text-white text-[15px] tracking-wide leading-tight">PROPTECH NCR</div>
                <div className="text-[9px] text-gray-400 italic leading-tight">A Helping Hand For A Happy Home</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your trusted real estate partner across Delhi NCR — helping families find their dream homes since 2020.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Properties", href: "/properties" },
                { label: "New Launches", href: "/new-launches" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Cities</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Noida", href: "/cities/noida" },
                { label: "Greater Noida", href: "/cities/greater-noida" },
                { label: "Gurgaon", href: "/cities/gurgaon" },
                { label: "Faridabad", href: "/cities/faridabad" },
                { label: "Ghaziabad", href: "/cities/ghaziabad" },
                { label: "Delhi", href: "/cities/delhi" },
              ].map((city) => (
                <li key={city.href}>
                  <Link href={city.href} className="text-sm text-gray-400 hover:text-white transition-colors font-body">
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919876543210" className="text-sm text-gray-400 hover:text-white transition-colors font-body">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@proptechncr.com" className="text-sm text-gray-400 hover:text-white transition-colors font-body">info@proptechncr.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-400 font-body">NCR, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-body">© {new Date().getFullYear()} PropTech NCR. All rights reserved.</p>
          <p className="text-xs text-gray-500 font-body">Real Estate Channel Partner · Delhi NCR</p>
        </div>
      </div>
    </footer>
  );
}
