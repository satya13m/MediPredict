import { useMutation } from "@tanstack/react-query";
import { predict } from "@/services/predict.service";

export function usePredict() {
  return useMutation({
    mutationFn: ({ disease, features }) => predict(disease, features),
    onError: (err) => {
      console.error("Prediction failed:", err);
    },
  });
}
