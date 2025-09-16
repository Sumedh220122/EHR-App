export interface Appointment {
  id?: string;
  title?: string;
  status?: "scheduled" | "confirmed" | "checked-in" | "in-room" | "cancelled";
  location?:string;
  patient_details?: Patient;
  start_time: string;
  end_time: string;
}

export interface Patient {
  patient_id: string
  first_name: string;
  last_name: string;
  dob: string;
  sex: "M" | "F" | "?"
  email: string;
}

export interface ICreateAppointment{
  start_time: string;
  end_time: string;
  provider_id: number;
  appointment_type: "Routine Visit (Rob)" | "Same Day BMAC Harvest" | "Same Day BMAC Reinjection" | "SCP"
  | "SCP (3 Step)" | "SCP Blood Draw" | "Sedation Tag" | "Spine - Low Back" | "Spine - Neck" | "Spine Pain";
  title: string;
  appointment_note?: string;
}

export interface IRescheduleAppointment{
  start_date_time?: string,
  pt_id?: string,
  status?:string;
}