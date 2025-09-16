// components/OperationSelector.tsx
import React from "react";

interface Props {
  onSelect: (operation: "getById" | "create" | "update") => void;
}

export default function OperationSelector({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="w-64 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        onClick={() => onSelect("getById")}
      >
        Get Patient by ID
      </button>
      <button
        className="w-64 py-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
        onClick={() => onSelect("create")}
      >
        Create Patient
      </button>
      <button
        className="w-64 py-4 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600"
        onClick={() => onSelect("update")}
      >
        Update Patient
      </button>
    </div>
  );
}
