import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Brain,
  Shield,
  Mail,
  ExternalLink,
  Heart,
  Microscope,
  Server,
  Code2,
  Database,
  CheckCircle,
  Lightbulb,
  FlaskConical,
  Users,
  BookOpen,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Data Arrays aligned with your proposal ───────────────────────────────────
const problems = [
  "Dependence on only one type of medical data",
  "Lack of explainability in predictions",
  "Black-box AI predictions with no reasoning",
  "Poor interpretability for clinicians",
  "Limited multi-disease support in existing tools",
];

const diseases = [
  {
    icon: Activity,
    name: "Diabetes",
    features: "8 clinical features",
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    icon: Heart,
    name: "Heart Disease",
    features: "13 clinical features",
    color: "text-rose-500 bg-rose-50 border-rose-100",
  },
  {
    icon: Microscope,
    name: "Kidney Disease",
    features: "24 clinical features",
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    icon: Brain,
    name: "Liver Disease",
    features: "10 clinical features",
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
];

const researchContributions = [
  "Multi-Modal Data Fusion",
  "Cross-Disease Evaluation",
  "Explainable AI Analysis",
  "Stratified Cross-Validation",
  "Hyperparameter Optimization",
  "Statistical Significance Testing",
  "Feature Importance Analysis",
  "Comparative Model Evaluation",
];

export default function About() {
  // Custom Interactive States for Team Cards (for both mouse hover and mobile tap interaction)
  const [hoveredMember, setHoveredMember] = useState(null);

  // Simulation Toast Notification State for Downloads
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "" });
    }, 4000);
  };

  // Structured team profile arrays containing exact descriptions and direct project contributions
  const team = [
    {
      id: "SM",
      name: "Satyajeet Mohanty",
      role: "Full Stack Development & AI Integration",
      avatarBg: "from-blue-600 via-indigo-600 to-indigo-700",
      initials: "SM",
      regNo: "2241013281",
      bio: "Worked on FastAPI backend architecture, React frontend integration, JWT authentication workflow, SHAP explainability integration, and healthcare prediction system development.",
      contributions: [
        "Architected and deployed FastAPI high-speed backend endpoints.",
        "Integrated secure local session handling and JWT authentication guards.",
        "Engineered live data formatting pipelines connecting local SHAP/LIME visualization outputs.",
        "Optimized asynchronous state machines for multi-disease evaluations.",
      ],
      github: "https://github.com/satya13m",
      linkedin: "https://linkedin.com",
    },
    {
      id: "BM",
      name: "Biseswar Mohapatra",
      role: "Machine Learning & Research",
      avatarBg: "from-sky-500 via-blue-600 to-indigo-600",
      initials: "BM",
      regNo: "2241013319",
      bio: "Focused on dataset preprocessing, model training pipelines, feature engineering, comparative evaluation, and healthcare AI experimentation.",
      contributions: [
        "Curated and normalized highly multi-modal datasets from Kaggle resources.",
        "Designed the multi-modal fusion layer combining clinical and lab features.",
        "Conducted cross-validation runs to avoid overfitting across neural networks and gradient boosters.",
        "Documented precision, recall, and ROC-AUC evaluation logs.",
      ],
      github: "https://github.com/biseswar2004",
      linkedin: "https://linkedin.com",
    },
    {
      id: "AB",
      name: "Anwesh Behera",
      role: "Frontend Development & Visualization",
      avatarBg: "from-teal-500 via-cyan-600 to-blue-600",
      initials: "AB",
      regNo: "2241002065",
      bio: "Contributed to responsive healthcare UI design, Tailwind components, visualization workflow, and interactive prediction interfaces.",
      contributions: [
        "Authored custom UI schemas using Tailwind CSS and shadcn configurations.",
        "Integrated interactive medical indicators and responsive graphs with Recharts.",
        "Polished patient-level diagnostic workflow panels.",
        "Designed customized visual medical-grade SVG assets.",
      ],
      github: "https://github.com/Anwesh9400",
      linkedin: "https://linkedin.com",
    },
    {
      id: "RM",
      name: "Rahul Mohanty",
      role: "Database & API Integration",
      avatarBg: "from-purple-600 via-indigo-600 to-blue-600",
      initials: "RM",
      regNo: "2241013265",
      bio: "Worked on PostgreSQL database integration, prediction history architecture, backend API workflows, and cloud database connectivity.",
      contributions: [
        "Configured robust PostgreSQL tables and optimized history queries.",
        "Formulated Supabase connection endpoints and secure metadata policies.",
        "Mapped clean database schemas with SQLAlchemy.",
        "Conducted diagnostic API stress-testing under simulated traffic loads.",
      ],
      github: "https://github.com/Rahul495-ai",
      linkedin: "https://linkedin.com",
    },
  ];

  const techStack = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      color: "bg-blue-50 border-blue-100 text-blue-600",
      badgeColor: "bg-blue-100/60 text-blue-800 border-blue-200",
      items: [
        "Scikit-learn",
        "XGBoost",
        "SHAP",
        "LIME",
        "SMOTE",
        "StandardScaler",
      ],
    },
    {
      category: "Frontend",
      icon: Code2,
      color: "bg-cyan-50 border-cyan-100 text-cyan-600",
      badgeColor: "bg-cyan-100/60 text-cyan-800 border-cyan-200",
      items: [
        "React.js",
        "Tailwind CSS",
        "shadcn/ui",
        "Axios",
        "React Query",
        "Recharts",
      ],
    },
    {
      category: "Backend",
      icon: Server,
      color: "bg-indigo-50 border-indigo-100 text-indigo-600",
      badgeColor: "bg-indigo-100/60 text-indigo-800 border-indigo-200",
      items: [
        "FastAPI",
        "SQLAlchemy ORM",
        "JWT Authentication",
        "Pydantic",
        "Uvicorn",
      ],
    },
    {
      category: "Database & Dev",
      icon: Database,
      color: "bg-purple-50 border-purple-100 text-purple-600",
      badgeColor: "bg-purple-100/60 text-purple-800 border-purple-200",
      items: [
        "PostgreSQL",
        "Supabase",
        "Python 3.10+",
        "Google Colab",
        "Jupyter Notebook",
        "VS Code",
      ],
    },
  ];

  const features = [
    {
      icon: Activity,
      title: "Multi-Disease Prediction",
      desc: "Unified healthcare prediction system supporting Diabetes, Heart, Kidney, and Liver disease.",
    },
    {
      icon: Brain,
      title: "Explainable AI Insights",
      desc: "SHAP and LIME-based interpretation of prediction outcomes with global and local explanations.",
    },
    {
      icon: CheckCircle,
      title: "Step-by-Step Workflow",
      desc: "Select Disease → Enter Patient Data → AI Prediction → Risk Analysis.",
    },
    {
      icon: Shield,
      title: "Risk Categorization",
      desc: "Predictions categorized into Low, Borderline, High, and Extreme risk levels.",
    },
    {
      icon: Database,
      title: "Prediction History",
      desc: "Users can track and revisit previous healthcare predictions in a secure dashboard.",
    },
    {
      icon: BookOpen,
      title: "Research-Oriented Architecture",
      desc: "Built using modern AI and Full Stack technologies for healthcare research and demonstration.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white antialiased">
      {/* Dynamic Toast Alerts for Download Simulation */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300">
          <div className="bg-blue-600 p-1.5 rounded-full text-white">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-100">
              Resource Download Requested
            </p>
            <p className="text-xs text-slate-400">{toast.message}</p>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white py-24 px-6 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
            <Activity className="w-4 h-4 text-blue-300" />
            About MediPredict
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Transforming Early Disease Prediction with Explainable Artificial
            Intelligence
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
            MediPredict is a research-driven healthcare AI platform that
            combines Machine Learning, Multi-Modal Data Fusion, SHAP, and LIME
            to provide intelligent, transparent, and clinically understandable
            disease risk prediction for chronic health conditions.
          </p>
          <p className="text-blue-200 text-sm font-medium tracking-wide">
            AI-Powered Healthcare • Explainable Predictions • Multi-Disease Risk
            Analysis
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/predict">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-xl font-bold shadow-md transition-all">
                Start Prediction
              </Button>
            </Link>
            <a href="#resources">
              <Button
                variant="outline"
                className="border-white/30 text-blue-400 hover:bg-white/10 px-8 py-6 rounded-xl font-semibold transition-all"
              >
                Explore Research
              </Button>
            </a>
          </div>
        </div>

        {/* Decorative divider clip-path bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-slate-50"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        ></div>
      </section>

      {/* ── ACADEMIC PARTNER / INSTITUTION BANNER ── */}
      <section className="py-8 px-6 max-w-7xl mx-auto -mt-6 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Stylized SOA circular emblem representational vector */}
          <div className="flex-shrink-0 w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center p-1 border border-rose-500/20 relative overflow-hidden">
            <img
              src="/SOA-PNG.webp"
              alt="SOA Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="text-center md:text-left flex-grow">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase block mb-1">
              Institutional Academic Partner
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Siksha 'O' Anusandhan{" "}
              <span className="text-slate-500 text-lg font-medium">
                (Deemed to be University)
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Faculty of Engineering & Technology (ITER) • Department of
              Computer Science & Engineering
            </p>
            <div className="h-px bg-slate-200 my-4"></div>
            <p className="text-sm text-slate-600 max-w-4xl leading-relaxed">
              As a signature{" "}
              <strong>
                Final Year Research Project (FRP-2026, Section:2241006, Group No: 01)
              </strong>
              , our framework resolves clinical bottlenecks by unifying
              laboratory analytical markers with qualitative symptoms into an
              actionable early disease prediction system.
            </p>
          </div>
        </div>
      </section>

      {/* ── VISION SECTION ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
            Our Vision
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            A future where healthcare AI is accessible, transparent, and
            explainable.
          </h2>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            MediPredict was developed as a final-year research initiative
            focused on improving disease risk assessment using modern Machine
            Learning and Explainable AI techniques. The platform aims to assist
            in early healthcare awareness by combining clinical observations and
            laboratory data into a unified intelligent prediction framework.
          </p>
        </div>
      </section>

      {/* ── THE PROBLEM MATRIX ── */}
      <section className="py-20 px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
              The Problem
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Chronic diseases remain among the leading causes of global
              mortality.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Diabetes, Heart Disease, Chronic Kidney Disease, and Liver
              Disorders affect millions worldwide. Most traditional AI
              healthcare systems face critical limitations that prevent
              widespread adoption.
            </p>

            <ul className="space-y-4">
              {problems.map((p) => (
                <div
                  key={p}
                  className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </div>
                  <div>
                    <span className="text-slate-700 text-sm font-semibold">
                      {p}
                    </span>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          {/* Right column with target disease details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diseases.map((d) => (
              <div
                key={d.name}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${d.color}`}
                >
                  <d.icon className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-slate-900 text-base">
                  {d.name}
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1">
                  {d.features}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH APPROACH (MULTI-MODAL DATA FUSION) ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
              Research Approach
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Multi-Modal Disease Prediction Framework
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
              MediPredict fuses both clinical and laboratory data to improve
              prediction capability and create a more comprehensive healthcare
              analysis system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Clinical Data stream */}
            <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">
                Clinical Data
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Demographic information and observable symptoms processed at
                baseline screening.
              </p>
              <ul className="space-y-3">
                {[
                  "Age",
                  "Blood Pressure",
                  "BMI",
                  "Symptoms",
                  "Demographic Information",
                ].map((i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-700 font-semibold flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Laboratory Data stream */}
            <div className="bg-purple-50/50 rounded-2xl p-8 border border-purple-100/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">
                Laboratory Data
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Biochemical test metrics and metabolic vectors analyzed inside
                laboratories.
              </p>
              <ul className="space-y-3">
                {[
                  "Glucose",
                  "Creatinine",
                  "Bilirubin",
                  "Cholesterol",
                  "Haemoglobin",
                  "Liver Enzyme Values",
                ].map((i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-700 font-semibold flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLAINABLE AI FRAMEWORK ── */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-blue-400 font-bold text-xs uppercase tracking-widest">
              Explainable AI
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Transparency is at the core of MediPredict.
            </h2>
            <p className="text-blue-100/90 text-sm leading-relaxed">
              Instead of only displaying a prediction score, the system explains
              what factors increased risk, what factors reduced risk, and how
              the AI model interpreted patient data.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "SHAP",
                  desc: "SHapley Additive Explanations for global feature importance analysis",
                },
                {
                  label: "LIME",
                  desc: "Local Interpretable Model-Agnostic Explanations for local breakdowns",
                },
              ].map((x) => (
                <div
                  key={x.label}
                  className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow"
                >
                  <div className="text-lg font-bold text-blue-400 mb-1">
                    {x.label}
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed font-medium">
                    {x.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              "Global feature importance analysis",
              "Patient-level local explanations",
              "Interpretable healthcare insights",
              "Visual risk factor breakdown",
              "Clinically meaningful AI outputs",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-slate-800/50 border border-slate-800 rounded-xl px-5 py-3.5 shadow"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-200 text-xs font-semibold">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
              Key Features
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything you need for AI-assisted health screening.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="font-bold text-slate-900 text-base mb-2">
                  {f.title}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES USED ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
              Technologies Used
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Built with modern, production-grade tools.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${stack.color} border`}
                    >
                      <stack.icon className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-800 text-sm tracking-tight">
                      {stack.category}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${stack.badgeColor}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM SECTION (Interactive Cards) ── */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
              Meet the Team
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Research contributors behind MediPredict.
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">
              Department of Computer Science & Engineering, ITER, SOA
              University, Bhubaneswar, Odisha
            </p>
          </div>

          {/* PROJECT SUPERVISOR ACCENT CARD */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md p-8 flex flex-col md:flex-row items-center gap-6 mb-12 hover:shadow-lg transition-all">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-950 p-0.5 flex-shrink-0 flex items-center justify-center text-white text-2xl font-black shadow-inner">
              MK
            </div>
            <div className="text-center md:text-left flex-grow">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                <h4 className="text-lg font-bold text-slate-900">
                  Dr. Mitrabinda Khuntia
                </h4>
                <span className="text-xs text-blue-600 font-bold tracking-wider uppercase md:ml-3">
                  Project Supervisor
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold">
                Dept. of CSE, ITER, SOA University
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Guided the research methodology, healthcare AI evaluation
                framework, and overall system architecture throughout the
                MediPredict project.
              </p>
            </div>
          </div>

          {/* Team Contributors (4 columns grid layout with slider hover overlay) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="group relative h-[440px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() =>
                  setHoveredMember(
                    hoveredMember === member.id ? null : member.id,
                  )
                }
              >
                {/* Visual Top Colored Accent Bar */}
                <div
                  className={`h-24 bg-gradient-to-br ${member.avatarBg} relative flex items-end justify-center pb-2`}
                >
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-indigo-200 to-slate-900"></div>
                  <span className="absolute top-2.5 right-2.5 bg-white/25 backdrop-blur-md text-[9px] text-white font-mono px-2 py-0.5 rounded-full font-bold">
                    Reg: {member.regNo}
                  </span>
                </div>

                {/* Avatar Initial container */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.avatarBg} p-0.5 shadow-md flex items-center justify-center text-white border-4 border-white`}
                  >
                    <div className="text-2xl font-black tracking-wider">
                      {member.initials}
                    </div>
                  </div>
                </div>

                {/* Visible Card description */}
                <div className="pt-10 p-4 text-center flex flex-col justify-between h-[344px]">
                  <div>
                    <h4 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h4>
                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full mt-1.5 max-w-full truncate">
                      {member.role}
                    </span>
                    <p className="text-slate-500 text-xs mt-4 leading-relaxed line-clamp-4 font-medium">
                      {member.bio}
                    </p>
                  </div>

                  {/* Interactivity Indicator */}
                  <div className="pt-3 border-t border-slate-100 text-[10px] font-bold text-slate-400 group-hover:text-blue-600 flex items-center justify-center">
                    <span>
                      {hoveredMember === member.id
                        ? "Showing Contributions"
                        : "View Contributions"}
                    </span>
                    <svg
                      className="w-3 h-3 ml-1 animate-bounce"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Sliding Contribution Overlay */}
                <div
                  className={`absolute inset-0 bg-slate-950/95 backdrop-blur-sm p-5 text-white flex flex-col justify-between transition-all duration-300 ease-in-out z-30 ${
                    hoveredMember === member.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <div>
                        <h5 className="font-extrabold text-sm text-blue-400">
                          {member.name}
                        </h5>
                        <p className="text-[10px] text-slate-400">
                          Core Contributions
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        #{member.id}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {member.contributions.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start text-[11px] text-slate-300 leading-snug"
                        >
                          <span className="text-emerald-400 mr-2 font-bold">
                            •
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Custom SVG links for social endpoints */}
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                      Repository links
                    </span>
                    <div className="flex space-x-1.5">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white/10 hover:bg-white/20 p-1.5 rounded-md text-white transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 p-1.5 rounded-md text-white transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH CONTRIBUTIONS / METHODOLOGIES ── */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">
            Research Contributions
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Methodologies integrated in this framework.
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {researchContributions.map((r) => (
              <div
                key={r}
                className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5 text-xs text-blue-700 font-bold tracking-tight shadow-sm"
              >
                {r}
              </div>
            ))}
          </div>

          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            The framework combines{" "}
            <strong className="text-blue-600">
              4 Diseases + Multiple ML Models + SHAP + LIME + Multi-Modal Fusion
            </strong>{" "}
            within a unified healthcare AI architecture.
          </p>
        </div>
      </section>

      {/* ── COMPREHENSIVE RESOURCE PANEL & MEDICAL DISCLAIMER ── */}
      <section
        id="resources"
        className="relative overflow-hidden bg-slate-950 text-white py-24 px-6 border-t border-slate-900"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto z-10 text-center space-y-8">
          <div className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
            Academic Artifacts
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
            Advancing Healthcare AI Through Transparency, Explainability, and
            Research Innovation.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Download our fully audited research, slideshow decks, and proposal
            structures compiled by Group 01 of ITER Department of Computer
            Science & Engineering.
          </p>

          {/* Core download triggers with custom states */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="/resources/proposal.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                onClick={() => showToast("Downloading Proposal PDF...")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-5 rounded-xl shadow-md border border-blue-600 flex items-center space-x-2.5"
              >
                <FileText className="w-4 h-4" />
                <span>Download Proposal PDF</span>
              </Button>
            </a>

            <a
              href="/resources/presentation.pptx"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                onClick={() => showToast("Downloading Presentation PPTX...")}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-5 rounded-xl shadow-md border border-orange-600 flex items-center space-x-2.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Presentation PPTX</span>
              </Button>
            </a>

            <a
              href="/resources/research-paper.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                onClick={() => showToast("Downloading Research Paper PDF...")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-5 rounded-xl shadow-md border border-indigo-600 flex items-center space-x-2.5"
              >
                <FileText className="w-4 h-4" />
                <span>Download Research Paper PDF</span>
              </Button>
            </a>
          </div>

          {/* Crucial Medical Disclaimer */}
          <div className="bg-amber-50/5 border border-amber-500/25 rounded-2xl p-6 text-xs sm:text-sm text-amber-200/90 leading-relaxed text-left max-w-3xl mx-auto">
            ⚕️{" "}
            <strong className="text-amber-300">
              Important Medical Disclaimer:
            </strong>{" "}
            MediPredict is intended for educational purposes, healthcare AI
            research, screening assistance, and academic demonstration only. The
            platform does not replace professional medical diagnosis, physician
            consultation, or clinical treatment. Users should always consult
            qualified healthcare professionals for medical decisions.
          </div>

          <div className="pt-4">
            <Link to="/predict">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold shadow-lg transition-all text-sm">
                Start Your Prediction
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
