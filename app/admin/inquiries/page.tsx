"use client";

import { useEffect, useState } from "react";
import { Inquiry } from "@/lib/data";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/inquiries");
    const data = await res.json();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchInquiries();
  };

  const statusColors: Record<Inquiry["status"], string> = {
    new: "bg-amber-100 text-amber-700",
    contacted: "bg-blue-100 text-blue-700",
    closed: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8 pt-2">
          <div className="text-xs text-gray-400 font-body uppercase tracking-widest mb-1">Manage</div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Inquiries</h1>
        </div>
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-body">Loading...</div>
        ) : (
          <div className="space-y-3">
            {inquiries.length === 0 && (
              <div className="text-center py-16 text-gray-400 font-body">No inquiries yet.</div>
            )}
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div
                  className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <div className="font-body font-semibold text-gray-800">{inq.name}</div>
                      <div className="text-xs text-gray-400 font-body">{new Date(inq.submittedAt).toLocaleDateString("en-IN")} · {inq.source}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <a href={`tel:${inq.phone}`} onClick={(e) => e.stopPropagation()}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-body font-medium">
                      Call
                    </a>
                    <a href={`https://wa.me/91${inq.phone}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-100 font-body font-medium">
                      WhatsApp
                    </a>
                    <select
                      value={inq.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(inq.id, e.target.value as Inquiry["status"]); }}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs px-2 py-1.5 rounded-lg border-0 font-body font-semibold focus:outline-none ${statusColors[inq.status]}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
                {expanded === inq.id && (
                  <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
                    <div className="grid grid-cols-2 gap-4 text-sm font-body">
                      <div><span className="text-gray-400">Phone:</span> <a href={`tel:${inq.phone}`} className="text-brand-blue">{inq.phone}</a></div>
                      {inq.email && <div><span className="text-gray-400">Email:</span> <a href={`mailto:${inq.email}`} className="text-brand-blue">{inq.email}</a></div>}
                    </div>
                    {inq.message && (
                      <p className="mt-3 text-sm text-gray-600 font-body bg-white rounded-lg p-3 border border-gray-100">{inq.message}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
