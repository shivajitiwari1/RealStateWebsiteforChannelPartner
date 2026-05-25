import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/data";

const TYPE_BADGE: Record<Property["type"], { label: string; cls: string }> = {
  residential:  { label: "Residential",  cls: "bg-blue-500/90 text-white" },
  commercial:   { label: "Commercial",   cls: "bg-amber-500/90 text-white" },
  "new-launch": { label: "New Launch",   cls: "bg-emerald-500/90 text-white" },
  plot:         { label: "Plot",         cls: "bg-violet-500/90 text-white" },
};

const CITY_LABEL: Record<Property["city"], string> = {
  noida: "Noida",
  "greater-noida": "Greater Noida",
  gurgaon: "Gurgaon",
  faridabad: "Faridabad",
  ghaziabad: "Ghaziabad",
  delhi: "Delhi",
};

interface Props {
  property: Property;
  compact?: boolean;
}

export default function PropertyCard({ property, compact = false }: Props) {
  const hasImage = property.images && property.images.length > 0;
  const badge = TYPE_BADGE[property.type];

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(59,108,181,0.08)] hover:shadow-[0_12px_40px_rgba(59,108,181,0.18)] transition-all duration-400 hover:-translate-y-1"
    >
      {/* Image wrapper */}
      <div className={`relative overflow-hidden ${compact ? "h-44" : "h-56"} bg-gradient-to-br from-slate-100 to-blue-50`}>
        {hasImage ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-14 h-14 text-brand-blue/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12L12 3L21 12M5 10V20H10V15H14V20H19V10" />
            </svg>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Type badge — top left */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold backdrop-blur-sm ${badge.cls}`}>
            {badge.label}
          </span>
        </div>

        {/* Price — bottom left over image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="font-display font-bold text-white text-xl drop-shadow-md">
            {property.priceLabel}
          </span>
          {property.areaSqft > 0 && (
            <span className="text-white/80 text-xs font-body bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
              {property.areaSqft.toLocaleString()} sqft
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-2 group-hover:text-brand-blue transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-body">
          <svg className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{property.area}, {CITY_LABEL[property.city]}</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-500 font-body">
              <svg className="w-3.5 h-3.5 text-brand-blue/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-500 font-body">
              <svg className="w-3.5 h-3.5 text-brand-blue/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 12a8 8 0 018-8m-8 8a8 8 0 008 8" />
              </svg>
              {property.bathrooms} Bath
            </span>
          )}
          <span className="ml-auto text-xs font-body font-semibold text-brand-blue group-hover:underline">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
