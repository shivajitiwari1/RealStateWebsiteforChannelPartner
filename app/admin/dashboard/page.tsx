import Link from "next/link";
import { getProperties, getInquiries, getAdminConfig } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const properties = getProperties();
  const inquiries = getInquiries();
  const admin = getAdminConfig();

  const availableCount = properties.filter((p) => p.status === "available").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;
  const cityBreakdown = properties.reduce<Record<string, number>>((acc, p) => {
    acc[p.city] = (acc[p.city] || 0) + 1;
    return acc;
  }, {});

  const CITY_LABELS: Record<string, string> = {
    noida: "Noida",
    "greater-noida": "Greater Noida",
    gurgaon: "Gurgaon",
    faridabad: "Faridabad",
    ghaziabad: "Ghaziabad",
    delhi: "Delhi",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Topbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L12 3L21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 10V20H10V15H14V20H19V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-gray-900">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-sm text-gray-500 hover:text-brand-blue font-body">
            View Site ↗
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="text-sm text-red-500 hover:text-red-700 font-body">Logout</button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-gray-900">Welcome back, {admin.brokerName}</h1>
          <p className="text-sm text-gray-500 font-body mt-1">Here&apos;s what&apos;s happening across your listings.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Properties", value: properties.length, sub: `${availableCount} available`, color: "bg-blue-500", href: "/admin/properties" },
            { label: "New Inquiries", value: newInquiries, sub: `${inquiries.length} total`, color: "bg-amber-500", href: "/admin/inquiries" },
            { label: "Cities Active", value: Object.keys(cityBreakdown).length, sub: "of 6 covered", color: "bg-emerald-500", href: null },
            { label: "Total Inquiries", value: inquiries.length, sub: `${inquiries.filter(i => i.status === "closed").length} closed`, color: "bg-purple-500", href: "/admin/inquiries" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 shadow-card">
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <div className="w-4 h-4 bg-white/40 rounded" />
              </div>
              <div className="font-display text-3xl font-bold text-gray-900">{card.value}</div>
              <div className="text-sm font-body font-medium text-gray-600 mt-0.5">{card.label}</div>
              <div className="text-xs text-gray-400 font-body mt-1">{card.sub}</div>
              {card.href && (
                <Link href={card.href} className="mt-3 block text-xs text-brand-blue font-body hover:underline">
                  Manage →
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* City breakdown */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-display font-semibold text-gray-900 mb-4">Properties by City</h2>
            <div className="space-y-3">
              {Object.entries(cityBreakdown).map(([city, count]) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="text-sm font-body text-gray-700 w-32">{CITY_LABELS[city] || city}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-brand-blue h-2 rounded-full"
                      style={{ width: `${(count / properties.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-body font-semibold text-gray-700 w-6">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-gray-900">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs text-brand-blue font-body hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-body font-medium text-gray-800 truncate">{inq.name}</div>
                    <div className="text-xs text-gray-400 font-body">{inq.phone}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg font-body font-semibold flex-shrink-0 ${
                    inq.status === "new" ? "bg-amber-100 text-amber-700" :
                    inq.status === "contacted" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {inq.status}
                  </span>
                </div>
              ))}
              {inquiries.length === 0 && (
                <p className="text-sm text-gray-400 font-body">No inquiries yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { href: "/admin/properties", label: "Manage Properties", icon: "🏠" },
            { href: "/admin/inquiries", label: "View Inquiries", icon: "📩" },
            { href: "/properties", label: "Public Listings", icon: "🌐" },
            { href: "/contact", label: "Contact Page", icon: "📞" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-xl p-4 text-center shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="text-2xl mb-2">{link.icon}</div>
              <div className="text-xs font-body font-medium text-gray-700">{link.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
