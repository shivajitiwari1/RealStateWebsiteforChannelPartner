"use client";

import { useState, useTransition } from "react";

export default function MaintenanceToggle({ initialValue }: { initialValue: boolean }) {
  const [isOn, setIsOn] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    startTransition(async () => {
      const res = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenance: !isOn }),
      });
      if (res.ok) setIsOn(!isOn);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isOn ? "bg-amber-100" : "bg-emerald-100"}`}>
          {isOn ? "🚧" : "🌐"}
        </div>
        <div>
          <div className="text-sm font-body font-semibold text-gray-800">Maintenance Mode</div>
          <div className={`text-xs font-body mt-0.5 font-medium ${isOn ? "text-amber-600" : "text-emerald-600"}`}>
            {isOn ? "Site is hidden from visitors" : "Site is live for visitors"}
          </div>
        </div>
      </div>

      <button
        onClick={toggle}
        disabled={isPending}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-60 ${
          isOn ? "bg-amber-500" : "bg-emerald-500"
        }`}
        aria-label="Toggle maintenance mode"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
