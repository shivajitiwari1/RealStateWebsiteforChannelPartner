import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import PropertyCard from "../../components/PropertyCard";
import { getPropertiesByCity } from "@/lib/data";

const CITIES: Record<string, { name: string; intro: string }> = {
  noida: {
    name: "Noida",
    intro:
      "Noida (New Okhla Industrial Development Authority) is one of Delhi NCR's most sought-after destinations for real estate. Known for its planned infrastructure, wide roads, excellent metro connectivity, and world-class IT parks, Noida offers everything from affordable apartments to ultra-luxury residences. Sectors 62, 137, 150 and Noida Extension are among the most active property markets.",
  },
  "greater-noida": {
    name: "Greater Noida",
    intro:
      "Greater Noida is a masterplanned city offering some of the most affordable and spacious properties in Delhi NCR. With wide roads, green spaces, and rapid development in areas like Greater Noida West (Noida Extension), it's ideal for families seeking new builder projects and plotted developments. Excellent connectivity via the Aqua Line metro.",
  },
  gurgaon: {
    name: "Gurgaon (Gurugram)",
    intro:
      "Gurgaon is Delhi NCR's premium real estate market — home to Fortune 500 companies, luxury residential projects, and world-class retail. Areas like Golf Course Road, Sector 54, DLF 5 and New Gurugram (Sectors 76–95) offer premium apartments, villas and commercial spaces for discerning buyers.",
  },
  faridabad: {
    name: "Faridabad",
    intro:
      "Faridabad is Haryana's largest city and an important part of the Delhi NCR residential market. Offering some of the most affordable housing options in NCR, it's popular with working families. Sectors 21, 28, and areas around Nehar Par are emerging hotspots. Well-connected via the Violet Line metro.",
  },
  ghaziabad: {
    name: "Ghaziabad",
    intro:
      "Ghaziabad is a thriving real estate market on the eastern edge of Delhi NCR. Areas like Indirapuram, Vasundhara, Raj Nagar Extension and Crossings Republik offer a mix of ready-to-move apartments and new builder projects. Excellent NH-24 and Hindon elevated road connectivity make it a favourite for commuters.",
  },
  delhi: {
    name: "Delhi",
    intro:
      "Delhi offers some of the most premium real estate in the country — from South Delhi's upscale neighbourhoods like Vasant Kunj, GK, and Defence Colony to affordable builder floors in Dwarka and Rohini. Whether you're looking for a DDA flat, a builder floor, or a prime commercial space, Delhi has it all.",
  },
};

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityData = CITIES[params.city];
  if (!cityData) return { title: "City Not Found" };
  return {
    title: `Properties in ${cityData.name}`,
    description: `Browse available residential, commercial and plotted properties in ${cityData.name}. Find flats, apartments, offices and new launches through PropTech NCR.`,
  };
}

export default async function CityPage({ params }: Props) {
  const cityData = CITIES[params.city];
  if (!cityData) notFound();

  const properties = await getPropertiesByCity(params.city);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-[#1a4030] to-emerald-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-blue-200 font-body mb-3">
            <a href="/" className="hover:text-white">Home</a> / <a href="/properties" className="hover:text-white">Properties</a> / {cityData.name}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Properties in {cityData.name}
          </h1>
          <p className="text-white/60 font-body text-sm">{properties.length} properties available</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* City intro */}
        <div className="bg-brand-accent rounded-2xl p-6 mb-10">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">About {cityData.name}</h2>
          <p className="text-sm text-gray-600 font-body leading-relaxed">{cityData.intro}</p>
        </div>

        {/* Properties grid */}
        {properties.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-display text-xl text-gray-900 mb-2">No listings available yet</h3>
            <p className="text-sm text-gray-500 font-body mb-5">
              We&apos;re adding new properties in {cityData.name} soon. Check back or send us an enquiry.
            </p>
            <a href="/contact" className="btn-primary">Enquire Now</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
