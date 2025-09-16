import React from "react";

import { Appointment } from "../../types/appointment";

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex justify-center mt-6">
      <div className="p-8 border rounded-xl bg-white shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{appointment.title}</h2>
        <div className="space-y-3">
          <p className="text-gray-700"><strong className="text-gray-900">Status:</strong> {appointment.status}</p>
          <p className="text-gray-700"><strong className="text-gray-900">Location:</strong> {appointment.location}</p>
          {appointment.patient_details && (
            <div className="mt-6">
              <strong className="text-gray-900 block mb-3">Appointment Details:</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-700">Name: {appointment.patient_details.first_name} {appointment.patient_details.last_name}</li>
                <li className="text-gray-700">DOB: {appointment.patient_details.dob}</li>
                <li className="text-gray-700">Sex: {appointment.patient_details.sex}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}