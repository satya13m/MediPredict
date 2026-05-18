import { Activity, Heart, Microscope, Brain } from "lucide-react";
import { diseaseConfig } from "@/config/diseaseConfig";

const iconMap = {
  Diabetes: Activity,
  Heart: Heart,
  Kidney: Microscope,
  Liver: Brain,
};

export default function DiseaseSelector({ selected, onSelect }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Select a Disease</h2>
        <p className="text-slate-500">
          Choose the condition you want to assess
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(diseaseConfig).map(([key, config]) => {
          const Icon = iconMap[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`text-left rounded-2xl p-6 border-2 transition-all hover:shadow-md hover:-translate-y-0.5
                ${
                  isSelected
                    ? `${config.border} ${config.light} shadow-md -translate-y-0.5`
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4
                ${isSelected ? `${config.accent} text-white` : `${config.light} ${config.text}`}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-semibold text-slate-800 mb-1">
                {config.label}
              </div>
              <div className="text-sm text-slate-500 leading-relaxed">
                {config.description}
              </div>
              {isSelected && (
                <div className={`mt-3 text-xs font-medium ${config.text}`}>
                  ✓ Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
