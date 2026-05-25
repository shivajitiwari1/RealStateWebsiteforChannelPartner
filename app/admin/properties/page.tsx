"use client";

import { useEffect, useState } from "react";
import { Property } from "@/lib/data";

const CITY_LABELS: Record<string, string> = {
  noida: "Noida", "greater-noida": "Greater Noida", gurgaon: "Gurgaon",
  faridabad: "Faridabad", ghaziabad: "Ghaziabad", delhi: "Delhi",
};
const TYPE_LABELS: Record<string, string> = {
  residential: "Residential", commercial: "Commercial", "new-launch": "New Launch", plot: "Plot",
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Property>>({
    title: "", type: "residential", city: "noida", area: "", price: 0,
    priceLabel: "", bedrooms: 2, bathrooms: 2, areaSqft: 1000,
    description: "", featured: false, status: "available",
  });
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/properties");
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/admin/properties/${editingId}` : "/api/admin/properties";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    fetchProperties();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    fetchProperties();
  };

  const handleEdit = (p: Property) => {
    setForm(p);
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleNew = () => {
    setForm({ title: "", type: "residential", city: "noida", area: "", price: 0,
      priceLabel: "", bedrooms: 2, bathrooms: 2, areaSqft: 1000,
      description: "", featured: false, status: "available" });
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8 pt-2">
          <div>
            <div className="text-xs text-gray-400 font-body uppercase tracking-widest mb-1">Manage</div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Properties</h1>
          </div>
          <button onClick={handleNew} className="btn-primary text-sm px-4 py-2">+ Add Property</button>
        </div>
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-body">Loading...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 font-body uppercase tracking-wider">Property</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 font-body uppercase tracking-wider hidden md:table-cell">City</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 font-body uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 font-body uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 font-body uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4">
                      <div className="font-body font-medium text-gray-800 line-clamp-1">{p.title}</div>
                      <div className="text-xs text-gray-400 font-body mt-0.5">{p.featured ? "⭐ Featured" : ""}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 font-body hidden md:table-cell">{CITY_LABELS[p.city]}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className={`badge ${p.type === "residential" ? "badge-residential" : p.type === "commercial" ? "badge-commercial" : p.type === "new-launch" ? "badge-new-launch" : "badge-plot"}`}>
                        {TYPE_LABELS[p.type]}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-body font-semibold text-brand-blue">{p.priceLabel}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${p.status === "available" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(p)} className="text-xs text-brand-blue hover:underline font-body">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 hover:underline font-body">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {properties.length === 0 && (
              <div className="text-center py-10 text-gray-400 font-body">No properties yet. Add your first one!</div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-display font-semibold text-gray-900">{editingId ? "Edit Property" : "Add Property"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Title *</label>
                <input type="text" required value={form.title || ""} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Type</label>
                  <select value={form.type} onChange={(e) => setForm(p => ({ ...p, type: e.target.value as Property["type"] }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue">
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="new-launch">New Launch</option>
                    <option value="plot">Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">City</label>
                  <select value={form.city} onChange={(e) => setForm(p => ({ ...p, city: e.target.value as Property["city"] }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue">
                    {Object.entries(CITY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Area / Sector</label>
                  <input type="text" value={form.area || ""} onChange={(e) => setForm(p => ({ ...p, area: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Price Label</label>
                  <input type="text" placeholder="₹85 Lakh" value={form.priceLabel || ""} onChange={(e) => setForm(p => ({ ...p, priceLabel: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Price (₹)</label>
                  <input type="number" value={form.price || 0} onChange={(e) => setForm(p => ({ ...p, price: Number(e.target.value) }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Bedrooms</label>
                  <input type="number" min={0} value={form.bedrooms || 0} onChange={(e) => setForm(p => ({ ...p, bedrooms: Number(e.target.value) }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Sq. Ft.</label>
                  <input type="number" min={0} value={form.areaSqft || 0} onChange={(e) => setForm(p => ({ ...p, areaSqft: Number(e.target.value) }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Description</label>
                <textarea rows={4} value={form.description || ""} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:border-brand-blue resize-none" />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input type="checkbox" checked={form.featured || false} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
                  Featured on homepage
                </label>
                <div>
                  <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value as Property["status"] }))}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:border-brand-blue">
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
                  {saving ? "Saving..." : editingId ? "Update Property" : "Add Property"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
