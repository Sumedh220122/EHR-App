import { NextResponse } from 'next/server';
import { appointmentService } from '../../../../../services/AppointmentService';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, context: {params: Promise<{ id: string }> }) {
    try {
        const {id} = await context.params;
        const patient = await appointmentService.getAppointmentById(id);
        return NextResponse.json(patient, { status: 200 });
    }catch (error) {
        throw error;
    }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string}> }) {
    try {
        const {id} = await context.params;
        const body = (await req.json().catch(() => ({}))) || {};

        if(Object.keys(body).length !== 0){
            const {start_date_time, pt_id} = body;
            const rescheduledAppointment = await appointmentService.rescheduleAppointment(
                                            id, {start_date_time, pt_id});
            return NextResponse.json(rescheduledAppointment, { status: 201 });
        }
        else{
            const cancelledAppointment = await appointmentService.cancelAppointment(id)
            return NextResponse.json(cancelledAppointment, { status: 201 });
        }

    } catch (error) {
        console.error('Error cancelling appointment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
