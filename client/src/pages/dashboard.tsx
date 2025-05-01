import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Redirect, useLocation } from "wouter";
import { Loader2, User, Calendar, Bookmark, Settings, BookOpen, Clock, LineChart, Users, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/layout";

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
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.fullName}!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your training programs and profile.
          </p>
        </div>
      
        {/* Stats overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {bookings?.length || 0}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {upcomingBookings?.length || 0}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {bookings?.filter(b => b.status === "completed")?.length || 0}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {profileData && Object.keys(profileData).some(key => 
                      profileData[key as keyof UserProfileData] && 
                      profileData[key as keyof UserProfileData]!.toString().trim() !== ''
                    ) ? 'Complete' : 'Incomplete'}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
          
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2 space-y-6">
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
          </div>
          
          {/* User profile sidebar */}
          <Card className="h-fit">
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
        </div>
        
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
    </DashboardLayout>
  );
}