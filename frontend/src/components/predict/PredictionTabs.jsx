import { useState } from "react";

export default function PredictionTabs({ summary, shap, recommendations }) {
  const [active, setActive] = useState("summary");

  const tabs = [
    {
      key: "summary",
      label: "Summary",
    },
    {
      key: "shap",
      label: "SHAP Analysis",
    },
    {
      key: "recommendations",
      label: "Recommendations",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              active === tab.key
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {active === "summary" && summary}

        {active === "shap" && shap}

        {active === "recommendations" && recommendations}
      </div>
    </div>
  );
}
