import React from "react";

import { Appointment } from "../../types/appointment";

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="mt-8 p-6 border rounded-xl bg-white shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">{appointment.title}</h2>
      <p><strong>Status:</strong> {appointment.status}</p>
      <p><strong>Location:</strong> {appointment.location}</p>
      {appointment.patient_details && (
        <div className="mt-4">
          <strong>Appointment Details:</strong>
          <ul className="list-disc pl-6">
            <li>Name: {appointment.patient_details.first_name} {appointment.patient_details.last_name}</li>
            <li>DOB: {appointment.patient_details.dob}</li>
            <li>Sex: {appointment.patient_details.sex}</li>
          </ul>
        </div>
      )}
    </div>
  );
}