"use client";

import { useState } from "react";
import OperationSelector from "../../components/Patients/OperationSelector";
import PatientForm from "../../components/Patients/PatientForm";
import PatientCard from "../../components/Patients/PatientCard";
import { useApiClient } from "../../hooks/useApiClient";
import type { Patient } from "../../types/patient";

export default function PatientsPage() {
  const [operation, setOperation] = useState<"getById" | "create" | "update" | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const { apiCall } = useApiClient();

  const handleOperationSelect = (selectedOperation: "getById" | "create" | "update") => {
    setOperation(selectedOperation);
    setPatient(null); // Clear previous patient data
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      if (operation === "getById") {
        const data: Patient = await apiCall(`/api/v1/patients/${formData.patientId}`);
        setPatient(data);
      }
      else if(operation == "create"){
        const data: Patient = await apiCall('/api/v1/patients', {
          method: 'POST',
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            dob: formData.dob,
            sex: formData.sex,
          }),
        });
        setPatient(data);
      }
      else if(operation == "update"){
        const data: Patient = await apiCall(`/api/v1/patients/${formData.patientId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            dob: formData.dob,
            sex: formData.sex,
          }),
        });
        setPatient(data);
      }
    } catch (error) {
      console.error('API call failed:', error);
      alert(`Operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
