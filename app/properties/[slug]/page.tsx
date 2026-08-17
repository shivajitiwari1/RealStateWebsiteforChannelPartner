import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import InquiryForm from "../../components/InquiryForm";
import { getAvailableProperties, getPropertyBySlug } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const properties = await getAvailableProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — ${property.city}`,
    description: `${property.priceLabel} · ${property.areaSqft} sqft · ${property.description.slice(0, 150)}...`,
    openGraph: {
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

const CITY_LABELS: Record<string, string> = {
  noida: "Noida",
  "greater-noida": "Greater Noida",
  gurgaon: "Gurgaon",
  faridabad: "Faridabad",
  ghaziabad: "Ghaziabad",
  delhi: "Delhi",
};

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "new-launch": "New Launch",
  plot: "Plot",
};

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getPropertyBySlug(params.slug);
  if (!property || property.status !== "available") notFound();

  const waText = `Hi, I'm interested in the property: ${property.title} listed on proptechncr.com. Price: ${property.priceLabel}. Please share more details.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://proptechncr.com/properties/${property.slug}`,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY_LABELS[property.city] || property.city,
      addressRegion: "Delhi NCR",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body text-gray-400 mb-6">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-brand-blue">Properties</Link>
          <span>/</span>
          <span className="text-gray-700 truncate">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: images + details */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden mb-6 bg-gray-100">
              {property.images.length > 0 ? (
                <div className={`grid gap-1.5 ${property.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {/* Main image */}
                  <div className={`relative ${property.images.length > 1 ? "row-span-2 h-80" : "h-80"}`}>
                    <Image
                      src={property.images[0]}
                      alt={`${property.title} - main`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Side images */}
                  {property.images.slice(1, 3).map((img, i) => (
                    <div key={i} className="relative h-[155px]">
                      <Image
                        src={img}
                        alt={`${property.title} - image ${i + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {/* More photos badge */}
                  {property.images.length > 3 && (
                    <div className="relative h-[155px]">
                      <Image src={property.images[3]} alt="More photos" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-display font-bold text-lg">+{property.images.length - 3} more</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-72 flex items-center justify-center bg-gradient-to-br from-brand-accent to-brand-light">
                  <svg className="w-16 h-16 text-brand-blue opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12L12 3L21 12M5 10V20H10V15H14V20H19V10" />
                  </svg>
                </div>
              )}
            </div>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${
                    property.type === "residential" ? "badge-residential" :
                    property.type === "commercial" ? "badge-commercial" :
                    property.type === "new-launch" ? "badge-new-launch" : "badge-plot"
                  }`}>
                    {TYPE_LABELS[property.type]}
                  </span>
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2 font-body">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.area}, {CITY_LABELS[property.city]}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-brand-blue">{property.priceLabel}</div>
                {property.areaSqft > 0 && (
                  <div className="text-xs text-gray-400 font-body mt-1">
                    ₹{Math.round(property.price / property.areaSqft).toLocaleString()} / sqft
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {property.bedrooms > 0 && (
                <div className="bg-brand-accent rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-xl text-gray-900">{property.bedrooms}</div>
                  <div className="text-xs text-gray-500 font-body mt-1">Bedrooms</div>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-brand-accent rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-xl text-gray-900">{property.bathrooms}</div>
                  <div className="text-xs text-gray-500 font-body mt-1">Bathrooms</div>
                </div>
              )}
              <div className="bg-brand-accent rounded-xl p-4 text-center">
                <div className="font-display font-bold text-xl text-gray-900">{property.areaSqft.toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-body mt-1">Sq. Ft.</div>
              </div>
              <div className="bg-brand-accent rounded-xl p-4 text-center">
                <div className="font-display font-bold text-xl text-gray-900 capitalize">{property.status}</div>
                <div className="text-xs text-gray-500 font-body mt-1">Status</div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">About This Property</h2>
              <p className="text-gray-600 font-body leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          {/* Right: contact sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/919999649937?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-body font-semibold py-4 rounded-2xl hover:bg-[#1ebe5d] transition-colors shadow-lg"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enquire on WhatsApp
              </a>

              {/* Inquiry Form Card */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-display text-lg text-gray-900 mb-4">Request a Callback</h3>
                <InquiryForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                  source="property-page"
                />
              </div>

              {/* Contact Info */}
              <div className="bg-brand-accent rounded-2xl p-5">
                <div className="font-display font-semibold text-gray-900 mb-3 text-sm">Contact Agent</div>
                <a href="tel:+919999649937" className="flex items-center gap-2 text-sm font-body text-gray-700 hover:text-brand-blue transition-colors">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 99996 49937
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
