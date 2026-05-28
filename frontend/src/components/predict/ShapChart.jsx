import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ShapChart({ factors }) {
  const data = factors.map((f) => ({
    name: f.feature,
    value: f.abs_impact,
    impact: f.impact,
  }));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-5 text-slate-700">
        SHAP Feature Impact
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" hide />

          <YAxis type="category" dataKey="name" width={120} />

          <Tooltip />

          <Bar dataKey="value" radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.impact === "increases risk" ? "#ef4444" : "#10b981"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
