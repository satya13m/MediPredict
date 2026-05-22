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

  const topFactors = [...(result.top_risk_factors || [])].sort(
    (a, b) => b.abs_impact - a.abs_impact,
  );

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
    <div className="space-y-5">
      {/* Main result */}
      <div
        className={`rounded-2xl p-8 text-center border-2 ${risk.bg} ${risk.border}`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${risk.iconBg}`}
        >
          <RiskIcon className={`w-8 h-8 ${risk.iconColor}`} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">
          {titleMap[risk.level]}
        </h3>
        <p className={`text-5xl font-extrabold mt-3 ${risk.text}`}>
          {result.confidence_percent}
        </p>
        <p className="text-slate-500 text-sm mt-1">Prediction Confidence</p>
        <div
          className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${risk.badge}`}
        >
          {risk.label}
        </div>
      </div>

      {/* Patient summary */}
      {result.input_features && (
        <PatientSummary
          inputs={result.input_features}
          topFactors={topFactors}
        />
      )}

      {/* AI insight */}
      {insight && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-blue-800 mb-1">
              AI Clinical Insight
            </div>
            <p className="text-sm text-blue-700 leading-relaxed">{insight}</p>
          </div>
        </div>
      )}

      {/* SHAP chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className={`w-5 h-5 ${config.text}`} />
            <h4 className="font-semibold text-slate-800">
              Top Risk Factors (SHAP)
            </h4>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 8, right: 24 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => v.toFixed(2)}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11 }}
                width={130}
              />
              <Tooltip
                formatter={(val, _, props) => [
                  val.toFixed(4),
                  props.payload.impact,
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.impact === "increases risk" ? "#ef4444" : "#10b981"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-red-400 inline-block" />{" "}
              Increases risk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />{" "}
              Decreases risk
            </span>
          </div>
        </div>
      )}

      {/* No SHAP available — show a friendly explanation */}
      {chartData.length === 0 &&
        result.shap_values &&
        Object.keys(result.shap_values).length === 0 && (
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-sm text-slate-600">
            SHAP explanations are not available for this model type. The backend
            attempted multiple explainers and fell back to a model-appropriate
            method; try a different sample or check server logs for details.
          </div>
        )}

      {/* Factor breakdown */}
      {topFactors.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h4 className="font-semibold text-slate-800 mb-4">
            Factor Breakdown
          </h4>
          <div className="space-y-3">
            {topFactors.map((f, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="text-sm text-slate-700 font-medium">
                  {f.feature}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      f.impact === "increases risk"
                        ? "bg-red-50 text-red-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {f.impact}
                  </div>
                  <div className="text-xs text-slate-400 w-16 text-right font-mono">
                    {f.shap_value > 0 ? "+" : ""}
                    {f.shap_value.toFixed(3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 text-center leading-relaxed">
        ⚕️ This AI prediction is intended for screening assistance only and
        should not replace professional medical diagnosis. Please consult a
        qualified healthcare provider for clinical decisions.
      </div>

      {/* Reset */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full rounded-xl border-slate-200 text-slate-600 flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Run Another Prediction
      </Button>
    </div>
  );
}
