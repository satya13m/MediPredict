import api from "@/lib/axios";

export const predict = (disease, features) =>
  api.post("/predict/", { disease, features });

export const getDiseases = () => api.get("/predict/diseases");
export const getFields = (disease) => api.get(`/predict/fields/${disease}`);
