import { NextResponse } from 'next/server';
import { appointmentService } from '../../../../../services/AppointmentService';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, context: {params: Promise<{ id: string }> }) {
    try {
        const api_key = req.headers.get('x-api-key');
        const username = req.headers.get('x-username');
        
        if (!api_key || !username) {
            return NextResponse.json(
                { error: 'Missing credentials in headers' },
                { status: 401 }
            );
        }

        const {id} = await context.params;
        const appointment = await appointmentService.getAppointmentById(id, api_key, username);
        return NextResponse.json(appointment, { status: 200 });
    }catch (error) {
        console.error('Error fetching appointment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string}> }) {
    try {
        const api_key = req.headers.get('x-api-key');
        const username = req.headers.get('x-username');
        
        if (!api_key || !username) {
            return NextResponse.json(
                { error: 'Missing credentials in headers' },
                { status: 401 }
            );
        }

        const {id} = await context.params;
        const body = (await req.json().catch(() => ({}))) || {};

        if(Object.keys(body).length !== 0){
            const {start_date_time, pt_id} = body;
            const rescheduledAppointment = await appointmentService.rescheduleAppointment(
                                            id, {start_date_time, pt_id}, api_key, username);
            return NextResponse.json(rescheduledAppointment, { status: 201 });
        }
        else{
            const cancelledAppointment = await appointmentService.cancelAppointment(id, api_key, username)
            return NextResponse.json(cancelledAppointment, { status: 201 });
        }

    } catch (error) {
        console.error('Error updating appointment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
