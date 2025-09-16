// app/api/v1/patients/[id]/route.ts
import { NextResponse } from 'next/server';
import { patientService } from '../../../../../services/PatientService';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const api_key = req.headers.get('x-api-key');
    const username = req.headers.get('x-username');

    if (!api_key || !username) {
      return NextResponse.json(
        { error: 'Missing credentials in headers' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const patient = await patientService.getPatientById(id, api_key, username);

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const api_key = req.headers.get('x-api-key');
    const username = req.headers.get('x-username');

    if (!api_key || !username) {
      return NextResponse.json(
        { error: 'Missing credentials in headers' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();

    const { first_name, last_name, dob, sex } = body;

    if (!first_name || !last_name || !dob || !sex) {
      return NextResponse.json(
        { error: 'Missing required fields: first_name, last_name, dob, sex' },
        { status: 400 }
      );
    }

    const newPatient = await patientService.updatePatient(id, { first_name, last_name, dob, sex }, api_key, username);

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
