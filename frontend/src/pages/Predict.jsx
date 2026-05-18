import { useState } from "react";
import DiseaseSelector from "@/components/predict/DiseaseSelector";
import PredictForm from "@/components/predict/PredictForm";
import ResultCard from "@/components/predict/ResultCard";
import { usePredict } from "@/hooks/usePredict";

// Step indicators
const steps = ["Select Disease", "Enter Details", "View Results"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                ${done ? "bg-blue-600 text-white" : active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${active ? "text-slate-800" : "text-slate-400"}`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ${done ? "bg-blue-600" : "bg-slate-200"}`}
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

  const handleSelectDisease = (d) => setDisease(d);

  const handleNext = () => {
    if (step === 0 && disease) setStep(1);
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
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Disease Risk Prediction
          </h1>
          <p className="text-slate-500 mt-2">
            AI-powered assessment in seconds
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          {/* Step 0 — Disease selector */}
          {step === 0 && (
            <div className="space-y-6">
              <DiseaseSelector
                selected={disease}
                onSelect={handleSelectDisease}
              />
              <button
                onClick={handleNext}
                disabled={!disease}
                className={`w-full py-3 rounded-xl text-white font-semibold text-base transition-all
                  ${
                    disease
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 1 — Form */}
          {step === 1 && (
            <PredictForm
              disease={disease}
              onSubmit={handleSubmit}
              onBack={() => setStep(0)}
              isLoading={isPending}
            />
          )}

          {/* Step 2 — Result */}
          {step === 2 && data && (
            <ResultCard
              result={data.data}
              disease={disease}
              onReset={handleReset}
            />
          )}

          {/* API error */}
          {error && step === 1 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {error.response?.data?.detail ||
                "Prediction failed. Please try again."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
