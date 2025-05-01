import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Redirect, useLocation } from "wouter";
import { Loader2, Calendar, MapPin, Clock, Users, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Program type
interface Program {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  capacity?: number;
  registeredCount?: number;
  isVirtual?: boolean;
  categories?: string[];
  features?: string[];
  instructor?: {
    name: string;
    bio?: string;
    image?: string;
  };
}

// Booking form schema
const bookingSchema = z.object({
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function ProgramPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Extract program ID from URL
  const programId = location.split("/")[2];
  
  // Form for booking
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      notes: "",
    },
  });
  
  // Get program details
  const { data: program, isLoading: programLoading } = useQuery<Program>({
    queryKey: ["/api/programs", programId],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", `/api/programs/${programId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch program details");
        }
        return await res.json();
      } catch (error) {
        console.error("Error fetching program:", error);
        throw error;
      }
    },
    enabled: !!programId,
  });
  
  // Create booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      if (!user || !program) throw new Error("User or program not found");
      
      const res = await apiRequest("POST", "/api/bookings", {
        programId: program.id,
        notes: data.notes,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to book program");
      }
      
      return await res.json();
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      toast({
        title: "Booking Successful",
        description: "You have successfully registered for this program.",
      });
      // Redirect to bookings page
      setTimeout(() => {
        setLocation("/bookings");
      }, 1500);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: BookingFormValues) => {
    bookingMutation.mutate(data);
  };
  
  if (programLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!program) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The program you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => setLocation("/")}>Go Home</Button>
      </div>
    );
  }
  
  // Format dates for display
  const formattedStartDate = program.startDate 
    ? formatDate(new Date(program.startDate))
    : "To be announced";
    
  const formattedEndDate = program.endDate
    ? formatDate(new Date(program.endDate))
    : null;
    
  const formattedDateRange = formattedEndDate
    ? `${formattedStartDate} - ${formattedEndDate}`
    : formattedStartDate;
    
  // Calculate availability
  const soldOut = program.capacity && program.registeredCount 
    ? program.registeredCount >= program.capacity
    : false;
    
  const availability = program.capacity && program.registeredCount
    ? `${program.registeredCount}/${program.capacity} registered`
    : "Open registration";

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="w-full md:w-2/3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {program.categories?.map((category, index) => (
                <Badge key={index} variant="secondary">{category}</Badge>
              ))}
              {program.isVirtual && (
                <Badge variant="outline" className="bg-blue-50">Virtual</Badge>
              )}
            </div>
            <p className="text-muted-foreground">{program.description}</p>
          </div>
          
          {/* Program image */}
          {program.image && (
            <div className="rounded-lg overflow-hidden mb-8 aspect-video bg-gray-100">
              <img 
                src={program.image} 
                alt={program.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Long description */}
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This Program</h2>
            <div className="whitespace-pre-line">
              {program.longDescription || program.description}
            </div>
          </div>
          
          {/* Features */}
          {program.features && program.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 text-primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4 12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Instructor */}
          {program.instructor && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                {program.instructor.image && (
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={program.instructor.image} 
                      alt={program.instructor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium">{program.instructor.name}</h3>
                  {program.instructor.bio && (
                    <p className="text-muted-foreground">{program.instructor.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-8">
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
                <CardDescription>Register for this training program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price */}
                {program.price !== undefined && (
                  <div className="text-3xl font-bold">
                    {program.price > 0 ? `Ksh ${program.price.toLocaleString()}` : 'Free'}
                  </div>
                )}
                
                {/* Program details */}
                <div className="space-y-3 py-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Date</h4>
                      <p className="text-muted-foreground text-sm">{formattedDateRange}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground text-sm">
                        {program.location || "To be announced"}
                        {program.isVirtual && " (Virtual)"}
                      </p>
                    </div>
                  </div>
                  
                  {(program.capacity || program.registeredCount) && (
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Availability</h4>
                        <p className="text-muted-foreground text-sm">{availability}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Registration button */}
                {user ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={soldOut || bookingMutation.isPending}
                      >
                        {soldOut ? "Sold Out" : "Register Now"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Register for {program.title}</DialogTitle>
                        <DialogDescription>
                          Complete your registration for this program.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any special requirements or questions?" 
                                    className="resize-none" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  This information will be shared with the program organizers.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <DialogFooter>
                            <Button 
                              type="submit" 
                              disabled={bookingMutation.isPending}
                            >
                              {bookingMutation.isPending ? "Registering..." : "Confirm Registration"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setLocation("/auth")}
                  >
                    Sign In to Register
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}