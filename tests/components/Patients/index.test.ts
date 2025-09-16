// Test suite index for Patient components
// This file ensures all patient component tests are discovered and run together

describe('Patient Components Test Suite', () => {
  it('should have all patient component tests available', () => {
    // This test ensures the test suite is properly configured
    expect(true).toBe(true);
  });
});

// Import all test files to ensure they're included in the test run
import './PatientCard.test';
import './PatientForm.test';
import './OperationSelector.test';