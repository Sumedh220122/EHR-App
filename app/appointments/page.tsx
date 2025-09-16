"use client";

import { useState } from "react";
import OperationSelector from "../../components/Appointments/OperationSelector";
import AppointmentForm from "../../components/Appointments/AppointmentForm";
import AppointmentCard from "../../components/Appointments/AppointmentCard";
import type { Appointment } from "../../types/appointment";

export default function AppointmentsPage() {
  const [operation, setOperation] = useState<"getById" | "create" | "reschedule" | "cancel" | null>(null);
  const [patient, setAppointment] = useState<Appointment | null>(null);

  const handleOperationSelect = (selectedOperation: "getById" | "create" | "reschedule" | "cancel") => {
    setOperation(selectedOperation);
    setAppointment(null); // Clear previous patient data
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    if (operation === "getById") {
        try{
            const res = await fetch(`/api/v1/appointments/${formData.appointmentId}`);
            const data: Appointment = await res.json();
            setAppointment(data);
        }catch(error){
            alert("Could not fetch appointment. Invalid appointment ID!!");
        }
    }
    else if(operation == "create"){
        const res = await fetch('/api/v1/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start_date_time: formData.start_time,
                end_date_time: formData.end_time,
                provider_id: formData.provider_id,
                appointment_type: formData.appointment_type,
                title: formData.title,
                appointment_note: formData.appointment_note,
            }),
        });
        const data: Appointment = await res.json();
        setAppointment(data);
    }
    else if(operation == "reschedule"){
        const res = await fetch(`/api/v1/appointments/${formData.appointmentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start_time: formData.start_time,
                pt_id: formData.pt_id,
            }),
        });
        const data: Appointment = await res.json();
        setAppointment(data);
    }
    else if(operation == "cancel"){
        const res = await fetch(`/api/v1/appointments/${formData.appointmentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: null,
        });
        const data: Appointment = await res.json();
        setAppointment(data);
    }
  };

  return (
    <main className="p-6">
      <OperationSelector onSelect={handleOperationSelect} />
      {(operation === "getById" || operation == "create" || operation == "reschedule" || operation == "cancel") && 
        <AppointmentForm operation={operation} onSubmit={handleSubmit} />}
      {patient && <AppointmentCard appointment={patient} />}
    </main>
  );
}
