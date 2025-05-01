import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Redirect, useLocation } from "wouter";
import { Loader2, User, Calendar, Bookmark, Settings, BookOpen, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types for the dashboard
interface Program {
  id: number;
  title: string;
  description: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
}

interface Booking {
  id: number;
  programId: number;
  program: Program;
  bookingDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface UserProfileData {
  bio?: string;
  company?: string;
  position?: string;
  phone?: string;
  location?: string;
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [location, setLocation] = useLocation();
  
  // Get user profile data
  const { data: profileData, isLoading: profileLoading } = useQuery<UserProfileData>({
    queryKey: ["/api/profile", user?.id],
    queryFn: async () => {
      if (!user) return {} as UserProfileData;
      try {
        const res = await apiRequest("GET", `/api/profile/${user.id}`);
        if (!res.ok) {
          // If profile doesn't exist yet, return empty data
          if (res.status === 404) {
            return {} as UserProfileData;
          }
          throw new Error("Failed to fetch profile");
        }
        return await res.json();
      } catch (error) {
        console.error("Error fetching profile:", error);
        return {} as UserProfileData;
      }
    },
    enabled: !!user,
  });
  
  // Get upcoming bookings
  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      try {
        const res = await apiRequest("GET", `/api/bookings/user/${user.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return await res.json();
      } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
      }
    },
    enabled: !!user,
  });
  
  // Filter to get only upcoming bookings
  const upcomingBookings = bookings?.filter(
    (booking) => booking.status !== "completed" && booking.status !== "cancelled"
  ).slice(0, 3) || [];
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Summary */}
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={user.fullName} />
                <AvatarFallback>{user.fullName?.charAt(0) || user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.fullName}</CardTitle>
              <CardDescription className="text-center">
                @{user.username}
              </CardDescription>
              {profileData?.position && profileData?.company && (
                <p className="text-sm text-muted-foreground mt-1">
                  {profileData.position} at {profileData.company}
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                <p>{user.email}</p>
              </div>
              {profileData?.phone && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
                  <p>{profileData.phone}</p>
                </div>
              )}
              {profileData?.location && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                  <p>{profileData.location}</p>
                </div>
              )}
              {profileData?.bio && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">About</h3>
                  <p className="text-sm">{profileData.bio}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setLocation('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
        
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary bg-opacity-10 hover:bg-opacity-20 transition-colors cursor-pointer" onClick={() => setLocation('/programs')}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg">Browse Programs</h3>
                <p className="text-sm text-muted-foreground">Explore available training programs</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setLocation('/bookings')}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Bookmark className="h-10 w-10 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg">My Bookings</h3>
                <p className="text-sm text-muted-foreground">View and manage your registrations</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setLocation('/profile')}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Settings className="h-10 w-10 text-gray-600 mb-3" />
                <h3 className="font-semibold text-lg">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Update your profile and preferences</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Upcoming Programs</CardTitle>
                  <CardDescription>
                    Your upcoming training sessions and events
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setLocation('/bookings')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className="text-center py-6">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="font-medium">No Upcoming Programs</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    You don't have any upcoming bookings.
                  </p>
                  <Button onClick={() => setLocation('/programs')}>Browse Programs</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        {booking.program.image ? (
                          <img 
                            src={booking.program.image} 
                            alt={booking.program.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Calendar className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{booking.program.title}</h3>
                          <Badge className={
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                          {booking.program.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {booking.program.startDate 
                              ? formatDate(new Date(booking.program.startDate))
                              : "Date TBA"}
                          </span>
                          <span>
                            {booking.program.location || "Location TBA"}
                            {booking.program.isVirtual && " (Virtual)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Activity - Placeholder for future feature */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>
                Recent updates and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  Activity feed will be available soon
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}