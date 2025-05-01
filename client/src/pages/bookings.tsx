import React from 'react';
import Header from '@/components/header';
import { useAuthContext } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function BookingsPage() {
  const { currentUser, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto pt-32 pb-12">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto pt-32 pb-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please log in to view your bookings.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto pt-32 pb-12">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Upcoming Bookings</CardTitle>
            <CardDescription>
              View and manage your registered programs and events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">No Bookings Yet</h3>
              <p className="text-muted-foreground mt-1 mb-6">You haven't registered for any programs or events yet.</p>
              <Button asChild>
                <Link href="/#programs">Browse Programs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}