import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import PropertyCard from "../components/PropertyCard";
import SortSelect from "../components/SortSelect";
import { getAvailableProperties, Property } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Properties",
  description: "Browse all available properties across Delhi NCR — flats, apartments, commercial spaces, plots and new launches.",
};

interface Props {
  searchParams: { city?: string; type?: string; sort?: string; page?: string };
}

const CITY_LABELS: Record<string, string> = {
  noida: "Noida",
  "greater-noida": "Greater Noida",
  gurgaon: "Gurgaon",
  faridabad: "Faridabad",
  ghaziabad: "Ghaziabad",
  delhi: "Delhi",
};

const PAGE_SIZE = 12;

export default async function PropertiesPage({ searchParams }: Props) {
  const { city, type, sort, page } = searchParams;
  const currentPage = parseInt(page || "1", 10);

  let properties = await getAvailableProperties();

  if (city) properties = properties.filter((p) => p.city === city);
  if (type) properties = properties.filter((p) => p.type === (type as Property["type"]));

  if (sort === "price-asc") properties = [...properties].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") properties = [...properties].sort((a, b) => b.price - a.price);
  else properties = [...properties].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

  const totalCount = properties.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const paginated = properties.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const buildUrl = (params: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    if (city) p.set("city", city);
    if (type) p.set("type", type);
    if (sort) p.set("sort", sort);
    Object.entries(params).forEach(([k, v]) => { if (v) p.set(k, v); else p.delete(k); });
    return `/properties?${p.toString()}`;
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-emerald-900 via-[#1a4030] to-emerald-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            {city && CITY_LABELS[city] ? `Properties in ${CITY_LABELS[city]}` : "All Properties"}
          </h1>
          <p className="text-white/70 font-body">{totalCount} properties found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-20">
              <h3 className="font-display font-semibold text-gray-900 mb-5">Filters</h3>

              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2.5 font-body">City</label>
                <div className="space-y-2">
                  {[
                    { value: "", label: "All Cities" },
                    ...Object.entries(CITY_LABELS).map(([value, label]) => ({ value, label })),
                  ].map(({ value, label }) => (
                    <a
                      key={value}
                      href={buildUrl({ city: value || undefined, page: "1" })}
                      className={`block px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                        (city || "") === value
                          ? "bg-brand-blue text-white"
                          : "text-gray-600 hover:bg-brand-accent hover:text-brand-blue"
                      }`}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mb-5 border-t border-gray-100 pt-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2.5 font-body">Property Type</label>
                <div className="space-y-2">
                  {[
                    { value: "", label: "All Types" },
                    { value: "residential", label: "Residential" },
                    { value: "commercial", label: "Commercial" },
                    { value: "new-launch", label: "New Launch" },
                    { value: "plot", label: "Plot" },
                  ].map(({ value, label }) => (
                    <a
                      key={value}
                      href={buildUrl({ type: value || undefined, page: "1" })}
                      className={`block px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                        (type || "") === value
                          ? "bg-brand-blue text-white"
                          : "text-gray-600 hover:bg-brand-accent hover:text-brand-blue"
                      }`}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {(city || type) && (
                <a
                  href="/properties"
                  className="block text-center text-sm text-red-500 hover:text-red-700 font-body mt-4 border-t border-gray-100 pt-4"
                >
                  Clear all filters
                </a>
              )}
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 font-body">
                Showing {totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
              </p>
              <SortSelect currentSort={sort || ""} city={city} type={type} />
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12L12 3L21 12M5 10V20H10V15H14V20H19V10" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-2">No properties found</h3>
                <p className="text-sm text-gray-500 font-body mb-5">Try adjusting your filters.</p>
                <a href="/properties" className="btn-outline">View All Properties</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {currentPage > 1 && (
                  <a href={buildUrl({ page: String(currentPage - 1) })} className="btn-outline px-4 py-2 text-sm">
                    ← Prev
                  </a>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={buildUrl({ page: String(p) })}
                    className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-colors ${
                      p === currentPage
                        ? "bg-brand-blue text-white"
                        : "border border-gray-200 text-gray-600 hover:border-brand-blue hover:text-brand-blue"
                    }`}
                  >
                    {p}
                  </a>
                ))}
                {currentPage < totalPages && (
                  <a href={buildUrl({ page: String(currentPage + 1) })} className="btn-outline px-4 py-2 text-sm">
                    Next →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
