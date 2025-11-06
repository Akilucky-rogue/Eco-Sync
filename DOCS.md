# 📚 Eco-Sanjivani - Technical Documentation

**Comprehensive Developer Guide**

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [Authentication System](#authentication-system)
6. [Component Library](#component-library)
7. [API Reference](#api-reference)
8. [State Management](#state-management)
9. [Routing & Navigation](#routing--navigation)
10. [Styling & Design System](#styling--design-system)
11. [Testing Strategy](#testing-strategy)
12. [Performance Optimization](#performance-optimization)
13. [Security Guidelines](#security-guidelines)
14. [Deployment Guide](#deployment-guide)
15. [AI/ML Integration Guide](#aiml-integration-guide)
16. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │           React Application (SPA)                  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  Components │ Pages │ Hooks │ Utils         │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS/WebSocket
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Lovable Cloud (Supabase)                │
│  ┌────────────┬────────────┬──────────┬──────────────┐  │
│  │ PostgreSQL │ Auth       │ Storage  │ Edge Funcs   │  │
│  │ + RLS      │ System     │ Buckets  │ (Deno)       │  │
│  └────────────┴────────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI primitives

#### Backend (Lovable Cloud)
- **Database**: PostgreSQL 15+
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Functions**: Deno Edge Functions
- **Real-time**: Supabase Realtime
- **API**: Auto-generated REST API

#### DevOps
- **Version Control**: Git + GitHub
- **CI/CD**: Automated via Lovable
- **Hosting**: Lovable Cloud
- **Monitoring**: Built-in analytics

---

## Frontend Architecture

### Project Structure

```
src/
├── components/              # Reusable React components
│   ├── ui/                 # Base UI components (Radix)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── AchievementBadge.tsx
│   ├── ActivityFeed.tsx
│   ├── EventCard.tsx
│   ├── InteractiveMap.tsx
│   ├── Leaderboard.tsx
│   └── ...
├── pages/                   # Page-level components
│   ├── Home.tsx
│   ├── Events.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Auth.tsx
│   └── ...
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useRateLimit.ts
│   └── use-mobile.tsx
├── integrations/            # External service integrations
│   └── supabase/
│       ├── client.ts       # Supabase client
│       └── types.ts        # Generated TypeScript types
├── lib/                     # Utility functions
│   └── utils.ts
├── index.css               # Global styles & CSS variables
├── App.tsx                 # Root component
└── main.tsx                # Entry point
```

### Component Design Principles

#### 1. Single Responsibility
Each component should do one thing well.

```typescript
// ❌ Bad: Component doing too much
const UserDashboard = () => {
  // Fetching data, rendering stats, handling events, etc.
}

// ✅ Good: Split into focused components
const Dashboard = () => (
  <>
    <UserStats />
    <UpcomingEvents />
    <ActivityFeed />
  </>
)
```

#### 2. Composition Over Inheritance
Build complex UIs by composing simple components.

```typescript
// ✅ Composable Card component
<Card>
  <CardHeader>
    <CardTitle>Event Title</CardTitle>
  </CardHeader>
  <CardContent>
    <EventDetails />
  </CardContent>
  <CardFooter>
    <Button>Join Event</Button>
  </CardFooter>
</Card>
```

#### 3. Props Interface
Always define TypeScript interfaces for props.

```typescript
interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: Date;
    location: string;
  };
  onJoin?: () => void;
  variant?: 'default' | 'compact';
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onJoin,
  variant = 'default'
}) => {
  // Component implementation
}
```

### Custom Hooks

#### useAuth Hook
Manages authentication state.

```typescript
import { useAuth } from '@/hooks/useAuth';

function ProtectedComponent() {
  const { user, session, loading, signOut } = useAuth();
  
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/auth" />;
  
  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

#### useRateLimit Hook
Prevents spam and abuse.

```typescript
import { useRateLimit } from '@/hooks/useRateLimit';

function CommentForm() {
  const { checkLimit, resetLimit } = useRateLimit('comments', 5, 60000);
  
  const handleSubmit = async () => {
    if (!checkLimit()) {
      toast.error('Too many comments. Please wait.');
      return;
    }
    
    // Submit comment
    await submitComment();
    resetLimit();
  };
}
```

---

## Backend Architecture

### Lovable Cloud Overview

Lovable Cloud provides a managed Supabase backend with:

1. **PostgreSQL Database** with Row Level Security
2. **Authentication** (email, OAuth, magic links)
3. **File Storage** with access policies
4. **Edge Functions** (Deno runtime)
5. **Real-time Subscriptions**

### Database Connection

The Supabase client is pre-configured and available globally:

```typescript
import { supabase } from '@/integrations/supabase/client';

// ✅ Always use this client, never create your own
```

### Edge Functions

Edge Functions run on Deno and provide server-side logic:

```
supabase/functions/
├── ai-classify-waste/      # AI waste classification
├── send-notification/      # Push notifications
├── calculate-impact/       # Environmental impact calculations
└── generate-certificate/   # Achievement certificates
```

#### Creating an Edge Function

```typescript
// supabase/functions/calculate-impact/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { wasteCollectedKg } = await req.json();
  
  // Calculate environmental impact
  const carbonOffset = wasteCollectedKg * 0.5; // kg CO2
  const oceansaved = wasteCollectedKg * 10; // liters
  
  return new Response(
    JSON.stringify({ carbonOffset, oceanSaved }),
    { headers: { "Content-Type": "application/json" } }
  );
});
```

#### Calling an Edge Function

```typescript
const { data, error } = await supabase.functions.invoke('calculate-impact', {
  body: { wasteCollectedKg: 15 }
});

if (error) console.error(error);
else console.log(data); // { carbonOffset: 7.5, oceanSaved: 150 }
```

---

## Database Schema

### Tables Overview

#### profiles
Stores user profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**RLS Policies:**
- ✅ Everyone can view profiles
- ✅ Users can update their own profile

#### user_stats
Tracks individual user statistics.

```sql
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES profiles(id),
  total_cleanups INTEGER DEFAULT 0,
  waste_collected_kg NUMERIC DEFAULT 0,
  coastline_cleaned_m NUMERIC DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**RLS Policies:**
- ✅ Users can view their own stats
- ✅ Everyone can view leaderboard (top stats)

#### events
Stores cleanup event information.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  organizer_id UUID REFERENCES profiles(id),
  max_participants INTEGER,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Status Values:** `upcoming`, `ongoing`, `completed`, `cancelled`

**RLS Policies:**
- ✅ Everyone can view events
- ✅ Authenticated users can create events
- ✅ Organizers can update/delete their events

#### cleanups
Records individual cleanup activities.

```sql
CREATE TABLE cleanups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  event_id UUID REFERENCES events(id),
  waste_collected_kg NUMERIC NOT NULL,
  location TEXT,
  photos TEXT[],
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**RLS Policies:**
- ✅ Users can create their own cleanups
- ✅ Users can view their own cleanups
- ✅ Everyone can view public cleanup stats

#### badges
Defines available achievement badges.

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria TEXT,
  rarity TEXT DEFAULT 'common',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Rarity Levels:** `common`, `rare`, `epic`, `legendary`

#### achievements
Tracks user-earned badges.

```sql
CREATE TABLE achievements (
  user_id UUID REFERENCES profiles(id),
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);
```

**RLS Policies:**
- ✅ Users can view their own achievements
- ✅ Everyone can view public achievements

#### teams
Stores team information.

```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  leader_id UUID REFERENCES profiles(id),
  avatar_url TEXT,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### team_members
Tracks team membership.

```sql
CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES profiles(id),
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);
```

**Roles:** `leader`, `member`

### Database Functions

#### update_updated_at_column()
Automatically updates the `updated_at` timestamp.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to tables
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### handle_new_user()
Creates profile and stats for new users.

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## Authentication System

### Authentication Flow

```
┌─────────────┐
│  User Signs │
│  Up/Login   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Supabase Auth   │
│ Creates Session │
└──────┬──────────┘
       │
       ▼
┌──────────────────┐
│ handle_new_user()│
│ Trigger Fires    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Profile Created  │
│ Stats Created    │
└──────────────────┘
```

### Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword123',
  options: {
    data: {
      full_name: 'John Doe'
    }
  }
});
```

### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword123'
});
```

### Sign Out

```typescript
const { error } = await supabase.auth.signOut();
```

### Check Auth State

```typescript
const { data: { user } } = await supabase.auth.getUser();

if (user) {
  console.log('Logged in:', user.email);
} else {
  console.log('Not logged in');
}
```

### Protected Routes

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  
  return children;
}

// Usage in App.tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Component Library

### UI Components (Radix UI)

All base components are in `src/components/ui/` and are built on Radix UI primitives.

#### Button

```typescript
import { Button } from '@/components/ui/button';

<Button variant="default">Click Me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
**Sizes:** `default`, `sm`, `lg`, `icon`

#### Card

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Dialog

```typescript
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
  </DialogContent>
</Dialog>
```

#### Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' }
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Custom Components

#### EventCard

Displays event information in a card format.

```typescript
import { EventCard } from '@/components/EventCard';

<EventCard
  event={{
    id: '123',
    title: 'Beach Cleanup',
    description: 'Join us for a beach cleanup',
    location: 'Mumbai Beach',
    startTime: new Date(),
    maxParticipants: 50
  }}
  onJoin={() => console.log('Joined!')}
/>
```

#### Leaderboard

Shows top volunteers rankings.

```typescript
import { Leaderboard } from '@/components/Leaderboard';

<Leaderboard limit={10} period="weekly" />
```

**Props:**
- `limit`: Number of entries to show
- `period`: `'weekly'` | `'monthly'` | `'all-time'`

#### InteractiveMap

Displays events on an interactive map.

```typescript
import { InteractiveMap } from '@/components/InteractiveMap';

<InteractiveMap
  events={eventsArray}
  onEventClick={(eventId) => navigate(`/events/${eventId}`)}
  center={[19.0760, 72.8777]} // [lat, lng]
  zoom={10}
/>
```

---

## API Reference

### Profiles

#### Get Profile

```typescript
const { data: profile, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
```

#### Update Profile

```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({
    full_name: 'Jane Doe',
    bio: 'Eco warrior',
    location: 'Mumbai'
  })
  .eq('id', userId);
```

#### Upload Avatar

```typescript
const file = event.target.files[0];
const fileExt = file.name.split('.').pop();
const fileName = `${userId}.${fileExt}`;
const filePath = `avatars/${fileName}`;

const { error: uploadError } = await supabase.storage
  .from('avatars')
  .upload(filePath, file, { upsert: true });

if (!uploadError) {
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);
  
  // Update profile with avatar URL
  await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', userId);
}
```

### Events

#### Get All Events

```typescript
const { data: events, error } = await supabase
  .from('events')
  .select('*, organizer:profiles(*)')
  .eq('status', 'upcoming')
  .gte('start_time', new Date().toISOString())
  .order('start_time', { ascending: true });
```

#### Create Event

```typescript
const { data, error } = await supabase
  .from('events')
  .insert({
    title: 'Beach Cleanup',
    description: 'Join us!',
    location: 'Mumbai Beach',
    latitude: 19.0760,
    longitude: 72.8777,
    start_time: new Date('2024-06-15T09:00:00'),
    end_time: new Date('2024-06-15T12:00:00'),
    organizer_id: userId,
    max_participants: 50
  })
  .select()
  .single();
```

#### Update Event

```typescript
const { data, error } = await supabase
  .from('events')
  .update({ status: 'completed' })
  .eq('id', eventId)
  .eq('organizer_id', userId); // Only organizer can update
```

### User Stats

#### Get User Stats

```typescript
const { data: stats, error } = await supabase
  .from('user_stats')
  .select('*')
  .eq('user_id', userId)
  .single();
```

#### Update Stats (after cleanup)

```typescript
const { data, error } = await supabase.rpc('increment_user_stats', {
  p_user_id: userId,
  p_cleanups: 1,
  p_waste_kg: 5.5,
  p_coastline_m: 100
});
```

### Badges & Achievements

#### Get All Badges

```typescript
const { data: badges, error } = await supabase
  .from('badges')
  .select('*')
  .order('rarity', { ascending: false });
```

#### Get User Achievements

```typescript
const { data: achievements, error } = await supabase
  .from('achievements')
  .select('*, badge:badges(*)')
  .eq('user_id', userId)
  .order('earned_at', { ascending: false });
```

#### Award Badge

```typescript
const { data, error } = await supabase
  .from('achievements')
  .insert({
    user_id: userId,
    badge_id: badgeId
  });
```

### Real-time Subscriptions

#### Subscribe to Events

```typescript
const channel = supabase
  .channel('events-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'events'
    },
    (payload) => {
      console.log('Event changed:', payload);
      // Update UI
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

---

## State Management

### React Query (TanStack Query)

Used for server state management.

#### Query Setup

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false
    }
  }
});

// In App.tsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

#### Using Queries

```typescript
import { useQuery } from '@tanstack/react-query';

function EventsList() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming');
      
      if (error) throw error;
      return data;
    }
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

#### Using Mutations

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateEventForm() {
  const queryClient = useQueryClient();
  
  const createEvent = useMutation({
    mutationFn: async (eventData) => {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  
  const handleSubmit = (data) => {
    createEvent.mutate(data);
  };
}
```

### Local State

Use React hooks for component-level state:

```typescript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## Routing & Navigation

### Route Configuration

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/events" element={<Layout><Events /></Layout>} />
    <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
    <Route path="/profile" element={<Layout><Profile /></Layout>} />
    <Route path="/auth" element={<Auth />} />
    <Route path="*" element={<Layout><NotFound /></Layout>} />
  </Routes>
</BrowserRouter>
```

### Navigation

```typescript
import { useNavigate, Link } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  // Programmatic navigation
  const handleClick = () => {
    navigate('/events');
  };
  
  return (
    <>
      <button onClick={handleClick}>Go to Events</button>
      
      {/* Declarative navigation */}
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}
```

### Route Parameters

```typescript
import { useParams } from 'react-router-dom';

function EventDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: event } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      return data;
    }
  });
}
```

---

## Styling & Design System

### Design Tokens

Defined in `src/index.css`:

```css
:root {
  /* Brand Colors */
  --brand-primary: 220 95% 32%;      /* #014F86 - Ocean Blue */
  --brand-secondary: 142 28% 82%;    /* #C5E4CF - Mint Green */
  --brand-accent: 46 89% 92%;        /* #F6EFD2 - Sand */
  --brand-danger: 4 69% 67%;         /* #FF6F61 - Coral */
  
  /* Backgrounds */
  --background: 0 0% 100%;
  --foreground: 220 95% 32%;
  
  /* Semantic Colors */
  --primary: 220 95% 32%;
  --secondary: 142 28% 82%;
  --accent: 46 89% 92%;
  --destructive: 4 69% 67%;
  
  /* UI Elements */
  --card: 0 0% 100%;
  --card-foreground: 220 13% 13%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 220 95% 32%;
  
  /* Typography */
  --radius: 0.5rem;
}
```

### Using Design Tokens

```typescript
// ✅ Use semantic tokens
<div className="bg-brand-primary text-white">
<div className="border-border rounded-radius">

// ❌ Avoid hardcoded colors
<div className="bg-[#014F86]">
<div style={{ backgroundColor: '#014F86' }}>
```

### Tailwind Utilities

```typescript
// Spacing
<div className="p-4 m-2 space-y-4">

// Layout
<div className="flex flex-col items-center justify-between">
<div className="grid grid-cols-3 gap-4">

// Responsive
<div className="w-full md:w-1/2 lg:w-1/3">

// States
<button className="hover:bg-primary/90 active:scale-95">

// Dark Mode
<div className="bg-white dark:bg-gray-900">
```

### Component Variants

Using `class-variance-authority`:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);
```

---

## Testing Strategy

### Unit Testing

Using Jest and React Testing Library:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

```typescript
import { renderWithProviders } from './test-utils';
import { EventsList } from '@/components/EventsList';

describe('EventsList', () => {
  it('fetches and displays events', async () => {
    renderWithProviders(<EventsList />);
    
    // Wait for data to load
    expect(await screen.findByText('Beach Cleanup')).toBeInTheDocument();
  });
});
```

### E2E Testing

Using Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('user can create an event', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button:has-text("Sign In")');
  
  await page.click('text=Create Event');
  await page.fill('[name="title"]', 'Test Event');
  await page.fill('[name="location"]', 'Mumbai');
  await page.click('button:has-text("Create")');
  
  await expect(page.locator('text=Event created successfully')).toBeVisible();
});
```

---

## Performance Optimization

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Events = lazy(() => import('./pages/Events'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Memoize components
const MemoizedComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Image Optimization

```typescript
// Use responsive images
<img
  src="/image.jpg"
  srcSet="/image-320w.jpg 320w, /image-640w.jpg 640w, /image-1280w.jpg 1280w"
  sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 1200px"
  alt="Description"
  loading="lazy"
/>
```

### Virtual Lists

For long lists, use virtualization:

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function LongList({ items }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div key={virtualItem.index} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItem.start}px)`,
          }}>
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Security Guidelines

### Input Validation

Always validate user input:

```typescript
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000),
  location: z.string().min(3),
  maxParticipants: z.number().int().positive().max(10000)
});

