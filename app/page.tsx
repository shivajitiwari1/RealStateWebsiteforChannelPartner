import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PropertyCard from "./components/PropertyCard";
import InquiryForm from "./components/InquiryForm";
import { getFeaturedProperties } from "@/lib/data";

const HERO_IMAGES = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=85", alt: "Modern luxury villa" },
  { src: "https://images.unsplash.com/photo-1613490493576-f4a9a01f9b21?w=1920&auto=format&fit=crop&q=85", alt: "Premium apartment interior" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&auto=format&fit=crop&q=85", alt: "Contemporary apartment" },
  { src: "https://images.unsplash.com/photo-1580587771525-78b9be4e7e12?w=1920&auto=format&fit=crop&q=85", alt: "Luxury property NCR" },
];

const CITIES = [
  { name: "Noida",        slug: "noida",         desc: "IT hub & modern townships",    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=75" },
  { name: "Greater Noida",slug: "greater-noida", desc: "Planned city, new projects",   img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=75" },
  { name: "Gurgaon",      slug: "gurgaon",       desc: "Corporate & luxury living",    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop&q=75" },
  { name: "Faridabad",    slug: "faridabad",     desc: "Affordable family homes",      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&auto=format&fit=crop&q=75" },
  { name: "Ghaziabad",    slug: "ghaziabad",     desc: "Connected & growing fast",     img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&auto=format&fit=crop&q=75" },
  { name: "Delhi",        slug: "delhi",         desc: "Prime urban properties",       img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=75" },
];

const CATEGORIES = [
  {
    label: "Residential",
    type: "residential",
    desc: "Flats, apartments & villas",
    bg: "from-blue-600 to-blue-800",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=70",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12L12 3L21 12M5 10V20H10V15H14V20H19V10" />
      </svg>
    ),
  },
  {
    label: "Commercial",
    type: "commercial",
    desc: "Offices, shops & warehouses",
    bg: "from-amber-500 to-orange-700",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=70",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "New Launches",
    type: "new-launch",
    desc: "Under-construction projects",
    bg: "from-emerald-500 to-teal-700",
    img: "https://images.unsplash.com/photo-1600596542815-486c0bb3d3a8?w=600&auto=format&fit=crop&q=70",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    label: "Plots",
    type: "plot",
    desc: "Residential & commercial plots",
    bg: "from-violet-600 to-purple-800",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=70",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

const STATS = [
  {
    value: "500+",
    label: "Properties Listed",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12L12 3L21 12M5 10V20H10V15H14V20H19V10" />
      </svg>
    ),
  },
  {
    value: "6",
    label: "Cities Covered",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "1200+",
    label: "Happy Clients",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Years of Trust",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const featured = getFeaturedProperties();

  return (
    <>
      <Navbar />

      {/* ── Animated Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* Slideshow — 4 images cycling via CSS background (bypasses Next.js image proxy) */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              className="hero-slide absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${img.src}')` }}
              role="img"
              aria-label={img.alt}
            />
          ))}

          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/92 via-gray-900/72 to-gray-900/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <div key={i} className={`rounded-full bg-white/40 ${i === 0 ? "w-6 h-1.5" : "w-1.5 h-1.5"}`} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/90 font-body font-medium">6 Cities · 500+ Verified Properties</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5">
              Find Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Dream Home
              </span>
              <br />
              in NCR
            </h1>

            <p className="text-lg text-white/65 font-body mb-10 leading-relaxed max-w-lg">
              A helping hand for a happy home — trusted real estate partner across Noida, Gurgaon, Greater Noida, Faridabad, Ghaziabad &amp; Delhi.
            </p>

            {/* Glassmorphism search bar */}
            <form
              action="/properties"
              method="get"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
            >
              <select
                name="city"
                className="flex-1 px-4 py-3.5 rounded-xl text-sm font-body text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="">All Cities</option>
                <option value="noida">Noida</option>
                <option value="greater-noida">Greater Noida</option>
                <option value="gurgaon">Gurgaon</option>
                <option value="faridabad">Faridabad</option>
                <option value="ghaziabad">Ghaziabad</option>
                <option value="delhi">Delhi</option>
              </select>
              <select
                name="type"
                className="flex-1 px-4 py-3.5 rounded-xl text-sm font-body text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="new-launch">New Launch</option>
                <option value="plot">Plot</option>
              </select>
              <button type="submit" className="btn-primary px-8 py-3.5 whitespace-nowrap text-base">
                Search →
              </button>
            </form>

            {/* Quick links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["Noida", "Gurgaon", "Delhi", "New Launches"].map((tag) => (
                <Link
                  key={tag}
                  href={tag === "New Launches" ? "/new-launches" : `/cities/${tag.toLowerCase().replace(" ", "-")}`}
                  className="text-xs font-body font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10">
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent text-brand-blue flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm">
                  {stat.icon}
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-brand-blue">{stat.value}</div>
                <div className="text-sm text-gray-500 font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      {featured.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-body font-semibold text-brand-blue uppercase tracking-widest mb-2">Handpicked for You</p>
                <h2 className="section-title">Featured Properties</h2>
                <p className="section-subtitle max-w-md">Verified listings across NCR — each personally curated by our team.</p>
              </div>
              <Link href="/properties" className="btn-outline text-sm hidden sm:block">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/properties" className="btn-outline">View All Properties →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Browse by City ── */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-body font-semibold text-blue-400 uppercase tracking-widest mb-2">Delhi NCR Coverage</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Browse by City</h2>
            <p className="text-gray-400 text-base mt-3 font-body">All 6 cities — find your neighbourhood</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-2"
              >
                <Image
                  src={city.img}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/40 to-transparent" />
                {/* Hover ring */}
                <div className="absolute inset-0 border-2 border-blue-400/0 group-hover:border-blue-400/60 rounded-2xl transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-display font-bold text-white text-sm leading-tight mb-0.5">{city.name}</div>
                  <div className="text-gray-300 text-[10px] font-body leading-snug">{city.desc}</div>
                  <div className="mt-2 text-blue-400 text-[10px] font-body font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    View Properties →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-body font-semibold text-brand-blue uppercase tracking-widest mb-2">Property Types</p>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find exactly what fits your needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.type}
                href={`/properties?type=${cat.type}`}
                className="group relative overflow-hidden rounded-2xl h-64 shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1.5"
              >
                {/* Background photo */}
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Gradient overlay — always dark, darker on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.bg} opacity-70 group-hover:opacity-85 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 shadow-lg">
                    {cat.icon}
                  </div>
                  <div className="font-display font-bold text-white text-lg mb-1 leading-tight">{cat.label}</div>
                  <div className="text-white/75 text-xs font-body">{cat.desc}</div>
                  <div className="mt-3 text-white/0 group-hover:text-white/90 text-xs font-body font-semibold transition-colors duration-300">
                    Browse →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 bg-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">Why Choose PropTech NCR?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Free Consultation",
                desc: "Expert advice at zero cost — we understand your needs before suggesting options.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Verified Listings",
                desc: "Every property is physically verified. No fake listings, no misleading photos.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Fast Response",
                desc: "We respond to every enquiry within 2 hours — site visits arranged same day.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-card flex gap-4 items-start hover:shadow-card-hover transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-body leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture Form ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&auto=format&fit=crop&q=70"
            alt="Luxury interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b35]/95 via-brand-blue/90 to-[#0d1b35]/95" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-body font-semibold text-blue-300 uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-snug">
                Looking for the<br/>Perfect Property?
              </h2>
              <p className="text-white/65 font-body text-base leading-relaxed mb-8">
                Share your requirements and we&apos;ll get back to you with the best options matching your budget and location.
              </p>
              <div className="space-y-4">
                {[
                  "Free property consultation",
                  "Site visits at your convenience",
                  "No hidden charges ever",
                  "Legal documentation guidance",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-400/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/75 font-body text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-1">Send an Enquiry</h3>
              <p className="text-sm text-gray-400 font-body mb-6">We respond within 2 hours</p>
              <InquiryForm source="homepage" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
