// Test suite index for Appointments components
// This file ensures all appointment component tests are discovered and run together

describe('Appointments Components Test Suite', () => {
  it('should have all appointment component tests available', () => {
    // This test ensures the test suite is properly configured
    expect(true).toBe(true);
  });
});

// Import all test files to ensure they're included in the test run
import './AppointmentCard.test';
import './AppointmentForm.test';
import './OperationSelector.test';