// Validate before submission
try {
  const validData = eventSchema.parse(formData);
  // Submit valid data
} catch (error) {
  // Handle validation errors
}
```

### XSS Prevention

React automatically escapes content, but be careful with:

```typescript
// ❌ Dangerous - don't do this
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safe - let React handle it
<div>{userContent}</div>

// ✅ Safe - sanitize if you must use HTML
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userContent) 
}} />
```

### SQL Injection Prevention

Supabase client handles this automatically:

```typescript
// ✅ Safe - parameterized query
const { data } = await supabase
  .from('events')
  .select('*')
  .eq('title', userInput);

// ❌ Never do raw SQL with user input
// (Not possible with Supabase client, but avoid in Edge Functions)
```

### Rate Limiting

```typescript
import { useRateLimit } from '@/hooks/useRateLimit';

function ContactForm() {
  const { checkLimit } = useRateLimit('contact', 3, 60000);
  
  const handleSubmit = async () => {
    if (!checkLimit()) {
      toast.error('Too many requests. Please wait.');
      return;
    }
    
    // Process form
  };
}
```

---

## Deployment Guide

### Lovable Platform Deployment

1. **Connect to GitHub** (optional)
   - Click GitHub icon in Lovable editor
   - Authorize Lovable GitHub App
   - Create repository

2. **Publish**
   - Click "Publish" button
   - Your app is live at `yourapp.lovable.app`

3. **Custom Domain** (Pro plan)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Self-Hosting (Advanced)

If you want to host outside Lovable:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy static files**
   - Upload `dist/` folder to your host
   - Configure server to serve `index.html` for all routes

3. **Set up backend**
   - Create Supabase project at supabase.com
   - Run migrations from `supabase/migrations/`
   - Update environment variables

4. **Configure environment**
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

---

## AI/ML Integration Guide

Eco-Sanjivani can leverage AI/ML to enhance functionality and user experience. Here's how:

### 1. AI-Powered Waste Classification

Use **Lovable AI** (with image analysis models) or **TensorFlow.js** for client-side classification.

#### Option A: Lovable AI (Recommended)

```typescript
// Edge Function: supabase/functions/classify-waste/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { imageBase64 } = await req.json();
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and classify the type of waste (plastic, metal, organic, glass, paper, other). Respond with JSON: {"type": "plastic", "confidence": 0.95}'
            },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${imageBase64}` }
            }
          ]
        }
      ]
    })
  });
  
  const data = await response.json();
  const classification = JSON.parse(data.choices[0].message.content);
  
  return new Response(JSON.stringify(classification), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

#### Client-side Usage:

```typescript
async function classifyWasteImage(file: File) {
  const reader = new FileReader();
  
  reader.onloadend = async () => {
    const base64 = reader.result?.toString().split(',')[1];
    
    const { data, error } = await supabase.functions.invoke('classify-waste', {
      body: { imageBase64: base64 }
    });
    
    if (data) {
      console.log('Waste type:', data.type);
      console.log('Confidence:', data.confidence);
    }
  };
  
  reader.readAsDataURL(file);
}
```

### 2. Personalized Event Recommendations

Use collaborative filtering based on user behavior.

#### Edge Function: recommend-events

```typescript
// Simplified recommendation algorithm
async function recommendEvents(userId: string) {
  // 1. Get user's past events
  const { data: pastEvents } = await supabase
    .from('event_registrations')
    .select('event:events(*)')
    .eq('user_id', userId);
  
  // 2. Find similar users (attended similar events)
  const { data: similarUsers } = await supabase
    .rpc('find_similar_users', { user_id: userId });
  
  // 3. Get events those users attended
  const { data: recommendations } = await supabase
    .from('events')
    .select('*')
    .in('organizer_id', similarUsers.map(u => u.id))
    .eq('status', 'upcoming')
    .limit(10);
  
  return recommendations;
}
```

### 3. Chatbot with Lovable AI

Create an AI assistant for volunteers.

#### Edge Function: chatbot

```typescript
serve(async (req) => {
  const { message, conversationHistory } = await req.json();
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  
  const messages = [
    {
      role: 'system',
      content: 'You are Eco-Bot, a helpful assistant for Eco-Sanjivani. Help users with event information, cleanup tips, and environmental questions. Be friendly and encouraging.'
    },
    ...conversationHistory,
    { role: 'user', content: message }
  ];
  
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages,
      stream: true
    })
  });
  
  // Stream response back to client
  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
});
```

#### Client Implementation:

```typescript
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const sendMessage = async () => {
    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    
    // Call edge function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages
        })
      }
    );
    
    // Handle streaming response
    const reader = response.body.getReader();
    let botMessage = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const text = new TextDecoder().decode(value);
      botMessage += text;
      
      // Update UI in real-time
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: botMessage }
      ]);
    }
  };
  
  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
