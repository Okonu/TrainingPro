import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "../types/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";

interface UserProfileData {
  bio?: string;
  company?: string;
  position?: string;
  phone?: string;
  location?: string;
  interests?: string[];
}

interface UpdateProfileData extends UserProfileData {
  userId: number;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    bio: "",
    company: "",
    position: "",
    phone: "",
    location: "",
    interests: [],
  });

  // Get user profile data
  const { data: profile, isLoading: profileLoading } = useQuery<UserProfileData>({
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

  // Update profile data when profile is loaded
  useEffect(() => {
    if (profile) {
      setProfileData({
        bio: profile.bio || "",
        company: profile.company || "",
        position: profile.position || "",
        phone: profile.phone || "",
        location: profile.location || "",
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const res = await apiRequest("POST", "/api/profile/update", data);
      if (!res.ok) {
        throw new Error("Failed to update profile");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile", user?.id] });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    updateProfileMutation.mutate({
      userId: user.id,
      ...profileData,
    });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

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
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt={user.fullName} />
                  <AvatarFallback>{user.fullName?.charAt(0) || user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user.fullName}</CardTitle>
                <CardDescription className="text-center mt-1">
                  @{user.username}<br />
                  {user.email}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {profileData.position && profileData.company && (
                <div className="text-center text-sm text-muted-foreground">
                  {profileData.position} at {profileData.company}
                </div>
              )}
              {profileData.location && (
                <div className="text-center text-sm text-muted-foreground mt-1">
                  {profileData.location}
                </div>
              )}
              {profileData.bio && (
                <div className="mt-4 text-sm">
                  <h3 className="font-medium mb-1">About</h3>
                  <p className="text-muted-foreground">{profileData.bio}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            value={profileData.company}
                            onChange={handleInputChange}
                            placeholder="Your company"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            name="position"
                            value={profileData.position}
                            onChange={handleInputChange}
                            placeholder="Your job title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            placeholder="Your location (city, country)"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          placeholder="A short bio about yourself"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                          <p>{user.fullName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                          <p>@{user.username}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        {profileData.company && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                            <p>{profileData.company}</p>
                          </div>
                        )}
                        {profileData.position && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
                            <p>{profileData.position}</p>
                          </div>
                        )}
                        {profileData.phone && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                            <p>{profileData.phone}</p>
                          </div>
                        )}
                        {profileData.location && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                            <p>{profileData.location}</p>
                          </div>
                        )}
                      </div>
                      {profileData.bio && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                          <p>{profileData.bio}</p>
                        </div>
                      )}
                      <div className="pt-4">
                        <Button onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>
                    View your registered programs and events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">You don't have any bookings yet.</p>
                    <Button className="mt-4">Browse Programs</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}