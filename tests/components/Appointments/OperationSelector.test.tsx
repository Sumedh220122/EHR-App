import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import OperationSelector from '../../../components/Appointments/OperationSelector';

describe('OperationSelector', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders all operation buttons', () => {
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    expect(screen.getByRole('button', { name: /get appointment by id/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reschedule appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel appointment/i })).toBeInTheDocument();
  });

  it('calls onSelect with "getById" when Get Appointment by ID button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const getByIdButton = screen.getByRole('button', { name: /get appointment by id/i });
    await user.click(getByIdButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('getById');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with "create" when Create Appointment button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const createButton = screen.getByRole('button', { name: /create appointment/i });
    await user.click(createButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('create');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with "reschedule" when Reschedule Appointment button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const rescheduleButton = screen.getByRole('button', { name: /reschedule appointment/i });
    await user.click(rescheduleButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('reschedule');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with "cancel" when Cancel Appointment button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel appointment/i });
    await user.click(cancelButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('cancel');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('has proper styling and layout', () => {
    const { container } = render(<OperationSelector onSelect={mockOnSelect} />);
    
    const buttonContainer = container.querySelector('.flex.justify-center.gap-6.flex-wrap.pt-8');
    expect(buttonContainer).toBeInTheDocument();
    
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(4);
    
    // Check that each button has the expected styling classes
    buttons.forEach(button => {
      expect(button).toHaveClass('px-6', 'py-4', 'text-white', 'rounded-xl', 'shadow-lg', 'transition-all', 'duration-200', 'font-medium');
    });
  });

  it('has correct color classes for each button', () => {
    const { container } = render(<OperationSelector onSelect={mockOnSelect} />);
    
    const getByIdButton = screen.getByRole('button', { name: /get appointment by id/i });
    const createButton = screen.getByRole('button', { name: /create appointment/i });
    const rescheduleButton = screen.getByRole('button', { name: /reschedule appointment/i });
    const cancelButton = screen.getByRole('button', { name: /cancel appointment/i });
    
    expect(getByIdButton).toHaveClass('bg-blue-600', 'hover:bg-blue-700');
    expect(createButton).toHaveClass('bg-green-600', 'hover:bg-green-700');
    expect(rescheduleButton).toHaveClass('bg-yellow-500', 'hover:bg-yellow-600');
    expect(cancelButton).toHaveClass('bg-red-500', 'hover:bg-yellow-600');
  });

  it('handles multiple button clicks correctly', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const getByIdButton = screen.getByRole('button', { name: /get appointment by id/i });
    const createButton = screen.getByRole('button', { name: /create appointment/i });
    
    await user.click(getByIdButton);
    await user.click(createButton);
    
    expect(mockOnSelect).toHaveBeenCalledTimes(2);
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, 'getById');
    expect(mockOnSelect).toHaveBeenNthCalledWith(2, 'create');
  });
});