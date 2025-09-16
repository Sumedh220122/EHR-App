import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import OperationSelector from '../../../components/Patients/OperationSelector';

describe('OperationSelector', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders all operation buttons', () => {
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    expect(screen.getByRole('button', { name: /get patient by id/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create patient/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update patient/i })).toBeInTheDocument();
  });

  it('calls onSelect with "getById" when Get Patient by ID button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const getByIdButton = screen.getByRole('button', { name: /get patient by id/i });
    await user.click(getByIdButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('getById');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with "create" when Create Patient button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const createButton = screen.getByRole('button', { name: /create patient/i });
    await user.click(createButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('create');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with "update" when Update Patient button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const updateButton = screen.getByRole('button', { name: /update patient/i });
    await user.click(updateButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('update');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('has proper styling and layout', () => {
    const { container } = render(<OperationSelector onSelect={mockOnSelect} />);
    
    const buttonContainer = container.querySelector('.flex.justify-center.gap-6.flex-wrap.pt-8');
    expect(buttonContainer).toBeInTheDocument();
    
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
    
    // Check that each button has the expected styling classes
    buttons.forEach(button => {
      expect(button).toHaveClass('px-6', 'py-4', 'text-white', 'rounded-xl', 'shadow-lg', 'transition-all', 'duration-200', 'font-medium');
    });
  });

  it('has correct color classes for each button', () => {
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const getByIdButton = screen.getByRole('button', { name: /get patient by id/i });
    const createButton = screen.getByRole('button', { name: /create patient/i });
    const updateButton = screen.getByRole('button', { name: /update patient/i });
    
    expect(getByIdButton).toHaveClass('bg-blue-600', 'hover:bg-blue-700');
    expect(createButton).toHaveClass('bg-green-600', 'hover:bg-green-700');
    expect(updateButton).toHaveClass('bg-yellow-500', 'hover:bg-yellow-600');
  });

  it('handles multiple button clicks correctly', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const getByIdButton = screen.getByRole('button', { name: /get patient by id/i });
    const createButton = screen.getByRole('button', { name: /create patient/i });
    const updateButton = screen.getByRole('button', { name: /update patient/i });
    
    await user.click(getByIdButton);
    await user.click(createButton);
    await user.click(updateButton);
    
    expect(mockOnSelect).toHaveBeenCalledTimes(3);
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, 'getById');
    expect(mockOnSelect).toHaveBeenNthCalledWith(2, 'create');
    expect(mockOnSelect).toHaveBeenNthCalledWith(3, 'update');
  });

  it('maintains button state after clicks', async () => {
    const user = userEvent.setup();
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const createButton = screen.getByRole('button', { name: /create patient/i });
    
    await user.click(createButton);
    
    // Button should still be rendered and clickable
    expect(createButton).toBeInTheDocument();
    expect(createButton).toBeEnabled();
    
    // Should be able to click again
    await user.click(createButton);
    expect(mockOnSelect).toHaveBeenCalledTimes(2);
  });

  it('renders buttons with correct text content', () => {
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Get Patient by ID')).toBeInTheDocument();
    expect(screen.getByText('Create Patient')).toBeInTheDocument();
    expect(screen.getByText('Update Patient')).toBeInTheDocument();
  });

  it('has accessible button roles', () => {
    render(<OperationSelector onSelect={mockOnSelect} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    
    buttons.forEach(button => {
      expect(button).toBeVisible();
      expect(button).toBeEnabled();
    });
  });
});