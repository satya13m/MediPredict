import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { diseaseConfig } from "@/config/diseaseConfig";
import { Loader2, ChevronLeft } from "lucide-react";

export default function PredictForm({ disease, onSubmit, onBack, isLoading }) {
  const config = diseaseConfig[disease];
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleNumber = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: Number(value) }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    config.fields.forEach((f) => {
      if (formData[f.key] === undefined || formData[f.key] === "") {
        newErrors[f.key] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {config.label} Assessment
          </h2>
          <p className="text-slate-500 text-sm">
            Fill in all fields to get your prediction
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.fields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <Label
                htmlFor={field.key}
                className="text-sm font-medium text-slate-700"
              >
                {field.label}
              </Label>

              {field.type === "number" ? (
                <Input
                  id={field.key}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  placeholder={field.placeholder}
                  value={formData[field.key] ?? ""}
                  onChange={(e) => handleNumber(field.key, e.target.value)}
                  className={`rounded-xl border ${errors[field.key] ? "border-red-300 focus:ring-red-300" : "border-slate-200"}`}
                />
              ) : (
                <Select
                  onValueChange={(val) => handleSelect(field.key, val)}
                  value={
                    formData[field.key] !== undefined
                      ? String(formData[field.key])
                      : ""
                  }
                >
                  <SelectTrigger
                    className={`rounded-xl border ${errors[field.key] ? "border-red-300" : "border-slate-200"}`}
                  >
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.value} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {errors[field.key] && (
                <p className="text-xs text-red-500">{errors[field.key]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-base ${config.accent} hover:opacity-90 transition-opacity`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </span>
            ) : (
              "Run Prediction"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
