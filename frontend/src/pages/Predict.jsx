import { useState } from "react";

/* ========================= NEW IMPORTS ADDED ========================= */
import { Link } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
/* ==================================================================== */

import DiseaseSelector from "@/components/predict/DiseaseSelector";
import PredictForm from "@/components/predict/PredictForm";
import ResultCard from "@/components/predict/ResultCard";
import { usePredict } from "@/hooks/usePredict";

function formatErrorDetail(detail) {
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (item?.msg && Array.isArray(item.loc)) {
          return `${item.loc.join(".")}: ${item.msg}`;
        }
        return typeof item === "string" ? item : JSON.stringify(item);
      })
      .join("; ");
  }

  if (typeof detail === "object") {
    return JSON.stringify(detail);
  }

  return String(detail);
}

// Step indicators
const steps = [
  "Select Target Disease",
  "Configure Biomarkers",
  "Analyze Report",
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12 bg-white px-6 py-4 rounded-2xl border border-slate-100/80 shadow-sm max-w-xl mx-auto">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm
                ${
                  done
                    ? "bg-blue-600 text-white"
                    : active
                      ? "bg-blue-600 text-white ring-4 ring-blue-50"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>

              <span
                className={`text-xs font-bold tracking-wide uppercase hidden md:block transition-colors ${
                  active ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 rounded-full transition-colors ${
                  done ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Predict() {
  const [step, setStep] = useState(0);
  const [disease, setDisease] = useState(null);

  const { mutate, data, isPending, error, reset } = usePredict();

  /* ========================= NEW AUTH CHECK ADDED ========================= */
  const token = useAuthStore((s) => s.token);
  /* ====================================================================== */

  const handleSelectDisease = (d) => setDisease(d);

  const handleNext = () => {
    if (step === 0 && disease) {
      setStep(1);
    }
  };

  const handleSubmit = (features) => {
    mutate(
      { disease, features },
      {
        onSuccess: () => setStep(2),
      },
    );
  };

  const handleReset = () => {
    setStep(0);
    setDisease(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Dynamic size constraint */}
      <div
        className={`mx-auto transition-all duration-500 ease-in-out ${
          step === 1 ? "max-w-6xl" : "max-w-3xl"
        }`}
      >
        {/* Page title */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            Analytical Ingestion Framework
          </span>

          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Disease Risk Prediction
          </h1>

          <p className="text-slate-500 text-base max-w-md mx-auto">
            Evaluate localized binary neural networks with interactive biomarker
            parameters.
          </p>
        </div>

        {/* ========================= NEW LOGIN INFO BOX ADDED ========================= */}
        {!token && (
          <div className="max-w-2xl mx-auto mb-8 bg-blue-50 border border-blue-100 text-blue-700 px-5 py-4 rounded-2xl text-sm text-center shadow-sm">
            <div className="font-semibold text-base mb-1">
              Guest Access Enabled
            </div>

            <p className="text-sm leading-relaxed">
              You can use unlimited disease predictions without login.
              <br />
              Login or Register only if you want to save and access prediction
              history later.
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 border border-blue-200 rounded-xl text-sm font-semibold hover:bg-blue-100 transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
        {/* ========================================================================== */}

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Main Interface */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.05)] p-8 sm:p-12 transition-all">
          {/* Step 0 */}
          {step === 0 && (
            <div className="space-y-8">
              <DiseaseSelector
                selected={disease}
                onSelect={handleSelectDisease}
              />

              <button
                onClick={handleNext}
                disabled={!disease}
                className={`w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2
                  ${
                    disease
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/10 hover:-translate-y-0.5"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
              >
                Access Diagnostic Form →
              </button>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <PredictForm
              disease={disease}
              onSubmit={handleSubmit}
              onBack={() => setStep(0)}
              isLoading={isPending}
            />
          )}

          {/* Step 2 */}
          {step === 2 && data && (
            <ResultCard
              result={data.data}
              disease={disease}
              onReset={handleReset}
            />
          )}

          {/* API Error */}
          {error && step === 1 && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-sm font-semibold text-rose-600 flex items-center gap-2">
              ⚠️{" "}
              {formatErrorDetail(
                error.response?.data?.detail ||
                  error.response?.data ||
                  error.message ||
                  "Prediction system encountered an architectural validation error. Please check parameters.",
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
