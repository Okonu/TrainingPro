import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User } from "../types/schema";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Types for the booking system
interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
}

interface Booking {
  id: number;
  userId: number;
  programId: number;
  program: Program;
  bookingDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus?: "pending" | "paid" | "refunded";
  notes?: string;
}

export default function BookingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch user bookings
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

  // Filter bookings based on active tab
  const upcomingBookings = bookings?.filter(
    (booking) => 
      booking.status !== "completed" && 
      booking.status !== "cancelled"
  ) || [];
  
  const pastBookings = bookings?.filter(
    (booking) => 
      booking.status === "completed" || 
      booking.status === "cancelled"
  ) || [];

  // Determine if we have any bookings
  const hasBookings = bookings && bookings.length > 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your program registrations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Program Registrations</CardTitle>
            <CardDescription>
              View all your upcoming and past program registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !hasBookings ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't registered for any programs or events yet.
                </p>
                <Button>Browse Programs</Button>
              </div>
            ) : (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upcoming">
                    Upcoming ({upcomingBookings.length})
                  </TabsTrigger>
                  <TabsTrigger value="past">
                    Past ({pastBookings.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You don't have any upcoming bookings.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {upcomingBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past">
                  {pastBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You don't have any past bookings.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {pastBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  // Status badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Payment status badge color
  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format booking date for display
  const bookingDate = booking.bookingDate 
    ? new Date(booking.bookingDate).toLocaleDateString()
    : "N/A";

  // Format program dates if available
  const programDates = booking.program.startDate && booking.program.endDate
    ? `${formatDate(new Date(booking.program.startDate))} - ${formatDate(new Date(booking.program.endDate))}`
    : "Dates to be announced";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Program Image */}
          <div className="w-full md:w-1/4">
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
              {booking.program.image ? (
                <img
                  src={booking.program.image}
                  alt={booking.program.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-wrap justify-between gap-2 mb-2">
              <h3 className="text-xl font-semibold">{booking.program.title}</h3>
              <div className="flex gap-2">
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
                {booking.paymentStatus && (
                  <Badge className={getPaymentColor(booking.paymentStatus)}>
                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              {booking.program.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Booking Date:</span> {bookingDate}
              </div>
              <div>
                <span className="font-medium">Program Dates:</span> {programDates}
              </div>
              <div>
                <span className="font-medium">Location:</span>{" "}
                {booking.program.location || "To be announced"}
                {booking.program.isVirtual && " (Virtual)"}
              </div>
              {booking.program.price && (
                <div>
                  <span className="font-medium">Price:</span> Ksh{" "}
                  {booking.program.price.toLocaleString()}
                </div>
              )}
            </div>

            {booking.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                <span className="font-medium">Notes:</span> {booking.notes}
              </div>
            )}

            {booking.status !== "cancelled" && booking.status !== "completed" && (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="destructive" size="sm">
                  Cancel Booking
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}