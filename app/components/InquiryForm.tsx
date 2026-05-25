"use client";

import { useState } from "react";

interface Props {
  propertyId?: string;
  propertyTitle?: string;
  source: "homepage" | "contact" | "property-page" | "new-launches";
}

export default function InquiryForm({ propertyId, propertyTitle, source }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", city: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          propertyId: propertyId || null,
          source,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "", city: "" });

      // WhatsApp deep link after successful submission
      const waText = propertyTitle
        ? `Hi, I just submitted an enquiry on proptechncr.com for ${propertyTitle}. My name is ${form.name} and my number is ${form.phone}.`
        : `Hi, I just submitted an enquiry on proptechncr.com. My name is ${form.name} and my number is ${form.phone}. I'm interested in properties in ${form.city || "NCR"}.`;
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(waText)}`, "_blank");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl text-gray-900 mb-2">Enquiry Sent!</h3>
        <p className="text-sm text-gray-500 font-body">We&apos;ll get back to you within 24 hours. A WhatsApp message has been pre-filled for you.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-brand-blue hover:underline font-body"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-body">Your Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Rahul Sharma"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-body">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="9876543210"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-body">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="rahul@email.com"
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
        />
      </div>

      {!propertyId && (
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-body">City of Interest</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
          >
            <option value="">Select a city...</option>
            <option value="Noida">Noida</option>
            <option value="Greater Noida">Greater Noida</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Faridabad">Faridabad</option>
            <option value="Ghaziabad">Ghaziabad</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-body">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about your requirements..."
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 font-body">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-primary justify-center flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>
      <p className="text-xs text-gray-400 text-center font-body">WhatsApp message will open after submission</p>
    </form>
  );
}
