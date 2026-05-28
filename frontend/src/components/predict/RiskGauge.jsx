import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function RiskGauge({ confidence, riskLevel, color }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md text-center">
      <h3 className="text-lg font-semibold mb-5 text-slate-700">
        Prediction Confidence
      </h3>

      <div className="w-40 h-40 mx-auto">
        <CircularProgressbar
          value={confidence}
          text={`${confidence}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "#e2e8f0",
          })}
        />
      </div>

      <div
        className="mt-5 inline-block px-4 py-2 rounded-full text-sm font-semibold"
        style={{
          backgroundColor: `${color}20`,
          color: color,
        }}
      >
        {riskLevel}
      </div>
    </div>
  );
}
