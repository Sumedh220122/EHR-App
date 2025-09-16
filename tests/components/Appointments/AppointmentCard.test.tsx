import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentCard from '../../../components/Appointments/AppointmentCard';
import { Appointment } from '../../../types/appointment';

// Mock appointment data
const mockAppointment: Appointment = {
  id: '1',
  title: 'Routine Checkup',
  status: 'scheduled',
  location: 'Room 101',
  start_time: '2024-01-15T10:00:00Z',
  end_time: '2024-01-15T11:00:00Z',
  patient_details: {
    patient_id: 'p1',
    first_name: 'John',
    last_name: 'Doe',
    dob: '1990-01-01',
    sex: 'M',
    email: 'john.doe@example.com'
  }
};

const mockAppointmentWithoutPatient: Appointment = {
  id: '2',
  title: 'Follow-up Visit',
  status: 'confirmed',
  location: 'Room 202',
  start_time: '2024-01-16T14:00:00Z',
  end_time: '2024-01-16T15:00:00Z'
};

describe('AppointmentCard', () => {
  it('renders appointment information correctly', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    
    expect(screen.getByText('Routine Checkup')).toBeInTheDocument();
    expect(screen.getByText('scheduled')).toBeInTheDocument();
    expect(screen.getByText('Room 101')).toBeInTheDocument();
  });

  it('displays patient details when available', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    
    expect(screen.getByText('Appointment Details:')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('DOB: 1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('Sex: M')).toBeInTheDocument();
  });

  it('does not display patient details when not available', () => {
    render(<AppointmentCard appointment={mockAppointmentWithoutPatient} />);
    
    expect(screen.queryByText('Appointment Details:')).not.toBeInTheDocument();
    expect(screen.queryByText(/Name:/)).not.toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    const { container } = render(<AppointmentCard appointment={mockAppointment} />);
    
    const cardContainer = container.querySelector('.flex.justify-center.mt-6');
    expect(cardContainer).toBeInTheDocument();
    
    const card = container.querySelector('.p-8.border.rounded-xl.bg-white.shadow-lg');
    expect(card).toBeInTheDocument();
  });

  it('handles different appointment statuses', () => {
    const appointmentWithDifferentStatus: Appointment = {
      ...mockAppointment,
      status: 'cancelled'
    };
    
    render(<AppointmentCard appointment={appointmentWithDifferentStatus} />);
    expect(screen.getByText('cancelled')).toBeInTheDocument();
  });
});