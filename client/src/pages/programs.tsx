import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Loader2, Search, Filter, Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Program type
interface Program {
  id: number;
  title: string;
  description: string;
  image?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  categories?: string[];
}

export default function ProgramsPage() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  
  // Get all programs
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/programs");
        if (!res.ok) {
          throw new Error("Failed to fetch programs");
        }
        return await res.json();
      } catch (error) {
        console.error("Error fetching programs:", error);
        return [];
      }
    },
  });
  
  // Extract all unique categories
  const categories = programs
    ? Array.from(
        new Set(
          programs.flatMap((program) => program.categories || [])
        )
      )
    : [];
  
  // Filter programs based on search and filters
  const filteredPrograms = programs
    ? programs.filter((program) => {
        // Search filter
        const matchesSearch =
          searchQuery.trim() === "" ||
          program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (program.categories &&
            program.categories.some((category) =>
              category.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        
        // Category filter
        const matchesCategory =
          categoryFilter === "all" ||
          (program.categories && program.categories.includes(categoryFilter));
        
        // Format filter
        const matchesFormat =
          formatFilter === "all" ||
          (formatFilter === "virtual" && program.isVirtual) ||
          (formatFilter === "in-person" && !program.isVirtual);
        
        return matchesSearch && matchesCategory && matchesFormat;
      })
    : [];
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Training Programs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our range of professional development and leadership training programs
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* Category filter */}
          <div className="w-full md:w-64">
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Format filter */}
          <div className="w-full md:w-64">
            <Select
              value={formatFilter}
              onValueChange={(value) => setFormatFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredPrograms && (
          <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>
              Showing {filteredPrograms.length} of {programs?.length || 0} programs
            </span>
          </div>
        )}
      </div>
      
      {/* Programs list */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No Programs Found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search filters.
          </p>
          <Button onClick={() => {
            setSearchQuery("");
            setCategoryFilter("all");
            setFormatFilter("all");
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onClick={() => setLocation(`/program/${program.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProgramCard({ program, onClick }: { program: Program; onClick: () => void }) {
  // Format date for display
  const formattedDate = program.startDate
    ? formatDate(new Date(program.startDate))
    : "Date to be announced";
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {/* Program image */}
      <div className="aspect-video bg-gray-100 overflow-hidden">
        {program.image ? (
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {program.categories?.map((category, index) => (
            <Badge key={index} variant="secondary">{category}</Badge>
          ))}
          {program.isVirtual && (
            <Badge variant="outline" className="bg-blue-50">Virtual</Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{program.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {program.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{program.location || "Location to be announced"}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        {program.price !== undefined && (
          <span className="font-bold">
            {program.price > 0 ? `Ksh ${program.price.toLocaleString()}` : 'Free'}
          </span>
        )}
        
        <Button variant="outline" onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}