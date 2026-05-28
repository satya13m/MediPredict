import { CheckCircle } from "lucide-react";

export default function RecommendationBox({ disease }) {
  const recommendations = {
    Diabetes: [
      "Regular blood sugar monitoring",
      "Reduce sugar intake",
      "Increase physical activity",
      "Consult endocrinologist",
    ],

    Heart: [
      "Reduce cholesterol intake",
      "Maintain healthy blood pressure",
      "Regular cardiac screening",
      "Exercise consistently",
    ],

    Kidney: [
      "Increase hydration",
      "Monitor creatinine levels",
      "Avoid excessive salt intake",
      "Consult nephrologist",
    ],

    Liver: [
      "Avoid alcohol consumption",
      "Monitor liver enzymes",
      "Maintain healthy diet",
      "Regular liver screening",
    ],
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-5 text-slate-700">
        Clinical Recommendations
      </h3>

      <div className="space-y-4">
        {recommendations[disease]?.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500" />

            <span className="text-sm text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