```

### 4. Predictive Analytics

Forecast cleanup success rates.

```typescript
// Simple regression model for impact prediction
async function predictCleanupImpact(eventData: {
  location: string;
  expectedVolunteers: number;
  weatherCondition: string;
  coastlineLength: number;
}) {
  // Train on historical data
  const { data: historicalCleanups } = await supabase
    .from('cleanups')
    .select('*, event:events(*)');
  
  // Simple linear regression (in production, use proper ML library)
  const avgWastePerVolunteer = historicalCleanups.reduce(
    (sum, c) => sum + (c.waste_collected_kg / c.event.actual_participants),
    0
  ) / historicalCleanups.length;
  
  const weatherMultiplier = {
    sunny: 1.2,
    cloudy: 1.0,
    rainy: 0.6
  }[eventData.weatherCondition] || 1.0;
  
  const predictedWaste = 
    eventData.expectedVolunteers * 
    avgWastePerVolunteer * 
    weatherMultiplier;
  
  return {
    predictedWasteKg: predictedWaste,
    predictedCoastlineCleanedM: eventData.coastlineLength * 0.8,
    confidence: 0.75
  };
}
```

### 5. Sentiment Analysis on Social Feed

Analyze user posts to understand community mood.

```typescript
async function analyzeSentiment(postContent: string) {
  const { data, error } = await supabase.functions.invoke('analyze-sentiment', {
    body: { text: postContent }
  });
  
  // Use Lovable AI for sentiment analysis
  // Edge function would call:
  // model: 'google/gemini-2.5-flash'
  // prompt: 'Analyze sentiment: positive, negative, neutral. Return JSON.'
  
  return data.sentiment; // 'positive' | 'negative' | 'neutral'
}
```

### Best Practices for AI Integration

1. **Use Lovable AI First**: It requires no API keys and is pre-configured
2. **Implement Fallbacks**: Always have non-AI alternatives
3. **Cache Results**: Store AI responses to reduce costs
4. **Rate Limit**: Prevent abuse of expensive AI calls
5. **Privacy**: Never send PII to AI models without user consent
6. **Transparency**: Inform users when AI is being used
7. **Testing**: Validate AI responses before showing to users

---

## Troubleshooting

### Common Issues

#### 1. "Supabase client not initialized"

**Solution**: Make sure you're importing the client correctly:
```typescript
import { supabase } from '@/integrations/supabase/client';
```

#### 2. RLS Policy Denying Access

**Error**: `new row violates row-level security policy`

**Solution**: Check RLS policies and ensure user is authenticated:
```sql
-- View policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';

