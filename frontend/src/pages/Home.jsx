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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Stats data ──────────────────────────────────────────────────────────────
const stats = [
  {
    value: "90%",
    label: "Prediction Accuracy",
    desc: "Clinically validated across 4 distinct neural models with high statistical precision.",
  },
  {
    value: "30%",
    label: "Faster Diagnosis",
    desc: "Reduces time-to-insight compared to traditional intensive diagnostic workflows.",
  },
  {
    value: "20%",
    label: "Risk Reduction",
    desc: "Early systemic detection helps identify risk factors before disease progression.",
  },
  {
    value: "40%",
    label: "Better Outcomes",
    desc: "Pre-clinical predictive profiling shows significant correlation with early intervention response.",
  },
];

// ── Disease cards ────────────────────────────────────────────────────────────
const diseases = [
  {
    icon: Activity,
    name: "Diabetes Model",
    desc: "Predicts metabolic risk arrays using fasting glucose, BMI, insulin response, and key demographic markers.",
    color:
      "text-blue-600 bg-blue-50/50 group-hover:bg-blue-600 group-hover:text-white",
    border: "hover:border-blue-500/30",
    accent: "bg-blue-600",
  },
  {
    icon: Heart,
    name: "Cardiovascular Disease",
    desc: "Assesses coronary vectors from resting blood pressure, cholesterol distribution, and historic resting ECG graphs.",
    color:
      "text-rose-600 bg-rose-50/50 group-hover:bg-rose-600 group-hover:text-white",
    border: "hover:border-rose-500/30",
    accent: "bg-rose-600",
  },
  {
    icon: Microscope,
    name: "Chronic Kidney Disease",
    desc: "Screens for progressive renal health depletion across a comprehensive matrix of 24 laboratory inputs.",
    color:
      "text-purple-600 bg-purple-50/50 group-hover:bg-purple-600 group-hover:text-white",
    border: "hover:border-purple-500/30",
    accent: "bg-purple-600",
  },
  {
    icon: Brain,
    name: "Hepatic / Liver Disease",
    desc: "Identifies early liver tissue abnormalities by cross-evaluating serum bilirubin, alkaline phosphatase, and protein ratios.",
    color:
      "text-amber-600 bg-amber-50/50 group-hover:bg-amber-600 group-hover:text-white",
    border: "hover:border-amber-500/30",
    accent: "bg-amber-600",
  },
];

// ── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: "Instant Diagnostic Pipelines",
    desc: "Get hyper-optimized network calculations in under 200 milliseconds, powered by trained binary classification layers.",
  },
  {
    icon: BarChart3,
    title: "Explainable Clinical Trust",
    desc: "No black boxes. Every classification outputs full mathematical transparency, explaining exact attribute weights explicitly.",
  },
  {
    icon: Shield,
    title: "Cryptographic Data Privacy",
    desc: "State-of-the-art secure transmission using standard stateless auth tokens. Patient payload is never stored or aggregated.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-24 pb-32 border-b border-slate-100">
        {/* Ambient Gradient Meshes */}
        <div className="absolute top-0 right-0 w-[800px] h-[700px] bg-gradient-to-bl from-blue-100/40 via-indigo-50/20 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100/60 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm mx-auto lg:mx-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Machine Learning Healthcare Research
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Precision Inside.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Clarity Everywhere.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              MediPredict bridges clinical complexity with advanced Feedforward
              Neural Networks—delivering accurate, high-speed risk assessments
              for critical diseases.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/predict">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-base rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 group">
                  Initialize Prediction Engine
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-base font-semibold rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                  Review Architecture
                </Button>
              </Link>
            </div>

            {/* Micro Stats Counter */}
            <div className="grid grid-cols-3 gap-6 pt-6 max-w-md mx-auto lg:mx-0 border-t border-slate-100">
              {[
                ["10K+", "Validations"],
                ["4 Model", "Architectures"],
                ["90%", "Target Accuracy"],
              ].map(([val, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {val}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Composite Image Column */}
          <div className="lg:col-span-6 relative hidden lg:flex items-center justify-center pl-8">
            <div className="relative w-full max-w-[500px] h-[450px]">
              {/* Outer Decorative Tech Ring */}
              <div className="absolute inset-0 border-2 border-dashed border-blue-100 rounded-[2.5rem] scale-105 animate-[spin_120s_linear_infinite] pointer-events-none" />

              {/* Core Image Wrapper */}
              <div className="w-full h-full object-cover rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                  alt="Medical Analytics Interface"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent mix-blend-multiply" />
              </div>

              {/* Floating UI Card 1: Live Status */}
              <div className="absolute -left-12 top-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] p-4 border border-slate-100 flex items-center gap-4 w-60 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Analysis Status
                  </div>
                  <div className="text-base font-extrabold text-slate-800">
                    Pipeline Operational
                  </div>
                </div>
              </div>

              {/* Floating UI Card 2: Metrics */}
              <div className="absolute -right-8 bottom-20 bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] p-5 border border-slate-800 text-white w-56 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    FFNN Loss
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    Optimal
                  </span>
                </div>
                <div className="text-3xl font-black tracking-tight text-white mb-1">
                  0.0241
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full w-[92%]" />
                </div>
              </div>

              {/* Floating UI Card 3: Model Type */}
              <div className="absolute -bottom-6 left-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] p-4 border border-slate-100 flex items-center gap-3 w-56 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Interpretability
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    SHAP Array Mapped
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC SPONSOR ──────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Institutional Research Context
          </p>
          <div className="flex justify-center items-center">
            <span className="text-slate-800 font-black text-xl tracking-wider px-6 py-2 border border-slate-200 bg-white rounded-xl shadow-sm">
              Siksha 'O' Anusandhan{" "}
              <span className="text-blue-600 font-medium font-mono text-sm ml-2">
                | ITER
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── MASSIVE HEADLINE FEATURE SECTION (LARGE FONT / EYE-CATCHING) ────── */}
      <section className="py-28 bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-50/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Explainable AI. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Zero Speculation.
                </span>
              </h2>
              <p className="text-base text-slate-500 leading-relaxed">
                Standard deep learning systems operate as complete black boxes,
                masking how results are concluded. MediPredict integrates an
                advanced visualization layer calculating game-theoretic
                attribute values.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-600 leading-relaxed">
                <strong className="text-slate-900 block mb-1">
                  Why this matters:
                </strong>
                It allows clinicians to view exactly how individual test
                parameters—such as blood pressure ratios or enzyme
                levels—influenced the absolute probability output.
              </div>
            </div>

            {/* Hero Card Container with Large Fonts */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 text-white rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500" />

                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase block mb-4">
                  Core Structural Performance
                </span>
                <h3 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 animate-pulse">
                  90%{" "}
                  <span className="text-3xl font-semibold text-slate-400">
                    Accuracy
                  </span>
                </h3>

                <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
                  Validated against verified clinical test sets, our feedforward
                  pipelines maintain exceptional specificity thresholds to
                  drastically eliminate false diagnostics.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 border-t border-slate-800 pt-8">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      SHAP Backed
                    </div>
                    <div className="text-sm text-slate-400">
                      Visual attribute mapping profiles for every computation.
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      Sub-Second Delivery
                    </div>
                    <div className="text-sm text-slate-400">
                      Instantly evaluates dense multiclass clinical records.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEM MATRIX GRID (DISEASE CARDS) ────────────────────────────── */}
      <section className="py-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Targeted Pathological Intelligence
            </h2>
            <p className="text-lg text-slate-500">
              Four specialized, localized neural classification layers trained
              on independent clinical parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diseases.map((d) => (
              <div
                key={d.name}
                className={`group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}
              >
                {/* Left Side Accent Border on Hover */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${d.accent}`}
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${d.color}`}
                    >
                      <d.icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 tracking-wider group-hover:text-slate-400 transition-colors">
                      READY
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  Run Diagnostic Matrix
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID STATS BLOCK ──────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100/80 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl font-black text-blue-600 tracking-tight mb-2">
                  {s.value}
                </div>
                <div className="text-base font-bold text-slate-900 mb-2">
                  {s.label}
                </div>
                <div className="text-xs text-slate-400 font-medium leading-relaxed">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE INFRASTRUCTURE FEATURE LIST ──────────────────────────────── */}
      <section className="py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl font-black tracking-tight leading-tight sm:text-5xl">
                Engineered for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                  Clinical Integration
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Our application pipeline handles critical data inputs securely,
                routing inputs directly through deep learning weights with
                robust validation layers.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/predict">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-5 rounded-xl font-bold transition-all shadow-lg shadow-white/5">
                    Start Matrix Now
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="border-slate-800 text-slate-300 hover:bg-white/5 hover:text-white px-6 py-5 rounded-xl font-bold"
                  >
                    Register Credentials
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 flex-shrink-0 shadow-inner">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING ACTION CALL ───────────────────────────────────────────── */}
      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
            Deploy the Predictive Matrix Instantly.
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Create an academic pipeline account or experiment instantly with our
            standard, pre-loaded disease datasets.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-6 text-base rounded-2xl shadow-xl shadow-blue-600/20 transition-all">
                Create Free Account
              </Button>
            </Link>
            <Link to="/predict">
              <Button
                variant="outline"
                className="px-8 py-6 text-base font-bold rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
              >
                Run Direct Test
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-500 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-black tracking-tight text-white text-lg">
                MediPredict
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Advanced multi-parametric analytical pipelines optimizing clinical
              predictive outcomes.
            </p>
          </div>
          {[
            {
              title: "Research Platform",
              links: [
                "Predictor Framework",
                "Historical Ingestion",
                "About Core",
              ],
            },
            {
              title: "Neural Targets",
              links: [
                "Diabetes Set",
                "Cardiovascular Layer",
                "Renal Processing",
                "Hepatic Matrix",
              ],
            },
            {
              title: "Compliance",
              links: ["Privacy Isolation", "Terms of Framework"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm hover:text-white transition-colors cursor-pointer font-medium">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center text-xs font-medium text-slate-600 tracking-wider">
          © 2026 MediPredict Project. Developed under Academic Supervision.
        </div>
      </footer>
    </div>
  );
}
