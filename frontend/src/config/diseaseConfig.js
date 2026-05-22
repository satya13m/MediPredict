// frontend/src/config/diseaseConfig.js

export const diseaseConfig = {
  Diabetes: {
    label: "Diabetes",
    icon: "🩸",
    description: "Blood glucose & metabolic risk",
    border: "border-red-200",
    light: "bg-red-50",
    text: "text-red-600",
    accent: "bg-red-600 hover:bg-red-700",
    clinical: [
      {
        key: "Pregnancies",
        label: "Pregnancies",
        type: "number",
        min: 0,
        max: 20,
        step: 1,
        default: 1,
      },
      {
        key: "Age",
        label: "Age (years)",
        type: "number",
        min: 1,
        max: 120,
        step: 1,
        default: 30,
      },
      {
        key: "BMI",
        label: "BMI",
        type: "number",
        min: 0,
        max: 70,
        step: 0.1,
        default: 25.0,
      },
      {
        key: "BloodPressure",
        label: "Blood Pressure",
        type: "number",
        min: 0,
        max: 200,
        step: 1,
        default: 72,
        helper: "Diastolic (mm Hg)",
      },
    ],
    lab: [
      {
        key: "Glucose",
        label: "Glucose (mg/dL)",
        type: "number",
        min: 0,
        max: 300,
        step: 1,
        default: 120,
      },
      {
        key: "SkinThickness",
        label: "Skin Thickness (mm)",
        type: "number",
        min: 0,
        max: 100,
        step: 1,
        default: 20,
      },
      {
        key: "Insulin",
        label: "Insulin (mu U/ml)",
        type: "number",
        min: 0,
        max: 900,
        step: 1,
        default: 80,
      },
      {
        key: "DiabetesPedigreeFunction",
        label: "Diabetes Pedigree Function",
        type: "number",
        min: 0,
        max: 3,
        step: 0.01,
        default: 0.5,
      },
    ],
    get fields() {
      return [...this.clinical, ...this.lab];
    },
  },

  Heart: {
    label: "Heart Disease",
    icon: "❤️",
    description: "Cardiovascular risk assessment",
    border: "border-red-300",
    light: "bg-red-50",
    text: "text-red-600",
    accent: "bg-red-600 hover:bg-red-700",
    // NOTE: chol and fbs removed by ANOVA — not in model
    clinical: [
      {
        key: "age",
        label: "Age (years)",
        type: "number",
        min: 1,
        max: 120,
        step: 1,
        default: 50,
      },
      {
        key: "sex",
        label: "Sex",
        type: "select",
        default: 1,
        options: [
          { value: 1, label: "Male" },
          { value: 0, label: "Female" },
        ],
      },
      {
        key: "cp",
        label: "Chest Pain Type",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Typical Angina" },
          { value: 1, label: "Atypical Angina" },
          { value: 2, label: "Non-anginal" },
          { value: 3, label: "Asymptomatic" },
        ],
      },
      {
        key: "trestbps",
        label: "Resting BP (mmHg)",
        type: "number",
        min: 80,
        max: 220,
        step: 1,
        default: 120,
      },
      {
        key: "restecg",
        label: "Resting ECG",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Normal" },
          { value: 1, label: "ST-T Abnormality" },
          { value: 2, label: "LV Hypertrophy" },
        ],
      },
    ],
    lab: [
      {
        key: "thalach",
        label: "Max Heart Rate",
        type: "number",
        min: 60,
        max: 250,
        step: 1,
        default: 150,
      },
      {
        key: "exang",
        label: "Exercise Angina",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "oldpeak",
        label: "ST Depression",
        type: "number",
        min: 0,
        max: 7,
        step: 0.1,
        default: 1.0,
        helper: "Exercise induced",
      },
      {
        key: "slope",
        label: "Slope of ST Segment",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Upsloping" },
          { value: 1, label: "Flat" },
          { value: 2, label: "Downsloping" },
        ],
      },
      {
        key: "ca",
        label: "Major Vessels (0–4)",
        type: "select",
        default: 0,
        options: [0, 1, 2, 3, 4].map((v) => ({ value: v, label: String(v) })),
      },
      {
        key: "thal",
        label: "Thalassemia",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Normal" },
          { value: 1, label: "Fixed Defect" },
          { value: 2, label: "Reversable Defect" },
        ],
      },
    ],
    get fields() {
      return [...this.clinical, ...this.lab];
    },
  },

  Kidney: {
    label: "Kidney Disease",
    icon: "🫘",
    description: "Chronic kidney disease screening",
    border: "border-blue-200",
    light: "bg-blue-50",
    text: "text-blue-600",
    accent: "bg-blue-600 hover:bg-blue-700",
    // NOTE: pot removed by ANOVA — not in model
    clinical: [
      {
        key: "age",
        label: "Age",
        type: "number",
        min: 1,
        max: 100,
        step: 1,
        default: 45,
      },
      {
        key: "bp",
        label: "Blood Pressure",
        type: "number",
        min: 50,
        max: 180,
        step: 1,
        default: 80,
      },
      {
        key: "sg",
        label: "Specific Gravity",
        type: "select",
        default: 1.02,
        options: [1.005, 1.01, 1.015, 1.02, 1.025].map((v) => ({
          value: v,
          label: String(v),
        })),
      },
      {
        key: "al",
        label: "Albumin (0–5)",
        type: "select",
        default: 0,
        options: [0, 1, 2, 3, 4, 5].map((v) => ({
          value: v,
          label: String(v),
        })),
      },
      {
        key: "su",
        label: "Sugar (0–5)",
        type: "select",
        default: 0,
        options: [0, 1, 2, 3, 4, 5].map((v) => ({
          value: v,
          label: String(v),
        })),
      },
      {
        key: "rbc",
        label: "Red Blood Cells",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Normal" },
          { value: 1, label: "Abnormal" },
        ],
      },
      {
        key: "pc",
        label: "Pus Cells",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Normal" },
          { value: 1, label: "Abnormal" },
        ],
      },
      {
        key: "pcc",
        label: "Pus Cell Clumps",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Not Present" },
          { value: 1, label: "Present" },
        ],
      },
      {
        key: "ba",
        label: "Bacteria",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "Not Present" },
          { value: 1, label: "Present" },
        ],
      },
      {
        key: "htn",
        label: "Hypertension",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "dm",
        label: "Diabetes Mellitus",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "cad",
        label: "Coronary Artery Disease",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "appet",
        label: "Appetite",
        type: "select",
        default: 1,
        options: [
          { value: 0, label: "Poor" },
          { value: 1, label: "Good" },
        ],
      },
      {
        key: "pe",
        label: "Pedal Edema",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
      {
        key: "ane",
        label: "Anaemia",
        type: "select",
        default: 0,
        options: [
          { value: 0, label: "No" },
          { value: 1, label: "Yes" },
        ],
      },
    ],
    lab: [
      {
        key: "bgr",
        label: "Blood Glucose Random",
        type: "number",
        min: 50,
        max: 500,
        step: 1,
        default: 120,
      },
      {
        key: "bu",
        label: "Blood Urea (mg/dl)",
        type: "number",
        min: 10,
        max: 200,
        step: 1,
        default: 40,
      },
      {
        key: "sc",
        label: "Serum Creatinine",
        type: "number",
        min: 0,
        max: 20,
        step: 0.1,
        default: 1.0,
      },
      {
        key: "sod",
        label: "Sodium (mEq/L)",
        type: "number",
        min: 100,
        max: 170,
        step: 1,
        default: 135,
      },
      {
        key: "hemo",
        label: "Haemoglobin (g/dl)",
        type: "number",
        min: 3,
        max: 20,
        step: 0.1,
        default: 13.0,
      },
      {
        key: "pcv",
        label: "Packed Cell Volume",
        type: "number",
        min: 10,
        max: 60,
        step: 1,
        default: 40,
      },
      {
        key: "wc",
        label: "White Cell Count",
        type: "number",
        min: 2000,
        max: 20000,
        step: 100,
        default: 8000,
      },
      {
        key: "rc",
        label: "Red Cell Count",
        type: "number",
        min: 2,
        max: 8,
        step: 0.1,
        default: 4.5,
      },
    ],
    get fields() {
      return [...this.clinical, ...this.lab];
    },
  },

  Liver: {
    label: "Liver Disease",
    icon: "🫀",
    description: "Hepatic enzyme & function markers",
    border: "border-amber-200",
    light: "bg-amber-50",
    text: "text-amber-600",
    accent: "bg-amber-600 hover:bg-amber-700",
    // NOTE: Gender and Total_Protiens removed by ANOVA — not in model
    clinical: [
      {
        key: "Age",
        label: "Age",
        type: "number",
        min: 1,
        max: 100,
        step: 1,
        default: 40,
      },
    ],
    lab: [
      {
        key: "Total_Bilirubin",
        label: "Total Bilirubin",
        type: "number",
        min: 0,
        max: 80,
        step: 0.1,
        default: 1.0,
        helper: "mg/dl",
      },
      {
        key: "Direct_Bilirubin",
        label: "Direct Bilirubin",
        type: "number",
        min: 0,
        max: 20,
        step: 0.1,
        default: 0.3,
        helper: "mg/dl",
      },
      {
        key: "Alkaline_Phosphotase",
        label: "Alkaline Phosphotase",
        type: "number",
        min: 50,
        max: 2200,
        step: 1,
        default: 200,
        helper: "IU/L",
      },
      {
        key: "Alamine_Aminotransferase",
        label: "Alamine Aminotransferase",
        type: "number",
        min: 5,
        max: 2000,
        step: 1,
        default: 30,
        helper: "ALT IU/L",
      },
      {
        key: "Aspartate_Aminotransferase",
        label: "Aspartate Aminotransferase",
        type: "number",
        min: 5,
        max: 5000,
        step: 1,
        default: 35,
        helper: "AST IU/L",
      },
      {
        key: "Albumin_and_Globulin_Ratio",
        label: "Albumin/Globulin Ratio",
        type: "number",
        min: 0,
        max: 3,
        step: 0.01,
        default: 1.0,
      },
      {
        key: "Albumin",
        label: "Albumin",
        type: "number",
        min: 0.5,
        max: 6,
        step: 0.1,
        default: 3.5,
        helper: "g/dl",
      },
    ],
    get fields() {
      return [...this.clinical, ...this.lab];
    },
  },
};

export const diseaseList = Object.keys(diseaseConfig);

export const buildInputsFromState = (disease, formState) => {
  const cfg = diseaseConfig[disease];
  const allFields = [...cfg.clinical, ...cfg.lab];
  const inputs = {};
  allFields.forEach((f) => {
    inputs[f.key] = formState[f.key] ?? f.default;
  });
  return inputs;
};

export const getDefaultState = (disease) => {
  const cfg = diseaseConfig[disease];
  const allFields = [...cfg.clinical, ...cfg.lab];
  const state = {};
  allFields.forEach((f) => {
    state[f.key] = f.default;
  });
  return state;
};