-- Grant proper access
CREATE POLICY "policy_name" ON your_table
FOR INSERT TO authenticated
USING (auth.uid() = user_id);
```

#### 3. CORS Errors in Edge Functions

**Error**: `Access-Control-Allow-Origin header missing`

**Solution**: Add CORS headers:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Return CORS headers in all responses
return new Response(data, { headers: corsHeaders });
```

#### 4. Build Errors

**Error**: `Module not found` or type errors

**Solution**:
```bash
# Clear cache
rm -rf node_modules
rm -rf dist
rm bun.lockb

# Reinstall
bun install

# Rebuild
bun run build
```

#### 5. Real-time Not Working

**Solution**: Enable realtime on your table:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE your_table;
```

### Debug Tools

#### React DevTools
Install browser extension to inspect component tree and state.

#### Network Tab
Check API calls in browser DevTools Network tab.

#### Supabase Logs
View backend logs in Lovable Cloud interface.

#### Console Logs
```typescript
// Add strategic logging
console.log('User data:', userData);
console.log('Query result:', { data, error });
```

---

## Additional Resources

### Documentation Links

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)

### Learning Resources

- [Frontend Masters](https://frontendmasters.com)
- [Egghead.io](https://egghead.io)
- [Supabase YouTube](https://www.youtube.com/@Supabase)

### Community

- [Lovable Discord](https://discord.gg/lovable)
- [React Discord](https://discord.gg/react)
- [Supabase Discord](https://discord.supabase.com)

---

**Last Updated**: November 2024  
**Version**: 1.0.0

For questions or contributions, please reach out to the Eco-Sanjivani team.
