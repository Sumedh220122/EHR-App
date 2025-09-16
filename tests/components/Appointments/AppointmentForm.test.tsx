import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AppointmentForm from '../../../components/Appointments/AppointmentForm';

describe('AppointmentForm', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    describe('getById operation', () => {
        it('renders form for getting appointment by ID', () => {
            render(<AppointmentForm operation="getById" onSubmit={mockOnSubmit} />);

            expect(screen.getByText('Get Appointment by ID')).toBeInTheDocument();
            expect(screen.getByLabelText(/appointmentid/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        });

        it('submits form with appointment ID', async () => {
            const user = userEvent.setup();
            render(<AppointmentForm operation="getById" onSubmit={mockOnSubmit} />);

            const appointmentIdInput = screen.getByLabelText(/appointmentid/i);
            await user.type(appointmentIdInput, '123');

            const submitButton = screen.getByRole('button', { name: /submit/i });
            await user.click(submitButton);

            expect(mockOnSubmit).toHaveBeenCalledWith({ appointmentId: '123' });
        });
    });

    describe('create operation', () => {
        it('renders form for creating appointment', () => {
            render(<AppointmentForm operation="create" onSubmit={mockOnSubmit} />);

            expect(screen.getByText('Create New Appointment')).toBeInTheDocument();
            expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/end time/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/provider id/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/appointment type/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/appointment note/i)).toBeInTheDocument();
        });

        it('submits form with all create fields', async () => {
            const user = userEvent.setup();
            render(<AppointmentForm operation="create" onSubmit={mockOnSubmit} />);

            await user.type(screen.getByLabelText(/start time/i), '2024-01-15T10:00');
            await user.type(screen.getByLabelText(/end time/i), '2024-01-15T11:00');
            await user.type(screen.getByLabelText(/provider id/i), '1');
            await user.type(screen.getByLabelText(/appointment type/i), 'Routine Visit');
            await user.type(screen.getByLabelText(/title/i), 'Checkup');
            await user.type(screen.getByLabelText(/appointment note/i), 'Regular checkup');

            await user.click(screen.getByRole('button', { name: /submit/i }));

            expect(mockOnSubmit).toHaveBeenCalledWith({
                start_time: '2024-01-15T10:00',
                end_time: '2024-01-15T11:00',
                provider_id: '1',
                appointment_type: 'Routine Visit',
                title: 'Checkup',
                appointment_note: 'Regular checkup'
            });
        });
    });

    describe('reschedule operation', () => {
        it('renders form for rescheduling appointment', () => {
            render(<AppointmentForm operation="reschedule" onSubmit={mockOnSubmit} />);

            expect(screen.getByText('Reschedule Appointment')).toBeInTheDocument();
            expect(screen.getByLabelText(/appointmentid/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/pt id/i)).toBeInTheDocument();
        });

        it('submits form with reschedule fields', async () => {
            const user = userEvent.setup();
            render(<AppointmentForm operation="reschedule" onSubmit={mockOnSubmit} />);

            await user.type(screen.getByLabelText(/appointmentid/i), '123');
            await user.type(screen.getByLabelText(/start time/i), '2024-01-16T14:00');
            await user.type(screen.getByLabelText(/pt id/i), 'p1');

            await user.click(screen.getByRole('button', { name: /submit/i }));

            expect(mockOnSubmit).toHaveBeenCalledWith({
                appointmentId: '123',
                start_time: '2024-01-16T14:00',
                pt_id: 'p1'
            });
        });
    });

    describe('cancel operation', () => {
        it('renders form for canceling appointment', () => {
            render(<AppointmentForm operation="cancel" onSubmit={mockOnSubmit} />);

            expect(screen.getByText('Cancel Appointment')).toBeInTheDocument();
            expect(screen.getByLabelText(/appointmentid/i)).toBeInTheDocument();
        });

        it('submits form with appointment ID for cancellation', async () => {
            const user = userEvent.setup();
            render(<AppointmentForm operation="cancel" onSubmit={mockOnSubmit} />);

            await user.type(screen.getByLabelText(/appointmentid/i), '123');
            await user.click(screen.getByRole('button', { name: /submit/i }));

            expect(mockOnSubmit).toHaveBeenCalledWith({ appointmentId: '123' });
        });
    });

    describe('form interactions', () => {
        it('updates input values when typing', async () => {
            const user = userEvent.setup();
            render(<AppointmentForm operation="getById" onSubmit={mockOnSubmit} />);

            const input = screen.getByLabelText(/appointmentid/i);
            await user.type(input, 'test123');

            expect(input).toHaveValue('test123');
        });

        it('submits form when all required fields are filled', async () => {
            const user = userEvent.setup();
            render(<AppointmentForm operation="getById" onSubmit={mockOnSubmit} />);

            const input = screen.getByLabelText(/appointmentid/i);
            await user.type(input, '123');

            const submitButton = screen.getByRole('button', { name: /submit/i });
            await user.click(submitButton);

            expect(mockOnSubmit).toHaveBeenCalledWith({ appointmentId: '123' });
        });

        it('has proper styling classes', () => {
            const { container } = render(<AppointmentForm operation="getById" onSubmit={mockOnSubmit} />);

            const form = container.querySelector('form');
            expect(form).toHaveClass('space-y-6', 'w-full', 'max-w-md', 'bg-white', 'p-8', 'rounded-xl', 'shadow-lg', 'border');
        });
    });
});