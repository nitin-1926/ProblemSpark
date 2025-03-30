'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// Enhanced AuthProvider that tries to recover from session errors
export function AuthProvider({ children }: { children: React.ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
