'use client';

import { useState } from "react";
import Link from "next/link";
import { useCredentials } from "../contexts/CredentialsContext";

export default function Home() {
  const { credentials, setCredentials, isConfigured } = useCredentials();
  const [formData, setFormData] = useState({
    api_key: '',
    username: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentials(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isConfigured) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Configure Credentials</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="api_key" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="password"
              id="api_key"
              name="api_key"
              value={formData.api_key}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Credentials
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Healthcare App</h1>
      <div className="space-y-4">
        <p className="text-green-600">✓ Credentials configured</p>
        <Link href="/patients">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Patients
          </button>
        </Link>
        <Link href="/appointments">
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Go to Appointments
          </button>
        </Link>
        <button
          onClick={() => setCredentials({ api_key: '', username: '' })}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Reset Credentials
        </button>
      </div>
    </div>
  );
}
