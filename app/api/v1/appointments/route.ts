import { NextResponse } from 'next/server';
import { appointmentService } from '../../../../services/AppointmentService';

export async function POST(req: Request) {
    try {
        const api_key = req.headers.get('x-api-key');
        const username = req.headers.get('x-username');
        
        if (!api_key || !username) {
            return NextResponse.json(
                { error: 'Missing credentials in headers' },
                { status: 401 }
            );
        }

        const body = await req.json();

        const {start_date_time, end_date_time, provider_id, appointment_type, title, appointment_note} = body;

        if (!start_date_time || !end_date_time || !provider_id || !appointment_type || !title ||!appointment_note) {
            return NextResponse.json(
                { error: 'Missing required fields '},
                { status: 400 }
            );
        }
        const newAppointment = await appointmentService.createAppointment(
            {start_date_time, end_date_time, provider_id, appointment_type, title, appointment_note},
            api_key,
            username
        );
        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
