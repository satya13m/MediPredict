import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { diseaseConfig } from "@/config/diseaseConfig";
import { Loader2, ChevronLeft, Layers } from "lucide-react";

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
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {config.label} Matrix Configuration
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Populate patient clinical features into the feedforward data
              layer.
            </p>
          </div>
        </div>
        <div
          className={`hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border ${config.border} ${config.light} ${config.text}`}
        >
          <Layers className="w-3.5 h-3.5" /> Layers Configured
        </div>
      </div>

      {/* Modern High-Capacity Wide Field Grid */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {config.fields.map((field) => (
            <div key={field.key} className="space-y-2 group">
              <Label
                htmlFor={field.key}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 group-focus-within:text-blue-600 transition-colors"
              >
                {field.label}
              </Label>

              <div className="relative">
                {field.type === "number" ? (
                  <Input
                    id={field.key}
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    placeholder={
                      field.placeholder ||
                      `e.g., Range (${field.min}-${field.max})`
                    }
                    value={formData[field.key] ?? ""}
                    onChange={(e) => handleNumber(field.key, e.target.value)}
                    className={`h-12 rounded-xl text-sm font-semibold border bg-slate-50/30 focus:bg-white transition-all shadow-inner/5
                      ${errors[field.key] ? "border-rose-400 ring-2 ring-rose-50" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"}`}
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
                      className={`h-12 rounded-xl text-sm font-semibold border bg-slate-50/30 text-left transition-all
                        ${errors[field.key] ? "border-rose-400" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"}`}
                    >
                      <SelectValue placeholder="Select outcome..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                      {field.options.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={String(opt.value)}
                          className="rounded-lg my-0.5 text-sm font-medium"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {errors[field.key] && (
                <p className="text-xs font-bold text-rose-500 pl-1">
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Action Commit Row */}
        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-64 h-14 rounded-2xl text-white font-bold text-base transition-all duration-300 shadow-xl ${config.accent} hover:opacity-95 shadow-blue-500/10`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2.5">
                <Loader2 className="w-5 h-5 animate-spin" />
                Executing Neural Calculations...
              </span>
            ) : (
              "Compute Network Risk"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
