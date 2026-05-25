import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PropTech NCR — your trusted real estate channel partner covering all of Delhi NCR. Helping families find their dream homes since 2020.",
};

const TRUST_SIGNALS = [
  { value: "500+", label: "Properties Listed" },
  { value: "1200+", label: "Happy Clients" },
  { value: "6", label: "Cities Covered" },
  { value: "5+", label: "Years Experience" },
];

const VALUES = [
  {
    title: "Transparency",
    desc: "No hidden charges, no misleading listings. We believe in honest dealings at every step.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Local Expertise",
    desc: "Deep knowledge of every neighbourhood in Delhi NCR — from Noida's IT corridors to Gurgaon's premium zones.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Client First",
    desc: "We listen to your requirements, budget, and lifestyle preferences before suggesting options.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "End-to-End Support",
    desc: "From the first site visit to the final registration — we guide you through every step of the property buying journey.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-[#1a4030] to-emerald-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">About PropTech NCR</h1>
          <p className="text-white/70 font-body text-lg max-w-2xl mx-auto">
            A helping hand for a happy home — your trusted real estate channel partner across all of Delhi NCR.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_SIGNALS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-brand-blue">{stat.value}</div>
                <div className="text-sm text-gray-500 font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-600 font-body leading-relaxed text-sm">
                <p>
                  PropTech NCR was founded with a simple but powerful mission: to make property buying and renting across Delhi NCR easier, more transparent, and stress-free for every Indian family.
                </p>
                <p>
                  With over 5 years of experience in the NCR real estate market, we have helped more than 1,200 families and businesses find their perfect space — from first-time homebuyers looking for an affordable apartment in Noida, to seasoned investors seeking premium commercial properties in Gurgaon.
                </p>
                <p>
                  We are a channel partner operating across all six major NCR cities — Noida, Greater Noida, Gurgaon, Faridabad, Ghaziabad, and Delhi — and our deep local knowledge is what sets us apart.
                </p>
              </div>
            </div>
            <div className="bg-brand-accent rounded-3xl p-10 text-center">
              <div className="w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L12 3L21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 10V20H10V15H14V20H19V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">PropTech NCR</h3>
              <p className="text-brand-blue font-body font-medium text-sm mb-1">Real Estate Channel Partner</p>
              <p className="text-gray-500 font-body text-xs">Delhi NCR · Est. 2020</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">The values that drive every interaction we have with our clients</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-6 shadow-card">
                <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center mb-4 text-white">
                  {val.icon}
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-xs text-gray-500 font-body leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-emerald-900 via-[#1a4030] to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Ready to Find Your Property?</h2>
          <p className="text-white/70 font-body mb-7">Get in touch with us today — free consultation, no pressure.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/properties" className="bg-white text-brand-blue px-6 py-3 rounded-xl font-body font-semibold text-sm hover:bg-blue-50 transition-colors">
              Browse Properties
            </a>
            <a href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-xl font-body font-semibold text-sm hover:bg-white hover:text-brand-blue transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
