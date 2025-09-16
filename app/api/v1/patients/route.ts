import { NextResponse } from 'next/server';
import { patientService } from '../../../../services/PatientService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { first_name, last_name, dob, sex } = body;

    if (!first_name || !last_name || !dob || !sex) {
      return NextResponse.json(
        { error: 'Missing required fields: first_name, last_name, dob, sex' },
        { status: 400 }
      );
    }

    const newPatient = await patientService.createPatient({ first_name, last_name, dob, sex });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
