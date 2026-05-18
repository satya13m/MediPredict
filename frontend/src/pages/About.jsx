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
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Data ──────────────────────────────────────────────────────────────────────
const team = [
  {
    name: "Dr. Mitrabinda Khuntia",
    role: "Project Supervisor",
    dept: "Dept. of CSE, ITER, SOA University",
    bio: "Guided the research methodology, healthcare AI evaluation framework, and overall system architecture throughout the MediPredict project.",
    avatar: "MK",
    color: "bg-blue-700",
    supervisor: true,
  },
  {
    name: "Satyajeet Mohanty",
    role: "Full Stack Development & AI Integration",
    bio: "Worked on FastAPI backend architecture, React frontend integration, JWT authentication workflow, SHAP explainability integration, and healthcare prediction system development.",
    avatar: "SM",
    color: "bg-blue-600",
  },
  {
    name: "Biseswar Mohapatra",
    role: "Machine Learning & Research",
    bio: "Focused on dataset preprocessing, model training pipelines, feature engineering, comparative evaluation, and healthcare AI experimentation.",
    avatar: "BM",
    color: "bg-purple-600",
  },
  {
    name: "Anwesh Behera",
    role: "Frontend Development & Visualization",
    bio: "Contributed to responsive healthcare UI design, Tailwind components, visualization workflow, and interactive prediction interfaces.",
    avatar: "AB",
    color: "bg-emerald-600",
  },
  {
    name: "Rahul Mohanty",
    role: "Database & API Integration",
    bio: "Worked on PostgreSQL database integration, prediction history architecture, backend API workflows, and cloud database connectivity.",
    avatar: "RM",
    color: "bg-amber-600",
  },
];

const techStack = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
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
    color: "bg-blue-50 text-blue-600",
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
    color: "bg-green-50 text-green-600",
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
    color: "bg-amber-50 text-amber-600",
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

const problems = [
  "Dependence on only one type of medical data",
  "Lack of explainability in predictions",
  "Black-box AI predictions with no reasoning",
  "Poor interpretability for clinicians",
  "Limited multi-disease support in existing tools",
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

const diseases = [
  {
    icon: Activity,
    name: "Diabetes",
    features: "8 clinical features",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Heart,
    name: "Heart Disease",
    features: "13 clinical features",
    color: "text-red-500 bg-red-50",
  },
  {
    icon: Microscope,
    name: "Kidney Disease",
    features: "24 clinical features",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: Brain,
    name: "Liver Disease",
    features: "10 clinical features",
    color: "text-amber-600 bg-amber-50",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
            <Activity className="w-4 h-4" />
            About MediPredict
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
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
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/predict">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 px-8 rounded-xl font-semibold">
                Start Prediction
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 rounded-xl"
              >
                Explore Research
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Our Vision
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            A future where healthcare AI is accessible, transparent, and
            explainable.
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            MediPredict was developed as a final-year research initiative
            focused on improving disease risk assessment using modern Machine
            Learning and Explainable AI techniques. The platform aims to assist
            in early healthcare awareness by combining clinical observations and
            laboratory data into a unified intelligent prediction framework.
          </p>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              The Problem
            </div>
            <h2 className="text-3xl font-bold text-slate-800 leading-tight">
              Chronic diseases remain among the leading causes of global
              mortality.
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Diabetes, Heart Disease, Chronic Kidney Disease, and Liver
              Disorders affect millions worldwide. Most traditional AI
              healthcare systems face critical limitations that prevent
              widespread adoption.
            </p>
            <ul className="space-y-3">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <span className="text-slate-600 text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {diseases.map((d) => (
              <div
                key={d.name}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${d.color}`}
                >
                  <d.icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-slate-800">{d.name}</div>
                <div className="text-xs text-slate-400 mt-1">{d.features}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH APPROACH ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Research Approach
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              Multi-Modal Disease Prediction Framework
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              MediPredict fuses both clinical and laboratory data to improve
              prediction capability and create a more comprehensive healthcare
              analysis system.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3">Clinical Data</h3>
              <ul className="space-y-2">
                {[
                  "Age",
                  "Blood Pressure",
                  "BMI",
                  "Symptoms",
                  "Demographic Information",
                ].map((i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-600 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FlaskConical className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3">Laboratory Data</h3>
              <ul className="space-y-2">
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
                    className="text-sm text-slate-600 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── XAI ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-blue-200 font-semibold text-sm uppercase tracking-widest">
              Explainable AI
            </div>
            <h2 className="text-3xl font-bold leading-tight">
              Transparency is at the core of MediPredict.
            </h2>
            <p className="text-blue-100 leading-relaxed">
              Instead of only displaying a prediction score, the system explains
              what factors increased risk, what factors reduced risk, and how
              the AI model interpreted patient data.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "SHAP",
                  desc: "SHapley Additive Explanations for global feature importance",
                },
                {
                  label: "LIME",
                  desc: "Local Interpretable Model-Agnostic Explanations",
                },
              ].map((x) => (
                <div key={x.label} className="bg-white/10 rounded-2xl p-5">
                  <div className="text-xl font-bold text-white mb-1">
                    {x.label}
                  </div>
                  <div className="text-blue-200 text-xs leading-relaxed">
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
                className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3"
              >
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Key Features
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              Everything you need for AI-assisted health screening.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="font-semibold text-slate-800 mb-2">
                  {f.title}
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Technologies Used
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              Built with modern, production-grade tools.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stack.color}`}
                >
                  <stack.icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-slate-800 mb-3">
                  {stack.category}
                </div>
                <ul className="space-y-1.5">
                  {stack.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-500 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Meet the Team
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              Research contributors behind MediPredict.
            </h2>
            <p className="text-slate-500 text-sm">
              Department of Computer Science & Engineering, ITER, SOA
              University, Bhubaneswar, Odisha
            </p>
          </div>

          {/* Supervisor */}
          {team
            .filter((m) => m.supervisor)
            .map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm mb-6 flex items-start gap-6"
              >
                <div
                  className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}
                >
                  {member.avatar}
                </div>
                <div>
                  <div className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-1">
                    Project Supervisor
                  </div>
                  <div className="font-bold text-slate-800 text-xl">
                    {member.name}
                  </div>
                  <div className="text-sm text-slate-500 mb-3">
                    {member.dept}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}

          {/* Contributors */}
          <div className="grid sm:grid-cols-2 gap-6">
            {team
              .filter((m) => !m.supervisor)
              .map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 ${member.color} rounded-xl flex items-center justify-center text-white font-bold`}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">
                        {member.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {member.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH CONTRIBUTIONS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Research Contributions
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            Methodologies integrated in this framework.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {researchContributions.map((r) => (
              <div
                key={r}
                className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700 font-medium"
              >
                {r}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            The framework combines{" "}
            <strong>
              4 Diseases + Multiple ML Models + SHAP + LIME + Multi-Modal Fusion
            </strong>{" "}
            within a unified healthcare AI architecture.
          </p>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Advancing Healthcare AI Through Transparency, Explainability, and
            Research Innovation.
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800 leading-relaxed">
            ⚕️ <strong>Important Medical Disclaimer:</strong> MediPredict is
            intended for educational purposes, healthcare AI research, screening
            assistance, and academic demonstration only. The platform does not
            replace professional medical diagnosis, physician consultation, or
            clinical treatment. Users should always consult qualified healthcare
            professionals for medical decisions.
          </div>
          <Link to="/predict">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl">
              Start Your Prediction
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
