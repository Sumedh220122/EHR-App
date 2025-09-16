import React from "react";

import { Patient } from "../../types/patient";

export default function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="mt-8 p-6 border rounded-xl bg-white shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
      <p><strong>DOB:</strong> {patient.dob}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Address:</strong> {patient.address}</p>
      <p><strong>Phone:</strong> {patient.phone_no}</p>
      <div className="mt-4">
        <strong>Tags:</strong>
        <ul className="list-disc pl-6">
          {patient.tags?.map((tag, i) => (
            <li key={i}>{tag.name} ({tag.tag_category})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}