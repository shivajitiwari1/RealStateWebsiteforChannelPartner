"use client";

interface Props {
  currentSort: string;
  city?: string;
  type?: string;
}

export default function SortSelect({ currentSort, city, type }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (e.target.value) params.set("sort", e.target.value);
    params.set("page", "1");
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="text-sm border border-gray-200 rounded-lg px-3 py-2 font-body text-gray-700 focus:outline-none focus:border-brand-blue"
    >
      <option value="">Newest First</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
