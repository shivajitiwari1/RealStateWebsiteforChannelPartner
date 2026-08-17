import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import InquiryForm from "../components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PropTech NCR for property enquiries, site visits, and consultations. We cover all of Delhi NCR — Noida, Gurgaon, Faridabad, Ghaziabad, Greater Noida & Delhi.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-emerald-900 via-[#1a4030] to-emerald-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/70 font-body">We&apos;d love to hear from you. Reach out for any property enquiry.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-brand-accent rounded-2xl p-6">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1">Phone</h3>
              <a href="tel:+919999649937" className="text-sm text-brand-blue font-body hover:underline">+91 99996 49937</a>
            </div>

            <div className="bg-brand-accent rounded-2xl p-6">
              <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1">WhatsApp</h3>
              <a
                href="https://wa.me/919999649937?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20properties%20in%20NCR."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#25D366] font-body hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="bg-brand-accent rounded-2xl p-6">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1">Email</h3>
              <a href="mailto:info@proptechncr.com" className="text-sm text-brand-blue font-body hover:underline">info@proptechncr.com</a>
            </div>

            <div className="bg-brand-accent rounded-2xl p-6">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-sm text-gray-600 font-body">NCR, India</p>
              <p className="text-xs text-gray-400 font-body mt-1">Serving all 6 NCR cities</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-sm text-gray-500 font-body mb-6">Fill in your details and we&apos;ll get back to you within 24 hours.</p>
              <InquiryForm source="contact" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
