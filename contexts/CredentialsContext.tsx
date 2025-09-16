'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Credentials {
    api_key: string;
    username: string;
}

interface CredentialsContextType {
    credentials: Credentials;
    setCredentials: (credentials: Credentials) => void;
    updateCredentials: (updates: Partial<Credentials>) => void;
    isConfigured: boolean;
    clearCredentials: () => void;
}

const CredentialsContext = createContext<CredentialsContextType | undefined>(undefined);

interface CredentialsProviderProps {
    children: ReactNode;
}

export function CredentialsProvider({ children }: CredentialsProviderProps) {
    const [credentials, setCredentialsState] = useState<Credentials>({
        api_key: '',
        username: '',
    });

    const setCredentials = (newCredentials: Credentials) => {
        setCredentialsState(newCredentials);
    };

    const updateCredentials = (updates: Partial<Credentials>) => {
        setCredentialsState(prev => ({ ...prev, ...updates }));
    };

    const clearCredentials = () => {
        setCredentialsState({
            api_key: '',
            username: '',
        });
    };

    const isConfigured = Boolean(
        credentials.api_key &&
        credentials.username
    );

    const value: CredentialsContextType = {
        credentials,
        setCredentials,
        updateCredentials,
        isConfigured,
        clearCredentials,
    };

    return (
        <CredentialsContext.Provider value={value}>
            {children}
        </CredentialsContext.Provider>
    );
}

export function useCredentials() {
    const context = useContext(CredentialsContext);
    if (context === undefined) {
        throw new Error('useCredentials must be used within a CredentialsProvider');
    }
    return context;
}