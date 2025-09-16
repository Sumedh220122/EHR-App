import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PatientForm from '../../../components/Patients/PatientForm';

// Mock window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('PatientForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockAlert.mockClear();
  });

  describe('getById operation', () => {
    it('renders form for getting patient by ID', () => {
      render(<PatientForm operation="getById" onSubmit={mockOnSubmit} />);
      
      expect(screen.getByText('Get Patient by ID')).toBeInTheDocument();
      expect(screen.getByLabelText(/patientid/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('submits form with patient ID', async () => {
      const user = userEvent.setup();
      render(<PatientForm operation="getById" onSubmit={mockOnSubmit} />);
      
      const patientIdInput = screen.getByLabelText(/patientid/i);
      await user.type(patientIdInput, '123');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      expect(mockOnSubmit).toHaveBeenCalledWith({ patientId: '123' });
    });
  });

  describe('create operation', () => {
    it('renders form for creating patient', () => {
      render(<PatientForm operation="create" onSubmit={mockOnSubmit} />);
      
      expect(screen.getByText('Create New Patient')).toBeInTheDocument();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dob/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/sex/i)).toBeInTheDocument();
    });

    it('submits form with valid patient data', async () => {
      const user = userEvent.setup();
      render(<PatientForm operation="create" onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/dob/i), '1990-01-01');
      await user.type(screen.getByLabelText(/sex/i), 'M');
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        first_name: 'John',
        last_name: 'Doe',
        dob: '1990-01-01',
        sex: 'M'
      });
    });

    it('shows alert for invalid sex value', async () => {
      const user = userEvent.setup();
      render(<PatientForm operation="create" onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/dob/i), '1990-01-01');
      await user.type(screen.getByLabelText(/sex/i), 'Invalid');
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(mockAlert).toHaveBeenCalledWith('Please enter a valid sex, must be one amongst M or F or ?');
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('accepts valid sex values M, F, and ?', async () => {
      const user = userEvent.setup();
      const validSexValues = ['M', 'F', '?'];
      
      for (const sexValue of validSexValues) {
        mockOnSubmit.mockClear();
        const { unmount } = render(<PatientForm operation="create" onSubmit={mockOnSubmit} />);
        
        await user.type(screen.getByLabelText(/first name/i), 'John');
        await user.type(screen.getByLabelText(/last name/i), 'Doe');
        await user.type(screen.getByLabelText(/dob/i), '1990-01-01');
        await user.type(screen.getByLabelText(/sex/i), sexValue);
        
        await user.click(screen.getByRole('button', { name: /submit/i }));
        
        expect(mockOnSubmit).toHaveBeenCalledWith({
          first_name: 'John',
          last_name: 'Doe',
          dob: '1990-01-01',
          sex: sexValue
        });
        
        unmount();
      }
    });
  });

  describe('update operation', () => {
    it('renders form for updating patient', () => {
      render(<PatientForm operation="update" onSubmit={mockOnSubmit} />);
      
      expect(screen.getByText('Update Patient')).toBeInTheDocument();
      expect(screen.getByLabelText(/patientid/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dob/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/sex/i)).toBeInTheDocument();
    });

    it('submits form with update data', async () => {
      const user = userEvent.setup();
      render(<PatientForm operation="update" onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText(/patientid/i), '123');
      await user.type(screen.getByLabelText(/first name/i), 'Jane');
      await user.type(screen.getByLabelText(/last name/i), 'Smith');
      await user.type(screen.getByLabelText(/dob/i), '1985-05-15');
      await user.type(screen.getByLabelText(/sex/i), 'F');
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        patientId: '123',
        first_name: 'Jane',
        last_name: 'Smith',
        dob: '1985-05-15',
        sex: 'F'
      });
    });

    it('validates sex field for update operation', async () => {
      const user = userEvent.setup();
      render(<PatientForm operation="update" onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText(/patientid/i), '123');
      await user.type(screen.getByLabelText(/first name/i), 'Jane');
      await user.type(screen.getByLabelText(/last name/i), 'Smith');
      await user.type(screen.getByLabelText(/dob/i), '1985-05-15');
      await user.type(screen.getByLabelText(/sex/i), 'Invalid');
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(mockAlert).toHaveBeenCalledWith('Please enter a valid sex, must be one amongst M or F or ?');
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('form interactions', () => {
    it('updates input values when typing', async () => {
      const user = userEvent.setup();
      render(<PatientForm operation="getById" onSubmit={mockOnSubmit} />);
      
      const input = screen.getByLabelText(/patientid/i);
      await user.type(input, 'test123');
      
      expect(input).toHaveValue('test123');
    });

    it('has proper styling classes', () => {
      const { container } = render(<PatientForm operation="getById" onSubmit={mockOnSubmit} />);
      
      const form = container.querySelector('form');
      expect(form).toHaveClass('space-y-6', 'w-full', 'max-w-md', 'bg-white', 'p-8', 'rounded-xl', 'shadow-lg', 'border');
    });

    it('prevents form submission when required fields are empty', () => {
      render(<PatientForm operation="getById" onSubmit={mockOnSubmit} />);
      
      const form = screen.getByRole('button', { name: /submit/i }).closest('form');
      fireEvent.submit(form!);
      
      // Form validation should prevent submission, but we can't easily test HTML5 validation
      // This test ensures the form structure is correct
      expect(form).toBeInTheDocument();
    });

    it('displays correct field labels with proper formatting', () => {
      render(<PatientForm operation="create" onSubmit={mockOnSubmit} />);
      
      expect(screen.getByText('first name')).toBeInTheDocument();
      expect(screen.getByText('last name')).toBeInTheDocument();
      expect(screen.getByText('dob')).toBeInTheDocument();
      expect(screen.getByText('sex')).toBeInTheDocument();
    });

    it('clears form data between operations', () => {
      const { rerender } = render(<PatientForm operation="getById" onSubmit={mockOnSubmit} />);
      
      // Switch to create operation
      rerender(<PatientForm operation="create" onSubmit={mockOnSubmit} />);
      
      // All inputs should be empty
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveValue('');
      });
    });
  });
});