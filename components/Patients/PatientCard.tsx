import React from "react";

import { Patient } from "../../types/patient";

export default function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="flex justify-center mt-6">
      <div className="p-8 border rounded-xl bg-white shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{patient.name}</h2>
        <div className="space-y-3">
          <p className="text-gray-700"><strong className="text-gray-900">DOB:</strong> {patient.dob}</p>
          <p className="text-gray-700"><strong className="text-gray-900">Gender:</strong> {patient.gender}</p>
          <p className="text-gray-700"><strong className="text-gray-900">Address:</strong> {patient.address}</p>
          <p className="text-gray-700"><strong className="text-gray-900">Phone:</strong> {patient.phone_no}</p>
          {patient.tags && patient.tags.length > 0 && (
            <div className="mt-6">
              <strong className="text-gray-900 block mb-3">Tags:</strong>
              <ul className="list-disc pl-6 space-y-1">
                {patient.tags.map((tag, i) => (
                  <li key={i} className="text-gray-700">{tag.name} ({tag.tag_category})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}