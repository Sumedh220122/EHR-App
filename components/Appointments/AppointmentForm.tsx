import React, { useState } from "react";

interface Props {
  operation: "getById" | "create" | "cancel" | "reschedule";
  onSubmit: (formData: Record<string, string>) => void;
}

export default function AppointmentForm({ operation, onSubmit }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const fieldsByOperation: Record<string, string[]> = {
    getById: ["appointmentId"],
    create: ["start_time", "end_time", "provider_id", "appointment_type", "title", "appointment_note"],
    reschedule: ["appointmentId", "start_time", "pt_id"],
    cancel: ["appointmentId"]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 w-full max-w-md">
      {fieldsByOperation[operation].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={`Enter ${field}`}
          value={formData[field] || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
