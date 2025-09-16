import React from "react";

interface Props {
  onSelect: (operation: "getById" | "create" | "reschedule" | "cancel") => void;
}

export default function OperationSelector({ onSelect }: Props) {
  return (
    <div className="flex justify-center gap-6 flex-wrap pt-8">
      <button
        className="px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 font-medium"
        onClick={() => onSelect("getById")}
      >
        Get Appointment by ID
      </button>
      <button
        className="px-6 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-200 font-medium"
        onClick={() => onSelect("create")}
      >
        Create Appointment
      </button>
      <button
        className="px-6 py-4 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 hover:shadow-xl transition-all duration-200 font-medium"
        onClick={() => onSelect("reschedule")}
      >
        Reschedule Appointment
      </button>
      <button
        className="px-6 py-4 bg-red-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 hover:shadow-xl transition-all duration-200 font-medium"
        onClick={() => onSelect("cancel")}
      >
        Cancel Appointment
      </button>
    </div>
  );
}
