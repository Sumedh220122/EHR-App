import { NextResponse } from 'next/server';
import { appointmentService } from '../../../../services/AppointmentService';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {start_date_time, end_date_time, provider_id, appointment_type, title, appointment_note} = body;

        if (!start_date_time || !end_date_time || !provider_id || !appointment_type || !title ||!appointment_note) {
            return NextResponse.json(
                { error: 'Missing required fields '},
                { status: 400 }
            );
        }
        const newAppointment = await appointmentService.createAppointment(
            {start_date_time, end_date_time, provider_id, appointment_type, title, appointment_note}
        );
        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        console.error('Error creating patient:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
