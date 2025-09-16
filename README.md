# Healthcare Management System

A Next.js application for managing patients and appointments by getting access to EHIR resources.

## Features

- **Patient Management**: Create, read, and update patient records
- **Appointment Management**: Create, reschedule, cancel, and view appointments
- **Secure Credential Management**: Dynamic credential input with client-side state management
- **FHIR Integration**: Connects to FHIR-compliant healthcare APIs

## Architecture

### Credential Management
- Credentials (API key and username) are managed in React Context
- No hardcoded credentials in environment variables
- Credentials are passed via HTTP headers to API routes
- API routes validate credentials before processing requests

### API Structure
```
/api/v1/patients/
├── POST /          # Create patient
├── GET /[id]       # Get patient by ID
└── PATCH /[id]     # Update patient

/api/v1/appointments/
├── POST /          # Create appointment
├── GET /[id]       # Get appointment by ID
└── PATCH /[id]     # Reschedule/cancel appointment
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Access to a FHIR-compliant healthcare API

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthcare-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# .env.local
NEXT_PUBLIC_FHIR_URI=https://your-fhir-api-endpoint.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Initial Setup
1. When you first visit the app, you'll see a credential configuration form
2. Enter your API username and API key
3. Click "Save Credentials" to proceed

### Managing Patients
1. Click "Go to Patients" from the home page
2. Select an operation: Get by ID, Create, or Update
3. Fill in the required fields
4. Submit to perform the operation

### Managing Appointments
1. Click "Go to Appointments" from the home page
2. Select an operation: Get by ID, Create, Reschedule, or Cancel
3. Fill in the required fields
4. Submit to perform the operation

## Project Structure

```
├── app/
│   ├── api/v1/                 # API routes
│   │   ├── patients/           # Patient API endpoints
│   │   └── appointments/       # Appointment API endpoints
│   ├── patients/               # Patient management pages
│   ├── appointments/           # Appointment management pages
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Home page with credential form
├── components/                 # Reusable UI components
├── contexts/
│   └── CredentialsContext.tsx  # Credential management context
├── hooks/
│   └── useApiClient.ts         # API client with credential injection
├── services/
│   ├── PatientService.ts       # Patient service layer
│   └── AppointmentService.ts   # Appointment service layer
└── types/                      # TypeScript type definitions
```

## Security Features

- **No Credential Storage**: Credentials are only stored in memory during the session
- **Header-Based Authentication**: Credentials passed via HTTP headers, not URL parameters
- **Input Validation**: All API endpoints validate required fields
- **Error Handling**: Comprehensive error handling with user-friendly messages

## API Authentication

All API requests require the following headers:
```
x-api-key: your-api-key
x-username: your-username
```

Missing credentials will return a 401 Unauthorized response.

## Development

### Adding New Features
1. Create service methods in the appropriate service file
2. Add API routes in the `app/api/v1/` directory
3. Update the UI components as needed
4. Use the `useApiClient` hook for API calls

### Environment Variables
- `NEXT_PUBLIC_FHIR_URI`: The base URL for your FHIR API endpoint

## Error Handling

The application includes comprehensive error handling:
- API validation errors (400 Bad Request)
- Authentication errors (401 Unauthorized)
- Server errors (500 Internal Server Error)
- Network errors and timeouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.