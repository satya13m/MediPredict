import RiskGauge from "./RiskGauge";
import ShapChart from "./ShapChart";
import ClinicalInsight from "./ClinicalInsight";
import RecommendationBox from "./RecommendationBox";
import PredictionTabs from "./PredictionTabs";
import {
  BarChart3,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  ShieldAlert,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { diseaseConfig } from "@/config/diseaseConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ── CHANGE 1: getRisk now takes both prediction (0/1) AND confidence ──────────
// prediction=0 → model says negative → Low or Borderline based on confidence
// prediction=1 → model says positive → High or Extreme based on confidence
function getRisk(prediction, confidence) {
  let riskLevel = "Low";

  if (prediction === 0) {
    riskLevel = confidence < 0.3 ? "Low" : "Medium";
  } else {
    // Split the positive predictions so lower confidence isn't labeled "High"
    if (confidence < 0.6) {
      riskLevel = "Medium"; // 👈 50.4% confidence will now land here!
    } else if (confidence < 0.8) {
      riskLevel = "High";
    } else {
      riskLevel = "Extreme";
    }
  }

  const map = {
    Low: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700",
      text: "text-emerald-600",
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-100",
    },
    Medium: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      text: "text-amber-600",
      icon: AlertCircle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-100",
    },
    High: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      badge: "bg-orange-100 text-orange-700",
      text: "text-orange-600",
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-100",
    },
    Extreme: {
      bg: "bg-red-50",
      border: "border-red-300",
      badge: "bg-red-200 text-red-800",
      text: "text-red-600",
      icon: ShieldAlert,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
    },
  };

  return {
    level: riskLevel,
    label: `${riskLevel} Risk`,
    ...(map[riskLevel] || map.Low),
  };
}
// ── AI insight generator ──────────────────────────────────────────────────────
function generateInsight(topFactors, disease, riskLabel) {
  if (!topFactors || topFactors.length === 0) return null;
  const top = topFactors[0];
  const increasing = topFactors
    .filter((f) => f.impact === "increases risk")
    .map((f) => f.feature);
  const decreasing = topFactors
    .filter((f) => f.impact === "decreases risk")
    .map((f) => f.feature);
  let insight = `${top.feature} is the strongest contributing factor`;
  insight +=
    top.impact === "increases risk"
      ? ` elevating ${disease} risk`
      : ` reducing overall ${disease} risk`;
  if (increasing.slice(0, 2).length)
    insight += `. Elevated ${increasing.slice(0, 2).join(" and ")} contributed positively to risk`;
  if (decreasing.slice(0, 1).length)
    insight += `, while ${decreasing[0]} helped offset the prediction probability`;
  const advice =
    riskLabel === "Low Risk"
      ? "routine monitoring advised"
      : riskLabel === "Borderline Risk"
        ? "lifestyle changes and follow-up recommended"
        : riskLabel === "High Risk"
          ? "clinical consultation recommended"
          : "immediate medical evaluation advised";
  insight += `. Overall classification: ${riskLabel} — ${advice}.`;
  return insight;
}

// ── Patient summary ───────────────────────────────────────────────────────────
function PatientSummary({ inputs, topFactors }) {
  const increasing = (topFactors || [])
    .filter((f) => f.impact === "increases risk")
    .map((f) => f.feature);
  const displayKeys = Object.keys(inputs || {}).slice(0, 4);
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-blue-600" />
        </div>
        <h4 className="font-semibold text-slate-800">Patient Summary</h4>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {displayKeys.map((key) => (
          <div key={key} className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-0.5">{key}</div>
            <div className="text-sm font-semibold text-slate-700">
              {inputs[key]}
            </div>
          </div>
        ))}
      </div>
      {increasing.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500">Risk drivers:</span>
          {increasing.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-medium"
            >
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ResultCard({ result, disease, onReset }) {
  const config = diseaseConfig[disease];

  // CHANGE 2: pass both result.prediction and result.confidence
  const risk = getRisk(result.prediction, result.confidence);
  const RiskIcon = risk.icon;

  const topFactors = [
    ...(result.top_risk_features ||
      result.top_risk_factors ||
      result.top_risks ||
      []),
  ].sort((a, b) => b.abs_impact - a.abs_impact);

  const chartData = topFactors.map((f) => ({
    name: f.feature.length > 16 ? f.feature.slice(0, 16) + "…" : f.feature,
    value: f.abs_impact,
    impact: f.impact,
  }));

  const insight = generateInsight(topFactors, config.label, risk.label);

  // CHANGE 3: titleMap includes Borderline
  const titleMap = {
    Low: `Low ${config.label} Risk Detected`,
    Borderline: `Borderline ${config.label} Risk Detected`,
    High: `High ${config.label} Risk Detected`,
    Extreme: `Extreme ${config.label} Risk Detected`,
  };

  return (
    <div className="space-y-6">
      {/* TOP GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <RiskGauge
            confidence={parseFloat(result.confidence_percent)}
            riskLevel={risk.label}
            color={
              risk.level === "Low"
                ? "#10b981"
                : risk.level === "Medium"
                  ? "#f59e0b"
                  : risk.level === "High"
                    ? "#f97316"
                    : "#ef4444"
            }
          />

          <ClinicalInsight insight={insight} />
        </div>

        {/* RIGHT */}
        <div>
          <PredictionTabs
            summary={
              <PatientSummary
                inputs={result.input_features}
                topFactors={topFactors}
              />
            }
            shap={<ShapChart factors={topFactors} />}
            recommendations={<RecommendationBox disease={disease} />}
          />
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 text-center leading-relaxed">
        ⚕️ This AI prediction is intended for screening assistance only and
        should not replace professional medical diagnosis.
      </div>

      {/* RESET BUTTON */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full rounded-2xl h-12"
      >
        Run Another Prediction
      </Button>
    </div>
  );
}
