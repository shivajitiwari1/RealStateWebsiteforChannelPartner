import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import PropertyCard from "../components/PropertyCard";
import InquiryForm from "../components/InquiryForm";
import { getPropertiesByType } from "@/lib/data";

export const metadata: Metadata = {
  title: "New Launches",
  description: "Explore the latest under-construction builder projects and new launch properties across Delhi NCR. RERA registered projects in Noida, Gurgaon, Greater Noida and more.",
};

export default function NewLaunchesPage() {
  const projects = getPropertiesByType("new-launch");

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-[#1a4030] to-emerald-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-body">Pre-launch & Under-construction</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">New Launch Projects</h1>
          <p className="text-white/60 font-body max-w-xl">
            Book at pre-launch prices and get the best deals on upcoming builder projects across Delhi NCR. All projects are RERA approved.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-display text-xl text-gray-900 mb-2">New projects coming soon</h3>
            <p className="text-sm text-gray-500 font-body mb-5">Register your interest and we&apos;ll notify you when new projects launch.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {projects.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Register Interest Form */}
        <div className="bg-gradient-to-br from-[#1a2d50] to-brand-blue rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                Register Your Interest
              </h2>
              <p className="text-white/70 font-body text-sm leading-relaxed">
                Be the first to know about new project launches, pre-launch prices, and exclusive offers. Our team will reach out with the best options.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <InquiryForm source="new-launches" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
