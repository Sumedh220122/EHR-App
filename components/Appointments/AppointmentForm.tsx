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
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {operation === "getById" && "Get Appointment by ID"}
          {operation === "create" && "Create New Appointment"}
          {operation === "reschedule" && "Reschedule Appointment"}
          {operation === "cancel" && "Cancel Appointment"}
        </h2>

        {fieldsByOperation[operation].map((field) => {
          const fieldId = `${operation}-${field}`;
          return (
            <div key={field} className="space-y-2">
              <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace('_', ' ')}
              </label>
              <input
                id={fieldId}
                name={field}
                placeholder={`Enter ${field.replace('_', ' ')}`}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                required
              />
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
