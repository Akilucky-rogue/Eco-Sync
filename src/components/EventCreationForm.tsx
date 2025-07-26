
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar, MapPin, Users, Clock, Plus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";
import SecurityErrorBoundary from "./SecurityErrorBoundary";

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>'"]/g, '') // Remove potential XSS characters
    .slice(0, 1000); // Limit length
};

// Comprehensive validation schema
const eventFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s\-,.()&]+$/, "Title contains invalid characters"),
  
  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location cannot exceed 200 characters")
    .regex(/^[a-zA-Z0-9\s\-,.()&]+$/, "Location contains invalid characters"),
  
  date: z
    .string()
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Event date must be today or in the future"),
  
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  
  duration: z
    .string()
    .refine((val) => ["1", "2", "3", "4", "6", "8"].includes(val), "Invalid duration"),
  
  maxParticipants: z
    .string()
    .refine((val) => ["10", "20", "30", "50", "100", "unlimited"].includes(val), "Invalid participant limit"),
  
  category: z
    .string()
    .refine((val) => ["beach", "mangrove", "coral", "education", "research"].includes(val), "Invalid category"),
  
  difficulty: z
    .string()
    .refine((val) => ["beginner", "intermediate", "advanced"].includes(val), "Invalid difficulty level")
    .optional(),
});

type EventFormData = z.infer<typeof eventFormSchema>;

interface EventCreationFormProps {
  onEventCreated?: (event: EventFormData) => void;
  onCancel?: () => void;
}

const EventCreationForm = ({ onEventCreated, onCancel }: EventCreationFormProps) => {
  const { toast } = useToast();
  
  // Rate limiting: max 3 submissions per 5 minutes
  const { checkRateLimit, recordAttempt, isBlocked } = useRateLimit({
    maxAttempts: 3,
    windowMs: 5 * 60 * 1000, // 5 minutes
    blockDurationMs: 10 * 60 * 1000, // 10 minutes block
  });
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      duration: "2",
      maxParticipants: "20",
      category: "",
      difficulty: "",
    },
  });

  const onSubmit = (data: EventFormData) => {
    try {
      // Check rate limit before processing
      const { allowed, remainingAttempts, resetTime } = checkRateLimit();
      
      if (!allowed) {
        const resetDate = resetTime ? new Date(resetTime).toLocaleTimeString() : 'later';
        toast({
          title: "Too Many Attempts",
          description: `Please wait before submitting again. You can try again after ${resetDate}.`,
          variant: "destructive"
        });
        return;
      }

      // Record this attempt
      recordAttempt();

      // Sanitize all text inputs
      const sanitizedData = {
        ...data,
        title: sanitizeInput(data.title),
        description: data.description ? sanitizeInput(data.description) : "",
        location: sanitizeInput(data.location),
      };

      console.log("Creating event:", sanitizedData);
      
      toast({
        title: "Event Created!",
        description: `Your cleanup event has been successfully created and is pending approval. (${remainingAttempts} submissions remaining)`,
      });

      onEventCreated?.(sanitizedData);
    } catch (error) {
      console.error("Event creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <SecurityErrorBoundary>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#014F86]">
            <Plus className="h-6 w-6" />
            Create New Cleanup Event
            <div title="Secure Form" className="ml-auto">
              <Shield className="h-4 w-4 text-green-600" />
            </div>
          </CardTitle>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Beach Cleanup at Marina Bay"
                        {...field}
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beach">Beach Cleanup</SelectItem>
                        <SelectItem value="mangrove">Mangrove Restoration</SelectItem>
                        <SelectItem value="coral">Coral Conservation</SelectItem>
                        <SelectItem value="education">Educational Workshop</SelectItem>
                        <SelectItem value="research">Research Project</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the event, what participants should bring, and any special instructions..."
                      rows={3}
                      maxLength={1000}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Marina Bay Beach, Singapore"
                        maxLength={200}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Start Time *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (hours)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Maximum Participants
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10 people</SelectItem>
                      <SelectItem value="20">20 people</SelectItem>
                      <SelectItem value="30">30 people</SelectItem>
                      <SelectItem value="50">50 people</SelectItem>
                      <SelectItem value="100">100 people</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-[#FF6F61] hover:bg-[#FF6F61]/90"
                disabled={form.formState.isSubmitting || isBlocked}
              >
                {form.formState.isSubmitting ? "Creating..." : isBlocked ? "Rate Limited" : "Create Event"}
              </Button>
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    </SecurityErrorBoundary>
  );
};

export default EventCreationForm;
