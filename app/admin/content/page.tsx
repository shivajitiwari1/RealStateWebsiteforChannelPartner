"use client";

import { useEffect, useState } from "react";

interface SiteContent {
  brokerName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
}

export default function AdminContentPage() {
  const [form, setForm] = useState<SiteContent>({
    brokerName: "",
    phone: "",
    whatsappNumber: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setTimeout(() => setStatus("idle"), 3000);
  };

  const field = (
    label: string,
    key: keyof SiteContent,
    placeholder: string,
    hint?: string
  ) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body uppercase tracking-wide">
        {label}
      </label>
      <input
        type="text"
        value={form[key]}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
      />
      {hint && <p className="text-xs text-gray-400 font-body mt-1.5">{hint}</p>}
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8 pt-2">
          <div className="text-xs text-gray-400 font-body uppercase tracking-widest mb-1">Settings</div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Website Content</h1>
          <p className="text-sm text-gray-500 font-body mt-1">
            Update contact details that appear across the website.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-body">Loading...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Business Info */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-display font-semibold text-gray-900 mb-1">Business Details</h2>
              <p className="text-xs text-gray-400 font-body mb-5">Shown in the header, footer, and about page.</p>
              <div className="space-y-5">
                {field("Business / Broker Name", "brokerName", "PropTech NCR", "Appears in the admin welcome message and About page.")}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-display font-semibold text-gray-900 mb-1">Contact Information</h2>
              <p className="text-xs text-gray-400 font-body mb-5">Shown on the Contact page and footer.</p>
              <div className="space-y-5">
                {field("Phone Number", "phone", "+91 98765 43210", "Displayed on the Contact page. Include country code.")}
                {field(
                  "WhatsApp Number",
                  "whatsappNumber",
                  "919876543210",
                  "Used in WhatsApp links. Format: country code + number, no + or spaces (e.g. 919876543210)."
                )}
                {field("Email Address", "email", "info@proptechncr.com")}
                {field("Office Address", "address", "NCR, India", "Short address shown on Contact page.")}
              </div>
            </div>

            {/* Status + Save */}
            <div className="flex items-center justify-between gap-4">
              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-body bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved successfully!
                </div>
              )}
              {status === "error" && (
                <div className="text-sm text-red-500 font-body bg-red-50 px-4 py-2.5 rounded-xl border border-red-200">
                  Failed to save. Please try again.
                </div>
              )}
              {status === "idle" && <div />}
              <button
                type="submit"
                disabled={saving}
                className="btn-primary px-8 py-2.5 disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
