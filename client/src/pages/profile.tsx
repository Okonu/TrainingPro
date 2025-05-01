import React from 'react';
import { UserProfile } from '@/components/auth/UserProfile';
import Header from '@/components/header';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12">
        <UserProfile />
      </div>
    </div>
  );
}