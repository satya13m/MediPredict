import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Heart,
  Activity,
  Brain,
  Microscope,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Stats data ──────────────────────────────────────────────────────────────
const stats = [
  {
    value: "90%",
    label: "Prediction Accuracy",
    desc: "Clinically validated across 4 disease models with high precision.",
  },
  {
    value: "30%",
    label: "Faster Diagnosis",
    desc: "Reduces time-to-insight compared to traditional diagnostic workflows.",
  },
  {
    value: "20%",
    label: "Risk Reduction",
    desc: "Early detection helps prevent disease progression significantly.",
  },
  {
    value: "40%",
    label: "Better Outcomes",
    desc: "Patients with early prediction show improved treatment response.",
  },
];

// ── Disease cards ────────────────────────────────────────────────────────────
const diseases = [
  {
    icon: Activity,
    name: "Diabetes",
    desc: "Predict diabetes risk using glucose, BMI, insulin and 5 other clinical markers.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Heart,
    name: "Heart Disease",
    desc: "Assess cardiovascular risk from ECG, cholesterol, chest pain type and more.",
    color: "bg-red-50 text-red-500",
    border: "border-red-100",
  },
  {
    icon: Microscope,
    name: "Kidney Disease",
    desc: "Detect chronic kidney disease from 24 lab and clinical feature inputs.",
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: Brain,
    name: "Liver Disease",
    desc: "Identify liver disease risk through bilirubin, enzyme levels and protein ratios.",
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
];

// ── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: "Instant Predictions",
    desc: "Get results in under a second powered by trained ML pipelines.",
  },
  {
    icon: BarChart3,
    title: "SHAP Explainability",
    desc: "Understand which features drive each prediction with visual risk factors.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your health data is protected with JWT auth and never shared.",
  },
];

// ── Trusted logos (text-based) ────────────────────────────────────────────────
const trustedBy = [
  "ITER SOA",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 pt-20 pb-28">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              AI-Powered Disease Prediction
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Innovation Inside
              <span className="block text-blue-600">Every Prediction.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              MediPredict uses clinically trained ML pipelines to assess your
              risk for Diabetes, Heart, Kidney, and Liver disease — instantly
              and accurately.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/predict">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Prediction
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="px-8 py-3 text-base rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Mini stats row */}
            <div className="flex gap-8 pt-2">
              {[
                ["10K+", "Predictions"],
                ["4", "Diseases"],
                ["90%", "Accuracy"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-slate-800">{val}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image + floating cards */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-[480px] h-[420px]">
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
                alt="Medical AI"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />

              {/* Floating card 1 */}
              <div className="absolute -left-10 top-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-52">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">AI Analysis</div>
                  <div className="text-sm font-semibold text-slate-800">
                    Real-time Results
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -right-8 bottom-16 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-52">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Precision</div>
                  <div className="text-sm font-semibold text-slate-800">
                    90% Accuracy
                  </div>
                </div>
              </div>

              {/* Floating card 3 */}
              <div className="absolute -bottom-6 left-16 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-52">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">SHAP</div>
                  <div className="text-sm font-semibold text-slate-800">
                    Explainable AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-400 mb-6 uppercase tracking-widest font-medium">
            Under the Supervision
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="text-slate-400 font-bold text-lg tracking-wide hover:text-slate-600 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Comprehensive Diagnostic Solutions
            </h2>
            <p className="text-slate-500">
              Advanced AI for reliable diagnostics across key clinical
              specialties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.value}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-extrabold text-blue-600 mb-2">
                  {s.value}
                </div>
                <div className="text-base font-semibold text-slate-800 mb-2">
                  {s.label}
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISEASE CARDS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-800 leading-tight">
                Smarter Predictions Powered by
                <span className="text-blue-600"> Intelligent ML</span>{" "}
                Pipelines.
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Each disease model is trained on real clinical datasets and
                wrapped in a preprocessing pipeline — just submit your values
                and get an instant, explainable risk assessment.
              </p>
              <Link to="/predict">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2">
                  Try Prediction <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right disease cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {diseases.map((d) => (
                <div
                  key={d.name}
                  className={`rounded-2xl p-6 border ${d.border} bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${d.color}`}
                  >
                    <d.icon className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-slate-800 mb-1">
                    {d.name}
                  </div>
                  <div className="text-sm text-slate-500 leading-relaxed">
                    {d.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Transform Your Health
                <span className="block text-blue-200">Decision Making</span>
              </h2>
              <p className="text-blue-100 leading-relaxed">
                Empower your healthcare decisions with AI-driven predictions,
                explainable results, and a seamless user experience designed for
                everyone.
              </p>
              <div className="flex gap-4">
                <Link to="/predict">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-semibold">
                    Start Predicting
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="border-white/30 text-blue-500 hover:bg-white/10 rounded-xl hover:text-white"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 flex items-start gap-4 hover:bg-white/15 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">
                      {f.title}
                    </div>
                    <div className="text-sm text-blue-100 leading-relaxed">
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-slate-800">
            Ready to Predict Your Health Risk?
          </h2>
          <p className="text-slate-500 text-lg">
            Sign up free and get instant AI-powered disease risk assessments
            with full explainability.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base rounded-xl shadow-lg shadow-blue-200">
                Get Started Free
              </Button>
            </Link>
            <Link to="/predict">
              <Button
                variant="outline"
                className="px-8 py-3 text-base rounded-xl border-slate-200 text-slate-600"
              >
                Try a Prediction
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">MediPredict</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered disease prediction for better health decisions.
            </p>
          </div>
          {[
            { title: "Product", links: ["Predict", "History", "About"] },
            {
              title: "Diseases",
              links: ["Diabetes", "Heart", "Kidney", "Liver"],
            },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-white font-semibold mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm hover:text-white transition-colors cursor-pointer">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
          © 2026 MediPredict. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
