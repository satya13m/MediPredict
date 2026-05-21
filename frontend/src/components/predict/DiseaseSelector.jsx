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
    <div className="space-y-8">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Select Target Classifier
        </h2>
        <p className="text-slate-400 text-sm font-medium">
          Route your telemetry data through a distinct, isolated deep learning
          model.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(diseaseConfig).map(([key, config]) => {
          const Icon = iconMap[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`text-left rounded-3xl p-6 border-2 relative overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[190px]
                ${
                  isSelected
                    ? `${config.border} bg-white shadow-xl shadow-slate-100/80 -translate-y-1`
                    : "border-slate-100 bg-white hover:border-slate-200 hover:-translate-y-0.5 shadow-sm"
                }`}
            >
              {/* Left Accent Strip when Selected */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-opacity duration-300 ${isSelected ? config.accent : "bg-transparent"}`}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                    ${isSelected ? `${config.accent} text-white shadow-md` : `${config.light} ${config.text}`}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  {isSelected && (
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md ${config.light} ${config.text}`}
                    >
                      ✓ Active Target
                    </span>
                  )}
                </div>

                <div className="font-black text-slate-900 text-lg mb-1">
                  {config.label} Model
                </div>
                <div className="text-sm text-slate-400 font-medium leading-relaxed">
                  {config.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
