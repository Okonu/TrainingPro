import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { db, updateDocument, getDocument } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  displayName: string;
  email: string;
  photoURL: string;
  phone?: string;
  company?: string;
  position?: string;
  bio?: string;
}

export const UserProfile = () => {
  const { currentUser, signOut } = useAuthContext();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // Fetch user profile data
          const userDoc = await getDocument('users', currentUser.uid);
          if (userDoc && 
              typeof userDoc === 'object' && 
              'displayName' in userDoc && 
              'email' in userDoc && 
              'photoURL' in userDoc) {
            setUserData(userDoc as UserData);
            setFormData(userDoc as UserData);
          } else {
            // Set default data from auth if no custom data exists
            const defaultData = {
              displayName: currentUser.displayName || '',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || '',
            };
            setUserData(defaultData);
            setFormData(defaultData);
          }
          
          // In the future, we will fetch user bookings here
          // const userBookings = await getFilteredCollection('bookings', 'userId', currentUser.uid);
          // setBookings(userBookings);
          
          // For now, we'll just set empty bookings
          setBookings([]);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error",
            description: "Could not load your profile data. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await updateDocument('users', currentUser.uid, formData);
      setUserData({...userData, ...formData} as UserData);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser || !userData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with user info */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={userData.photoURL} alt={userData.displayName} />
                <AvatarFallback>{userData.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{userData.displayName}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
              {userData.position && (
                <CardDescription className="mt-1">{userData.position} {userData.company ? `at ${userData.company}` : ''}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {userData.bio && (
                <div className="mt-2">
                  <h4 className="font-medium">About</h4>
                  <p className="text-sm text-muted-foreground mt-1">{userData.bio}</p>
                </div>
              )}
              {userData.phone && (
                <div className="mt-4">
                  <h4 className="font-medium">Contact</h4>
                  <p className="text-sm text-muted-foreground mt-1">{userData.phone}</p>
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
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main content area */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>

            {/* Profile tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Name</Label>
                          <Input 
                            id="displayName"
                            name="displayName"
                            value={formData.displayName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            required
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="photoURL">Profile Image URL</Label>
                          <Input 
                            id="photoURL"
                            name="photoURL"
                            value={formData.photoURL || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company"
                            name="company"
                            value={formData.company || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input 
                            id="position"
                            name="position"
                            value={formData.position || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input 
                          id="bio"
                          name="bio"
                          value={formData.bio || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
                          <p>{userData.displayName}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                          <p>{userData.email}</p>
                        </div>
                        {userData.phone && (
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
                            <p>{userData.phone}</p>
                          </div>
                        )}
                        {userData.company && (
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Company</h3>
                            <p>{userData.company}</p>
                          </div>
                        )}
                        {userData.position && (
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Position</h3>
                            <p>{userData.position}</p>
                          </div>
                        )}
                      </div>
                      {userData.bio && (
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Bio</h3>
                          <p>{userData.bio}</p>
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

            {/* Bookings tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>
                    View and manage your program and event registrations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {/* Booking list will go here when we implement bookings */}
                      <p>Your bookings will appear here.</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium">No Bookings Yet</h3>
                      <p className="text-muted-foreground mt-1">You haven't registered for any programs or events yet.</p>
                      <Button className="mt-4">Browse Programs</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};