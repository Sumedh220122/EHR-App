"use client";

import { useState } from "react";
import OperationSelector from "../../components/Patients/OperationSelector";
import PatientForm from "../../components/Patients/PatientForm";
import PatientCard from "../../components/Patients/PatientCard";
import type { Patient } from "../../types/patient";

export default function PatientsPage() {
  const [operation, setOperation] = useState<"getById" | "create" | "update" | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  const handleOperationSelect = (selectedOperation: "getById" | "create" | "update") => {
    setOperation(selectedOperation);
    setPatient(null); // Clear previous patient data
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    if (operation === "getById") {
      const res = await fetch(`/api/v1/patients/${formData.patientId}`);
      const data: Patient = await res.json();
      setPatient(data);
    }
    else if(operation == "create"){
      const res = await fetch('/api/v1/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          dob: formData.dob,
          sex: formData.sex,
        }),
      });
      const data: Patient = await res.json();
      setPatient(data);
    }
    else if(operation == "update"){
      const res = await fetch(`/api/v1/patients/${formData.patientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          dob: formData.dob,
          sex: formData.sex,
        }),
      });
      const data: Patient = await res.json();
      setPatient(data);
    }
  };

  return (
    <main className="p-6">
      <OperationSelector onSelect={handleOperationSelect} />
      {(operation === "getById" || operation == "create" || operation == "update") && 
      <PatientForm operation={operation} onSubmit={handleSubmit} />}
      {patient && <PatientCard patient={patient} />}
    </main>
  );
}
