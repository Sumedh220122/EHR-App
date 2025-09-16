"use client";

import { useState } from "react";
import OperationSelector from "../../components/Appointments/OperationSelector";
import AppointmentForm from "../../components/Appointments/AppointmentForm";
import AppointmentCard from "../../components/Appointments/AppointmentCard";
import { useApiClient } from "../../hooks/useApiClient";
import type { Appointment } from "../../types/appointment";

export default function AppointmentsPage() {
  const [operation, setOperation] = useState<"getById" | "create" | "reschedule" | "cancel" | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const { apiCall } = useApiClient();

  const handleOperationSelect = (selectedOperation: "getById" | "create" | "reschedule" | "cancel") => {
    setOperation(selectedOperation);
    setAppointment(null); // Clear previous appointment data
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      if (operation === "getById") {
        const data: Appointment = await apiCall(`/api/v1/appointments/${formData.appointmentId}`);
        setAppointment(data);
      }
      else if(operation == "create"){
        const data: Appointment = await apiCall('/api/v1/appointments', {
          method: 'POST',
          body: JSON.stringify({
            start_date_time: formData.start_time,
            end_date_time: formData.end_time,
            provider_id: formData.provider_id,
            appointment_type: formData.appointment_type,
            title: formData.title,
            appointment_note: formData.appointment_note,
          }),
        });
        setAppointment(data);
      }
      else if(operation == "reschedule"){
        const data: Appointment = await apiCall(`/api/v1/appointments/${formData.appointmentId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            start_time: formData.start_time,
            pt_id: formData.pt_id,
          }),
        });
        setAppointment(data);
      }
      else if(operation == "cancel"){
        const data: Appointment = await apiCall(`/api/v1/appointments/${formData.appointmentId}`, {
          method: 'PATCH',
          body: null,
        });
        setAppointment(data);
      }
    } catch (error) {
      console.error('API call failed:', error);
      alert(`Operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <main className="p-6">
      <OperationSelector onSelect={handleOperationSelect} />
      {(operation === "getById" || operation == "create" || operation == "reschedule" || operation == "cancel") && 
        <AppointmentForm operation={operation} onSubmit={handleSubmit} />}
      {appointment && <AppointmentCard appointment={appointment} />}
    </main>
  );
}
