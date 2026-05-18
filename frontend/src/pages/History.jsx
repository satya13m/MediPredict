import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHistory,
  getStats,
  deleteHistory,
} from "@/services/history.service";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Activity,
  Heart,
  Microscope,
  Brain,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Helpers ───────────────────────────────────────────────────────────────────
const DISEASE_COLORS = {
  Diabetes: "bg-blue-50 text-blue-700",
  Heart: "bg-red-50 text-red-600",
  Kidney: "bg-purple-50 text-purple-700",
  Liver: "bg-amber-50 text-amber-700",
};

const RISK_COLORS = {
  Low: "bg-emerald-100 text-emerald-700",
  High: "bg-red-100 text-red-700",
};

const DISEASE_ICONS = {
  Diabetes: Activity,
  Heart: Heart,
  Kidney: Microscope,
  Liver: Brain,
};

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ stats }) {
  if (!stats) return null;
  const cards = [
    {
      label: "Total Predictions",
      value: stats.total_predictions,
      color: "text-blue-600",
    },
    ...Object.entries(stats.by_disease || {}).map(([d, c]) => ({
      label: d,
      value: c,
      color: "text-slate-700",
    })),
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {cards.slice(0, 4).map((c) => (
        <div
          key={c.label}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
        >
          <div className={`text-3xl font-bold ${c.color}`}>{c.value}</div>
          <div className="text-sm text-slate-500 mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function DeleteButton({ id, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  if (confirm)
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => onDelete(id)}
          className="text-xs text-red-600 font-semibold hover:underline"
        >
          Sure?
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-xs text-slate-400 hover:underline ml-1"
        >
          No
        </button>
      </div>
    );
  return (
    <button
      onClick={() => setConfirm(true)}
      className="text-slate-300 hover:text-red-400 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function History() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [diseaseFilter, setDiseaseFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const PAGE_SIZE = 10;

  // Fetch history
  const { data, isLoading, isError } = useQuery({
    queryKey: ["history", page, diseaseFilter, riskFilter],
    queryFn: () =>
      getHistory({
        page,
        page_size: PAGE_SIZE,
        ...(diseaseFilter && { disease: diseaseFilter }),
        ...(riskFilter && { risk_level: riskFilter }),
      }),
    keepPreviousData: true,
  });

  // Fetch stats
  const { data: statsData } = useQuery({
    queryKey: ["history-stats"],
    queryFn: getStats,
  });

  // Delete mutation
  const { mutate: doDelete } = useMutation({
    mutationFn: (id) => deleteHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["history-stats"] });
    },
  });

  const history = data?.data;
  const stats = statsData?.data;
  const results = history?.results || [];
  const total = history?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const resetFilters = () => {
    setDiseaseFilter("");
    setRiskFilter("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Prediction History
          </h1>
          <p className="text-slate-500 mt-1">
            All your past AI-powered disease risk assessments
          </p>
        </div>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mr-2">
            Filter by:
          </div>

          {/* Disease filter */}
          <select
            value={diseaseFilter}
            onChange={(e) => {
              setDiseaseFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Diseases</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Heart">Heart</option>
            <option value="Kidney">Kidney</option>
            <option value="Liver">Liver</option>
          </select>

          {/* Risk filter */}
          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Risk Levels</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>

          {(diseaseFilter || riskFilter) && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Clear filters
            </button>
          )}

          <div className="ml-auto text-sm text-slate-400">
            {total} result{total !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center text-slate-400">
              <BarChart3 className="w-8 h-8 mx-auto mb-3 animate-pulse" />
              Loading predictions...
            </div>
          ) : isError ? (
            <div className="p-16 text-center text-red-400">
              Failed to load history. Please try again.
            </div>
          ) : results.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <Clock className="w-10 h-10 mx-auto text-slate-200" />
              <div className="text-slate-500 font-medium">
                No predictions yet
              </div>
              <div className="text-slate-400 text-sm">
                Run your first prediction to see it here.
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Disease
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Key Inputs
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {results.map((row) => {
                    const Icon = DISEASE_ICONS[row.disease] || Activity;
                    const inputKeys = Object.keys(row.inputs || {}).slice(0, 2);
                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Disease */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${DISEASE_COLORS[row.disease] || "bg-slate-50 text-slate-500"}`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-slate-800">
                              {row.disease}
                            </span>
                          </div>
                        </td>

                        {/* Risk */}
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${RISK_COLORS[row.risk_level] || "bg-slate-100 text-slate-600"}`}
                          >
                            {row.risk_level}
                          </span>
                        </td>

                        {/* Confidence */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${row.risk_level === "High" ? "bg-red-400" : "bg-emerald-400"}`}
                                style={{ width: row.confidence_percent }}
                              />
                            </div>
                            <span className="text-slate-700 font-medium">
                              {row.confidence_percent}
                            </span>
                          </div>
                        </td>

                        {/* Key inputs */}
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {inputKeys.map((k) => (
                              <span
                                key={k}
                                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                              >
                                {k}: {row.inputs[k]}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                          {formatDate(row.created_at)}
                        </td>

                        {/* Delete */}
                        <td className="px-6 py-4">
                          <DeleteButton id={row.id} onDelete={doDelete} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-xl border-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-xl border-slate-200"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
