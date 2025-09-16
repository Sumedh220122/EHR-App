import {Appointment, IRescheduleAppointment, Patient} from "../types/appointment";

export class AppointmentService {
    private api_key: string;
    private username: string;
    private base_url: string;

    private creds: string;

    constructor(){
        this.api_key = process.env.NEXT_PUBLIC_SECRET_KEY || "";
        this.username = process.env.NEXT_PUBLIC_USERNAME || "";
        this.base_url = process.env.NEXT_PUBLIC_FHIR_URI || "";
        this.creds = Buffer.from(`${this.username}:${this.api_key}`).toString("base64");
    }

    async getAppointmentById(id: string): Promise<Appointment> {
        try{
            const response = await fetch(`${this.base_url}/appointments/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Basic ${this.creds}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const raw = await response.json();
            
            return {
                id: raw.id,
                title: raw.title,
                status: raw.appointment_status,
                location: raw.appointment_location,
                patient_details: {
                    patient_id: raw.patient_details.id,
                    first_name: raw.patient_details.first_name,
                    last_name: raw.patient_details.last_name,
                    dob: raw.patient_details.dob,
                    sex: raw.patient_details.sex,
                    email: raw.patient_details.email
                },
                start_time: raw.start_time,
                end_time: raw.end_time
            }
        }catch(error){
            throw error;
        }
    }

    async createAppointment(data: {
        start_date_time: string, end_date_time: string, provider_id: string, 
        appointment_type: string, title: string, appointment_note: string
    }) : Promise<Appointment>{    

        try{
            const response = await fetch(`${this.base_url}/appointments`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${this.creds}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const raw = await response.json();
        
            return {
                id: raw.id,
                title: raw.title,
                status: raw.appointment_status,
                location: raw.appointment_location,
                patient_details: {
                    patient_id: raw.patient_details.id,
                    first_name: raw.patient_details.first_name,
                    last_name: raw.patient_details.last_name,
                    dob: raw.patient_details.dob,
                    sex: raw.patient_details.sex,
                    email: raw.patient_details.email
                },
                start_time: raw.start_time,
                end_time: raw.end_time
            };
        }catch(error){
            throw error;
        }
    }

    async rescheduleAppointment(id: string, update_data: IRescheduleAppointment): Promise<Appointment>{
        try{
            const response = await fetch(`${this.base_url}/appointments/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Basic ${this.creds}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update_data)
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const raw = await response.json();
        
            return {
                id: raw.id,
                title: raw.title,
                status: raw.appointment_status,
                location: raw.appointment_location,
                patient_details: {
                    patient_id: raw.patient_details.id,
                    first_name: raw.patient_details.first_name,
                    last_name: raw.patient_details.last_name,
                    dob: raw.patient_details.dob,
                    sex: raw.patient_details.sex,
                    email: raw.patient_details.email
                },
                start_time: raw.start_time,
                end_time: raw.end_time
            };
        }catch(error){
            throw error;
        }
    }
    
    async cancelAppointment(appointment_id: string){
        try{
            return this.rescheduleAppointment(appointment_id, {status: "cancelled"});
        }catch(error){
            throw error;
        }
    }
}

export const appointmentService = new AppointmentService();
