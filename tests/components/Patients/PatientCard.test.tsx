import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PatientCard from '../../../components/Patients/PatientCard';
import { Patient } from '../../../types/patient';

// Mock patient data
const mockPatient: Patient = {
  id: '1',
  name: 'John Doe',
  dob: '1990-01-01',
  gender: 'Male',
  address: '123 Main St, City, State',
  phone_no: '555-0123',
  tags: [
    {
      name: 'Diabetes',
      tag_category: 'Medical Condition',
      notes: 'Type 2 diabetes',
      date_applied: '2024-01-01'
    },
    {
      name: 'High Priority',
      tag_category: 'Priority',
      notes: 'Requires immediate attention',
      date_applied: '2024-01-02'
    }
  ]
};

const mockPatientWithoutTags: Patient = {
  id: '2',
  name: 'Jane Smith',
  dob: '1985-05-15',
  gender: 'Female',
  address: '456 Oak Ave, Town, State',
  phone_no: '555-0456'
};

const mockPatientWithEmptyTags: Patient = {
  id: '3',
  name: 'Bob Johnson',
  dob: '1975-12-25',
  gender: 'Male',
  address: '789 Pine Rd, Village, State',
  phone_no: '555-0789',
  tags: []
};

describe('PatientCard', () => {
  it('renders patient information correctly', () => {
    render(<PatientCard patient={mockPatient} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    expect(screen.getByText('555-0123')).toBeInTheDocument();
  });

  it('displays patient tags when available', () => {
    render(<PatientCard patient={mockPatient} />);
    
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('Diabetes (Medical Condition)')).toBeInTheDocument();
    expect(screen.getByText('High Priority (Priority)')).toBeInTheDocument();
  });

  it('does not display tags section when tags are not available', () => {
    render(<PatientCard patient={mockPatientWithoutTags} />);
    
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
  });

  it('does not display tags section when tags array is empty', () => {
    render(<PatientCard patient={mockPatientWithEmptyTags} />);
    
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    const { container } = render(<PatientCard patient={mockPatient} />);
    
    const cardContainer = container.querySelector('.flex.justify-center.mt-6');
    expect(cardContainer).toBeInTheDocument();
    
    const card = container.querySelector('.p-8.border.rounded-xl.bg-white.shadow-lg');
    expect(card).toBeInTheDocument();
  });

  it('displays all patient information fields with proper labels', () => {
    render(<PatientCard patient={mockPatient} />);
    
    expect(screen.getByText('DOB:')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Address:')).toBeInTheDocument();
    expect(screen.getByText('Phone:')).toBeInTheDocument();
  });

  it('handles patient with minimal information', () => {
    const minimalPatient: Patient = {
      name: 'Minimal Patient'
    };
    
    render(<PatientCard patient={minimalPatient} />);
    expect(screen.getByText('Minimal Patient')).toBeInTheDocument();
  });

  it('renders multiple tags correctly', () => {
    render(<PatientCard patient={mockPatient} />);
    
    const tagsList = screen.getByRole('list');
    expect(tagsList).toBeInTheDocument();
    
    const tagItems = screen.getAllByRole('listitem');
    expect(tagItems).toHaveLength(2);
  });
});