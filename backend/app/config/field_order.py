# backend/app/config/field_order.py

FIELD_ORDER = {

    # All 8 features present — matches CSV exactly
    "Diabetes": [
        "Glucose", "BMI", "Age", "Pregnancies",
        "SkinThickness", "Insulin",
        "DiabetesPedigreeFunction", "BloodPressure"
    ],

    # chol and fbs removed by ANOVA — only 11 features
    "Heart": [
        "exang", "cp", "oldpeak", "thalach", "ca",
        "slope", "thal", "sex", "age",
        "trestbps", "restecg"
    ],

    # pot removed by ANOVA — only 23 features
    "Kidney": [
        "hemo", "sg", "pcv", "al", "rc",
        "htn", "dm", "rbc", "pc", "bgr",
        "appet", "pe", "bu", "sod", "su",
        "ane", "sc", "bp", "pcc", "cad",
        "age", "wc", "ba"
    ],

    # Gender and Total_Protiens removed by ANOVA — only 8 features
    "Liver": [
        "Direct_Bilirubin", "Total_Bilirubin",
        "Alkaline_Phosphotase",
        "Albumin_and_Globulin_Ratio", "Albumin",
        "Alamine_Aminotransferase",
        "Aspartate_Aminotransferase", "Age"
    ],
}

VALID_DISEASES = list(FIELD_ORDER.keys())