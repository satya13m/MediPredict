FIELD_ORDER = {
    "Diabetes": [
        "Pregnancies", "Glucose", "BloodPressure",
        "SkinThickness", "Insulin", "BMI",
        "DiabetesPedigreeFunction", "Age"
    ],
    "Heart": [
        "age", "sex", "cp", "trestbps", "chol",
        "fbs", "restecg", "thalach", "exang",
        "oldpeak", "slope", "ca", "thal"
    ],
    "Kidney": [
        "age", "bp", "sg", "al", "su",
        "rbc", "pc", "pcc", "ba",
        "bgr", "bu", "sc", "sod", "pot",
        "hemo", "pcv", "wc", "rc",
        "htn", "dm", "cad", "appet", "pe", "ane"
    ],
    "Liver": [
        "Age", "Gender",
        "Total_Bilirubin", "Direct_Bilirubin",
        "Alkaline_Phosphotase",
        "Alamine_Aminotransferase",
        "Aspartate_Aminotransferase",
        "Total_Protiens", "Albumin",
        "Albumin_and_Globulin_Ratio"
    ],
}

VALID_DISEASES = list(FIELD_ORDER.keys())