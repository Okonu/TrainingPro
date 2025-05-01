import React from 'react';
import { Login } from '@/components/auth/Login';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12">
        <Login />
      </div>
    </div>
  );
}