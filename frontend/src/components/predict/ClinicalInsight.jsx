import { Brain } from "lucide-react";

export default function ClinicalInsight({ insight }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
      <div className="flex gap-3">
        <div className="bg-blue-100 p-3 rounded-xl h-fit">
          <Brain className="w-5 h-5 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-blue-800 mb-2">
            AI Clinical Insight
          </h3>

          <p className="text-sm text-blue-700 leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
}
