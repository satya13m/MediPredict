import api from "@/lib/axios";

export const getHistory = (params) => api.get("/history/", { params });
export const getStats = () => api.get("/history/stats");
export const deleteHistory = (id) => api.delete(`/history/${id}`);
