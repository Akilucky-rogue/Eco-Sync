# 📚 Eco-Sanjivani - Technical Documentation

**Comprehensive Developer Guide**

Version: 1.0.0  
Last Updated: 2025

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [Authentication System](#authentication-system)
6. [Real-time Features](#real-time-features)
7. [AI Integration](#ai-integration)
8. [Component Library](#component-library)
9. [API Reference](#api-reference)
10. [State Management](#state-management)
11. [Styling & Design System](#styling--design-system)
12. [Security Guidelines](#security-guidelines)
13. [Deployment Guide](#deployment-guide)
14. [Testing Strategy](#testing-strategy)
15. [Performance Optimization](#performance-optimization)
16. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### High-Level System Design

Eco-Sanjivani is built as a modern full-stack web application using React for the frontend and Lovable Cloud (Supabase) for the backend infrastructure.

```
┌──────────────────────────────────────────────────────────────┐
│                      Client Layer                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │          React 18 + TypeScript + Vite                   │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Components │ Pages │ Hooks │ Utils │ Assets    │  │  │
│  │  │  Real-time Subscriptions │ AI Integration        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTPS/WebSocket
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    Lovable Cloud Platform                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                Supabase Services                      │   │
│  │  ┌─────────┬─────────┬─────────┬──────────────────┐ │   │
│  │  │PostgreSQL│  Auth   │ Storage │  Edge Functions  │ │   │
│  │  │   +RLS   │ System  │ Buckets │   (Deno)         │ │   │
│  │  │ Realtime │Sessions │ Avatars │ AI/Mapbox APIs   │ │   │
│  │  └─────────┴─────────┴─────────┴──────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                   External AI Service                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │   Lovable AI Gateway (Google Gemini 2.5 Flash)        │  │
│  │   - Computer Vision Analysis                           │  │
│  │   - Waste Type Classification                          │  │
│  │   - Volume & Weight Estimation                         │  │
│  │   - Environmental Impact Assessment                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend Technologies
- **Framework**: React 18.3.1
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite 5.x
- **Routing**: React Router v6.26.2
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI primitives via shadcn/ui
- **State Management**: React Query (TanStack Query v5)
- **Form Handling**: React Hook Form + Zod validation
- **Data Visualization**: Recharts
- **Maps**: Custom Illustrated India Map (no external API)
- **AI Model**: Google Gemini 2.5 Flash (Vision-Language Transformer)
- **AI Architecture**: CNN + Vision Transformers with cross-modal attention
- **CV Techniques**: Monocular depth estimation, semantic segmentation, volume regression
- **AI Gateway**: Lovable AI (Serverless inference API)

#### Backend Technologies (Lovable Cloud)
- **Database**: PostgreSQL 15+
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Edge Functions**: Deno runtime
- **Real-time**: Supabase Realtime
- **API**: Auto-generated REST API

#### Development Tools
- **Version Control**: Git + GitHub
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler
- **CI/CD**: Automated via Lovable

---

## Frontend Architecture

### Project Structure

```
src/
├── components/                 # React components
│   ├── ui/                    # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   └── ... (60+ components)
│   │
│   ├── AchievementBadge.tsx   # Badge display component
│   ├── ActivityFeed.tsx       # User activity timeline
│   ├── DesktopHeader.tsx      # Desktop navigation
│   ├── EditProfileDialog.tsx  # Profile editing modal
│   ├── EnvironmentalQuiz.tsx  # Educational quizzes
│   ├── ErrorMessage.tsx       # Error state component
│   ├── EventCard.tsx          # Event display card
│   ├── EventCheckIn.tsx       # Digital check-in system
│   ├── EventCreationForm.tsx  # Event creation with validation
│   ├── EventStatusUpdates.tsx # Real-time event updates
│   ├── HeroSection.tsx        # Landing page hero
│   ├── ImpactStats.tsx        # Environmental impact metrics
│   ├── InteractiveMap.tsx     # Real-time Mapbox map
│   ├── Layout.tsx             # App layout wrapper
│   ├── Leaderboard.tsx        # User rankings
│   ├── LoadingSpinner.tsx     # Loading states
│   ├── Navigation.tsx         # Mobile navigation
│   ├── NotificationSystem.tsx # Toast notifications
│   ├── PageLoader.tsx         # Page-level loading
│   ├── PhotoShareCard.tsx     # Photo sharing component
│   ├── QuickActions.tsx       # Quick action buttons
│   ├── RewardSystem.tsx       # Rewards display
│   ├── SecurityErrorBoundary.tsx # Error boundary
│   ├── SocialFeed.tsx         # Community feed
│   ├── StatCard.tsx           # Statistics card
│   ├── StreakCounter.tsx      # Streak tracking
│   ├── TeamCard.tsx           # Team display
│   ├── UpcomingEvents.tsx     # Event list
│   ├── UserAvatar.tsx         # User avatar component
│   ├── VolunteerTestimonials.tsx # Success stories
│   ├── WasteClassifier.tsx    # AI waste classification
│   └── WeatherWidget.tsx      # Weather display
│
├── pages/                     # Page-level components
│   ├── Home.tsx              # Landing page
│   ├── Events.tsx            # Events browsing
│   ├── Dashboard.tsx         # User dashboard
│   ├── Profile.tsx           # User profile
│   ├── Auth.tsx              # Authentication
│   ├── Gamification.tsx      # Gamification hub
│   ├── Social.tsx            # Social feed
│   ├── WasteClassification.tsx # Waste classifier
│   ├── EventManagement.tsx   # Event management
│   └── Admin.tsx             # Admin panel
│
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useRateLimit.ts       # Rate limiting hook
│   ├── use-mobile.tsx        # Mobile detection
│   └── use-toast.ts          # Toast notifications
│
├── integrations/              # External service integrations
│   └── supabase/
│       ├── client.ts         # Supabase client instance
│       └── types.ts          # Generated TypeScript types
│
├── lib/                       # Utility functions
│   └── utils.ts              # Helper functions
│
├── index.css                  # Global styles & design tokens
├── App.tsx                    # Root component
├── main.tsx                   # Application entry point
└── vite-env.d.ts             # Vite type definitions
```

### Component Design Principles

#### 1. Single Responsibility
Each component should have one clear purpose.

```typescript
// ❌ Bad: Component doing too much
const UserDashboard = () => {
  // Fetching, rendering, event handling all in one
  const [data, setData] = useState();
  // ... 200 lines of mixed logic
}

// ✅ Good: Separated concerns
const Dashboard = () => (
  <Layout>
    <DashboardHeader />
    <UserStats />
    <UpcomingEvents />
    <ActivityFeed />
  </Layout>
);
```

#### 2. Type Safety
Always define TypeScript interfaces.

```typescript
interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    current_volunteers: number;
    max_volunteers: number;
  };
  onJoin?: (eventId: string) => void;
  isJoined?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onJoin,
  isJoined = false 
}) => {
  // Component implementation
};
```

#### 3. Composition Over Inheritance
Build complex UIs through composition.

```typescript
// ✅ Composable components
<Card>
  <CardHeader>
    <CardTitle>Beach Cleanup</CardTitle>
    <CardDescription>Marina Beach, Chennai</CardDescription>
  </CardHeader>
  <CardContent>
    <EventDetails event={event} />
  </CardContent>
  <CardFooter>
    <Button onClick={handleJoin}>Join Event</Button>
  </CardFooter>
</Card>
```

### Custom Hooks

#### useAuth Hook
Manages authentication state throughout the app.

```typescript
import { useAuth } from '@/hooks/useAuth';

function ProtectedPage() {
  const { user, session, loading, signOut } = useAuth();
  
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth" />;
  
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
```

**Hook Implementation:**
```typescript
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, loading, signOut };
};
```

#### useRateLimit Hook
Prevents spam and abuse.

```typescript
import { useRateLimit } from '@/hooks/useRateLimit';

function CommentForm() {
  const { checkLimit, resetLimit } = useRateLimit('comments', 5, 60000);
  
  const handleSubmit = async (data) => {
    if (!checkLimit()) {
      toast.error('Too many requests. Please wait a minute.');
      return;
    }
    
    await submitComment(data);
    resetLimit();
    toast.success('Comment posted!');
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Backend Architecture

### Lovable Cloud Overview

Lovable Cloud provides a fully managed Supabase backend with:

1. **PostgreSQL Database** with Row Level Security (RLS)
2. **Authentication** (email/password, OAuth, magic links)
3. **File Storage** with secure access policies
4. **Edge Functions** (Deno serverless runtime)
5. **Real-time Subscriptions** for live data updates

### Supabase Client

The client is pre-configured and globally available:

```typescript
import { supabase } from '@/integrations/supabase/client';

// ✅ Always use this instance
// ❌ Never create your own client
```

### Edge Functions

Edge Functions provide serverless backend logic.

```
supabase/functions/
├── mapbox-token/          # Token provider (legacy, not actively used)
│   └── index.ts
└── classify-waste/        # AI waste classification (active)
    └── index.ts
```

#### classify-waste Function
**Purpose**: AI-powered waste classification using computer vision to identify waste types, estimate volumes, and provide disposal recommendations.

**Technology Stack**:
- **Runtime**: Deno (Supabase Edge Functions)
- **AI Model**: Google Gemini 2.5 Flash via Lovable AI Gateway
- **Input**: Base64-encoded image (JPEG/PNG)
- **Output**: Structured JSON with classification details

**Technical Flow**:
```
1. Client captures/uploads image
2. Image converted to base64 in browser
3. Edge function receives request with imageBase64
4. Function calls Lovable AI Gateway
5. Gemini 2.5 Flash analyzes image
6. AI returns structured JSON classification
7. Edge function validates and returns data
8. Client displays results & saves to database
```

#### mapbox-token Function
Securely provides Mapbox access tokens to the frontend.

```typescript
// supabase/functions/mapbox-token/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const MAPBOX_ACCESS_TOKEN = Deno.env.get('MAPBOX_ACCESS_TOKEN');

    if (!MAPBOX_ACCESS_TOKEN) {
      throw new Error('MAPBOX_ACCESS_TOKEN not configured');
    }

    return new Response(
      JSON.stringify({ token: MAPBOX_ACCESS_TOKEN }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
```

**Usage:**
```typescript
const { data, error } = await supabase.functions.invoke('mapbox-token');
if (data?.token) {
  mapboxgl.accessToken = data.token;
}
```

#### classify-waste Function
AI-powered waste classification using Lovable AI.

```typescript
// Frontend usage
const classifyWaste = async (imageBase64: string) => {
  const { data, error } = await supabase.functions.invoke('classify-waste', {
    body: { imageBase64 }
  });
  
  return data; // { wasteType, confidence, recyclable, ... }
};
```

---

## Database Schema

### Table Relationships

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   auth.users │◄──────│    profiles      │──────►│  user_stats  │
└──────────────┘       └──────────────────┘       └──────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ achievements │     │    badges    │     │   cleanups   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │    events    │
                                          └──────────────┘
                                                  │
                                                  ▼
                                     ┌───────────────────────┐
                                     │ event_participants    │
                                     └───────────────────────┘
```

### Core Tables

#### profiles
User profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);
```

#### user_stats
Tracks user statistics and progress.

```sql
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  points INTEGER NOT NULL DEFAULT 0,
  next_level_points INTEGER NOT NULL DEFAULT 500,
  environmental_score INTEGER NOT NULL DEFAULT 0,
  cleanups_count INTEGER NOT NULL DEFAULT 0,
  waste_collected NUMERIC NOT NULL DEFAULT 0,
  volunteers_helped INTEGER NOT NULL DEFAULT 0,
  quizzes_taken INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User stats are viewable by everyone"
  ON user_stats FOR SELECT USING (true);

CREATE POLICY "Users can update their own stats"
  ON user_stats FOR UPDATE 
  USING (auth.uid() = user_id);
```

#### events
Cleanup event information.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  points_reward INTEGER NOT NULL DEFAULT 0,
  max_volunteers INTEGER NOT NULL,
  current_volunteers INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming',
  waste_target TEXT[] NOT NULL DEFAULT '{}',
  image TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable real-time updates
ALTER TABLE events REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE events;

-- RLS Policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by authenticated users"
  ON events FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update their events"
  ON events FOR UPDATE
  USING (auth.uid() = created_by);
```

#### event_participants
Tracks event registration.

```sql
CREATE TABLE event_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  user_id UUID NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  checked_in BOOLEAN NOT NULL DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  UNIQUE(event_id, user_id)
);

-- RLS Policies
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Event participants are viewable by authenticated users"
  ON event_participants FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can join events"
  ON event_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### achievements
User achievement tracking.

```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  earned BOOLEAN NOT NULL DEFAULT false,
  progress NUMERIC,
  earned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT USING (true);

CREATE POLICY "Users can update their own achievements"
  ON achievements FOR UPDATE
  USING (auth.uid() = user_id);
```

#### badges
Badge assignments.

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are viewable by everyone"
  ON badges FOR SELECT USING (true);
```

#### social_posts
Community social feed.

```sql
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT,
  location TEXT,
  likes INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Social posts are viewable by authenticated users"
  ON social_posts FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create posts"
  ON social_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### waste_classifications
AI waste classification results.

```sql
CREATE TABLE waste_classifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  waste_type TEXT NOT NULL,
  sub_category TEXT NOT NULL,
  confidence NUMERIC NOT NULL,
  recyclable BOOLEAN NOT NULL,
  estimated_weight TEXT NOT NULL,
  volume_estimation JSONB,
  environmental_impact TEXT NOT NULL,
  disposal_recommendation TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE waste_classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own classifications"
  ON waste_classifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create classifications"
  ON waste_classifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Database Functions

#### update_updated_at_column()
Automatically updates `updated_at` timestamps.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### handle_new_user()
Creates profile and stats for new users.

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  
  -- Create stats
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## Authentication System

### Supabase Auth Integration

#### Sign Up

```typescript
const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (error) throw error;
  return data;
};
```

#### Sign In

```typescript
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};
```

#### Sign Out

```typescript
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
```

#### Protected Routes

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
};

// Usage in App.tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## Real-time Features

### Subscribing to Database Changes

The InteractiveMap component demonstrates real-time subscriptions:

```typescript
useEffect(() => {
  // Subscribe to events table changes
  const channel = supabase
    .channel('events-realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'events',
        filter: 'status=eq.upcoming'
      },
      (payload) => {
        console.log('Event updated:', payload);
        
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          // Update local state with new data
          handleEventUpdate(payload.new);
        } else if (payload.eventType === 'DELETE') {
          // Remove from local state
          handleEventDelete(payload.old.id);
        }
      }
    )
    .subscribe();

  // Cleanup
  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

### Real-time Map Updates

```typescript
const InteractiveMap = () => {
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel('events-realtime')
      .on('postgres_changes', { ... }, (payload) => {
        setLastUpdate(new Date());
        
        if (payload.eventType === 'UPDATE') {
          setEvents(prev => 
            prev.map(e => 
              e.id === payload.new.id ? payload.new : e
            )
          );
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div>
      {lastUpdate && (
        <Badge>Updated {lastUpdate.toLocaleTimeString()}</Badge>
      )}
      <Map events={events} />
    </div>
  );
};
```

---

## AI Integration

### Overview

Eco-Sanjivani uses **Lovable AI**, a pre-configured AI gateway that provides seamless access to advanced AI models without requiring API key management. The platform specifically leverages **Google Gemini 2.5 Flash** for computer vision and waste classification tasks.

### Lovable AI Gateway Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        WasteClassifier Component                      │   │
│  │  - Image capture/upload                               │   │
│  │  - Base64 conversion                                  │   │
│  │  - Result display                                     │   │
│  └────────────────┬─────────────────────────────────────┘   │
└───────────────────┼─────────────────────────────────────────┘
                    │ HTTPS (supabase.functions.invoke)
                    ▼
┌─────────────────────────────────────────────────────────────┐
│           Supabase Edge Function (classify-waste)            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1. Receive imageBase64                               │   │
│  │  2. Validate input                                    │   │
│  │  3. Call Lovable AI Gateway                          │   │
│  │  4. Parse & validate AI response                      │   │
│  │  5. Return structured JSON                            │   │
│  └────────────────┬─────────────────────────────────────┘   │
└───────────────────┼─────────────────────────────────────────┘
                    │ HTTPS (Authorization: Bearer LOVABLE_API_KEY)
                    ▼
┌─────────────────────────────────────────────────────────────┐
│           Lovable AI Gateway                                 │
│  https://ai.gateway.lovable.dev/v1/chat/completions         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Model routing                                      │   │
│  │  - Request handling                                   │   │
│  │  - Response formatting                                │   │
│  └────────────────┬─────────────────────────────────────┘   │
└───────────────────┼─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│         Google Gemini 2.5 Flash Model                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Multimodal AI (text + vision)                     │   │
│  │  - Image analysis                                     │   │
│  │  - Object recognition                                 │   │
│  │  - Volume estimation                                  │   │
│  │  - Context understanding                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### AI Model: Google Gemini 2.5 Flash

**Why Gemini 2.5 Flash?**
- ✅ **Multimodal**: Excellent at analyzing both images and text
- ✅ **Fast Response**: Optimized for quick inference (< 2 seconds)
- ✅ **Cost-Effective**: Balanced performance-to-cost ratio
- ✅ **Vision Capabilities**: Strong object recognition and spatial reasoning
- ✅ **Structured Output**: Reliable JSON generation
- ✅ **Context Window**: Large enough for detailed prompts

**Model Specifications**:
- **Provider**: Google AI
- **Version**: Gemini 2.5 Flash
- **Input**: Text + Images (base64)
- **Output**: JSON (structured data)
- **Temperature**: 0.3 (for consistent, deterministic responses)
- **Max Tokens**: ~2048 for output

### Waste Classification System

#### Classification Categories

The AI classifies waste into **9 primary categories**:

1. **plastic** - Bottles, bags, containers, packaging
2. **metal** - Cans, foils, containers
3. **organic** - Food waste, biodegradable materials
4. **glass** - Bottles, jars, broken glass
5. **paper** - Cardboard, newspapers, documents
6. **electronic** - E-waste, batteries, circuits
7. **textile** - Fabric, clothing, rags
8. **mixed** - Multiple waste types together
9. **other** - Unclassified or unique items

#### Classification Output Schema

```typescript
interface ClassificationResult {
  // Primary classification
  wasteType: "plastic" | "metal" | "organic" | "glass" | "paper" | 
             "electronic" | "textile" | "mixed" | "other";
  
  // AI confidence score (0.0 - 1.0)
  confidence: number;
  
  // Specific item type
  subCategory: string; // e.g., "PET bottle", "aluminum can"
  
  // Recyclability assessment
  recyclable: boolean;
  
  // Weight estimation
  estimatedWeight: string; // e.g., "0.5 kg", "250 grams"
  
  // Advanced volume analysis
  volumeEstimation: {
    estimatedVolume: string;      // e.g., "2.5 liters", "0.5 m³"
    dimensions: string;            // e.g., "30cm x 20cm x 15cm"
    sizeCategory: "small" | "medium" | "large" | "extra-large";
    confidenceLevel: number;       // Confidence in volume estimate
    estimationMethod: string;      // How volume was calculated
  };
  
  // Environmental context
  environmentalImpact: string;
  
  // Disposal guidance
  disposalRecommendation: string;
}
```

### Volume Estimation Algorithm

The AI uses advanced computer vision techniques to estimate waste volume:

#### 1. **Reference Object Detection**
```
- Identifies common objects in frame for scale
- Uses known dimensions (e.g., hand size, bottle caps)
- Establishes baseline measurements
```

#### 2. **Shadow Analysis**
```
- Analyzes shadow patterns
- Calculates depth and height
- Estimates 3D structure
```

#### 3. **Spatial Reasoning**
```
- Examines object placement
- Calculates relative positions
- Determines approximate dimensions
```

#### 4. **Pattern Recognition**
```
- Identifies standard waste containers
- Matches against known sizes
- Applies typical dimensions
```

#### 5. **Confidence Scoring**
```
- Multiple estimation methods
- Cross-validation of results
- Confidence level assignment
```

### Edge Function Implementation

#### Complete classify-waste Function

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    // Validate input
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment (auto-provisioned by Lovable)
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Classifying waste with Gemini 2.5 Flash...');
    
    // Call Lovable AI Gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash', // Specific model selection
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image of waste and classify it with volume estimation. 
                Return ONLY valid JSON in this exact format:
                {
                  "wasteType": "plastic" | "metal" | "organic" | "glass" | "paper" | 
                               "electronic" | "textile" | "mixed" | "other",
                  "confidence": 0.95,
                  "subCategory": "specific type like PET bottle, aluminum can, etc",
                  "recyclable": true | false,
                  "estimatedWeight": "approximate weight in kg",
                  "volumeEstimation": {
                    "estimatedVolume": "volume in liters or cubic meters",
                    "dimensions": "approximate dimensions (e.g., '30cm x 20cm x 15cm')",
                    "sizeCategory": "small" | "medium" | "large" | "extra-large",
                    "confidenceLevel": 0.85,
                    "estimationMethod": "brief explanation of how volume was estimated"
                  },
                  "environmentalImpact": "brief description of environmental impact",
                  "disposalRecommendation": "how to properly dispose of this waste"
                }

                For volume estimation:
                - Analyze spatial relationships, shadows, and reference objects in the image
                - Consider typical sizes of identified waste items
                - Estimate physical dimensions based on common object sizes
                - Provide a confidence level for your volume estimation
                - Explain your estimation method briefly

                Be precise and provide actionable information for waste management.`
              },
              {
                type: 'image_url',
                image_url: { 
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        temperature: 0.3 // Low temperature for consistent JSON output
      })
    });

    // Handle errors
    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI classification failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Invalid AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse JSON response (handle markdown code blocks)
    let classification;
    try {
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                       aiResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : aiResponse;
      classification = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse classification results',
          rawResponse: aiResponse 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate classification result
    const validWasteTypes = ['plastic', 'metal', 'organic', 'glass', 'paper', 
                             'electronic', 'textile', 'mixed', 'other'];
    if (!validWasteTypes.includes(classification.wasteType)) {
      classification.wasteType = 'other';
    }

    // Ensure confidence is valid
    if (typeof classification.confidence !== 'number' || 
        classification.confidence < 0 || 
        classification.confidence > 1) {
      classification.confidence = 0.5;
    }

    return new Response(
      JSON.stringify(classification),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in classify-waste function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
```

#### Waste Classification

```typescript
const classifyWaste = async (imageFile: File) => {
  // Convert image to base64
  const reader = new FileReader();
  const imageBase64 = await new Promise<string>((resolve) => {
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(imageFile);
  });

  // Call edge function
  const { data, error } = await supabase.functions.invoke('classify-waste', {
    body: { imageBase64 }
  });

  if (error) throw error;
  
  return data as {
    wasteType: string;
    confidence: number;
    subCategory: string;
    recyclable: boolean;
    estimatedWeight: string;
    volumeEstimation: {
      estimatedVolume: string;
      dimensions: string;
      sizeCategory: string;
    };
    environmentalImpact: string;
    disposalRecommendation: string;
  };
};
```

#### Usage in Component

```typescript
const WasteClassifier = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const classification = await classifyWaste(image);
      setResult(classification);
      
      // Save to database
      await supabase.from('waste_classifications').insert({
        user_id: user.id,
        ...classification
      });
      
      toast.success('Waste classified successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Classification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button onClick={handleClassify} disabled={!image || loading}>
        {loading ? 'Classifying...' : 'Classify Waste'}
      </Button>
      {result && <ClassificationDisplay result={result} />}
    </div>
  );
};
```

---

## Component Library

### Base UI Components (shadcn/ui)

All base components are built on Radix UI primitives:

- `<Button>` - Button with variants
- `<Card>` - Container component
- `<Dialog>` - Modal dialogs
- `<Input>` - Form input
- `<Select>` - Dropdown select
- `<Tabs>` - Tab navigation
- `<Badge>` - Status badges
- `<Avatar>` - User avatars
- `<Progress>` - Progress bars
- `<Accordion>` - Collapsible content

### Feature Components

#### EventCard

```typescript
interface EventCardProps {
  event: {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    difficulty: string;
    points_reward: number;
    current_volunteers: number;
    max_volunteers: number;
    image?: string;
  };
  onJoin?: (eventId: string) => void;
  isJoined?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoin, isJoined }) => {
  return (
    <Card>
      <CardHeader>
        <img src={event.image} alt={event.name} />
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
        <div className="flex gap-2">
          <Badge>{event.category}</Badge>
          <Badge>{event.difficulty}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onJoin?.(event.id)} disabled={isJoined}>
          {isJoined ? 'Joined' : 'Join Event'}
        </Button>
      </CardFooter>
    </Card>
  );
};
```

#### InteractiveMap

**Custom India Coastal Map Implementation**

The map now uses a custom illustrated India map instead of external mapping services, providing a self-contained, zero-cost solution with real-time event tracking.

**Technical Approach**:
```typescript
// City coordinate mapping (pixel positions on the custom map image)
const CITY_POSITIONS = {
  Mumbai: { x: 35, y: 55 },
  Chennai: { x: 70, y: 75 },
  Kochi: { x: 60, y: 85 },
  Visakhapatnam: { x: 75, y: 60 },
  Kolkata: { x: 82, y: 45 },
  Goa: { x: 52, y: 65 },
  Mangalore: { x: 58, y: 70 },
  Puri: { x: 78, y: 52 },
  Surat: { x: 48, y: 50 },
  Thiruvananthapuram: { x: 62, y: 90 },
  Pondicherry: { x: 72, y: 78 },
  Daman: { x: 46, y: 48 },
  Port Blair: { x: 88, y: 80 },
  Dwarka: { x: 42, y: 45 },
  Paradip: { x: 80, y: 50 }
};

interface EventLocation {
  id: string;
  name: string;
  location: string;
  current_volunteers: number;
  max_volunteers: number;
  date: string;
  coordinates?: { x: number; y: number };
}

const InteractiveMap = () => {
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventLocation | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Load events and set up real-time sync
  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming');

      if (data) {
        // Map events to coordinates
        const eventsWithCoords = data.map(event => ({
          ...event,
          coordinates: CITY_POSITIONS[event.location] || CITY_POSITIONS.Mumbai
        }));
        setEvents(eventsWithCoords);
      }
    };

    loadEvents();

    // Real-time subscription for live updates
    const channel = supabase
      .channel('events-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: 'status=eq.upcoming'
        },
        (payload) => {
          setLastUpdate(new Date());
          
          if (payload.eventType === 'UPDATE') {
            setEvents(prev => 
              prev.map(e => {
                if (e.id === payload.new.id) {
                  return {
                    ...payload.new,
                    coordinates: CITY_POSITIONS[payload.new.location] || CITY_POSITIONS.Mumbai
                  };
                }
                return e;
              })
            );
          } else if (payload.eventType === 'INSERT') {
            const newEvent = {
              ...payload.new,
              coordinates: CITY_POSITIONS[payload.new.location] || CITY_POSITIONS.Mumbai
            };
            setEvents(prev => [...prev, newEvent]);
          } else if (payload.eventType === 'DELETE') {
            setEvents(prev => prev.filter(e => e.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>India Coastal Events Map</CardTitle>
          {lastUpdate && (
            <Badge variant="outline" className="animate-pulse">
              Live • Updated {lastUpdate.toLocaleTimeString()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[600px]">
          {/* Custom India map background */}
          <img 
            src="/assets/india-coastal-map.jpg" 
            alt="India Coastal Map"
            className="w-full h-full object-contain"
          />
          
          {/* Event markers */}
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2
                         bg-primary text-primary-foreground rounded-full
                         w-8 h-8 flex items-center justify-center
                         hover:scale-110 transition-transform shadow-lg
                         animate-bounce cursor-pointer"
              style={{
                left: `${event.coordinates.x}%`,
                top: `${event.coordinates.y}%`,
              }}
              title={event.name}
            >
              {event.current_volunteers}
            </button>
          ))}
        </div>

        {/* Event details popup */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEvent.name}</DialogTitle>
                <DialogDescription>{selectedEvent.location}</DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <p><strong>Date:</strong> {selectedEvent.date}</p>
                <p><strong>Volunteers:</strong> {selectedEvent.current_volunteers}/{selectedEvent.max_volunteers}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
```

**Key Features**:
- ✅ No external API dependencies
- ✅ Zero ongoing costs
- ✅ Real-time volunteer count updates
- ✅ Interactive marker system
- ✅ Custom city positioning
- ✅ Responsive design

---

## API Reference

### Supabase Client Methods

#### Database Queries

```typescript
// Select
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'upcoming')
  .order('date', { ascending: true })
  .limit(10);

// Insert
const { data, error } = await supabase
  .from('events')
  .insert({
    name: 'Beach Cleanup',
    description: 'Clean up Marina Beach',
    date: '2025-12-01',
    time: '08:00 AM',
    location: 'Chennai',
    created_by: user.id
  });

// Update
const { data, error } = await supabase
  .from('events')
  .update({ current_volunteers: 10 })
  .eq('id', eventId);

// Delete
const { data, error } = await supabase
  .from('events')
  .delete()
  .eq('id', eventId);
```

#### Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: { full_name: 'John Doe' }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Sign out
const { error } = await supabase.auth.signOut();

// Get session
const { data: { session } } = await supabase.auth.getSession();

// Get user
const { data: { user } } = await supabase.auth.getUser();
```

#### Storage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${user.id}/avatar.jpg`, file);

// Download file
const { data, error } = await supabase.storage
  .from('avatars')
  .download(`${user.id}/avatar.jpg`);

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${user.id}/avatar.jpg`);
```

#### Edge Functions

```typescript
// Invoke function
const { data, error } = await supabase.functions.invoke('function-name', {
  body: { key: 'value' },
  headers: { 'Content-Type': 'application/json' }
});
```

---

## State Management

### React Query (TanStack Query)

Used for server state management.

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data
const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming');
      
      if (error) throw error;
      return data;
    },
  });
};

// Mutate data
const useJoinEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventId: string) => {
      const { data, error } = await supabase
        .from('event_participants')
        .insert({ event_id: eventId, user_id: user.id });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// Usage in component
const EventsList = () => {
  const { data: events, isLoading } = useEvents();
  const joinEvent = useJoinEvent();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {events?.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onJoin={() => joinEvent.mutate(event.id)}
        />
      ))}
    </div>
  );
};
```

---

## Styling & Design System

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### CSS Variables (Design Tokens)

```css
/* index.css */
:root {
  /* Brand Colors */
  --primary: 200 95% 27%;  /* Ocean Blue */
  --secondary: 163 94% 24%; /* Coastal Teal */
  --accent: 34 100% 50%;    /* Sunrise Orange */
  
  /* Semantic Colors */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  
  /* Status Colors */
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --error: 0 72% 51%;
  
  /* Spacing */
  --radius: 0.5rem;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### Component Styling

```typescript
// Using design tokens
<div className="bg-background text-foreground">
  <h1 className="text-primary">Eco-Sanjivani</h1>
  <p className="text-muted-foreground">Marine conservation</p>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

// Custom utilities
<Button className="gradient-primary">Join Event</Button>
```

---

## Security Guidelines

### Input Validation

Always validate user input with Zod schemas:

```typescript
import { z } from 'zod';

const eventSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .refine(value => !/<[^>]*>/.test(value), 'HTML tags not allowed'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  
  date: z.string()
    .refine(value => new Date(value) > new Date(), 'Date must be in the future'),
  
  location: z.string().min(3, 'Location is required'),
});

// Usage in form
const form = useForm({
  resolver: zodResolver(eventSchema),
});
```

### Row Level Security (RLS)

Always enable RLS on tables:

```sql
-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view events"
  ON events FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their events"
  ON events FOR UPDATE
  USING (auth.uid() = created_by);
```

### Rate Limiting

```typescript
const { checkLimit, resetLimit } = useRateLimit('action-name', 5, 60000);

const handleAction = async () => {
  if (!checkLimit()) {
    toast.error('Too many requests. Please wait.');
    return;
  }
  
  // Perform action
  await performAction();
  resetLimit();
};
```

### Error Handling

```typescript
// Error boundary
<SecurityErrorBoundary>
  <App />
</SecurityErrorBoundary>

// Try-catch in async functions
try {
  const result = await riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  toast.error('An error occurred. Please try again.');
}
```

---

## Deployment Guide

### Lovable Cloud Deployment

1. **Automatic Deployment**: Changes are automatically deployed
2. **Frontend Updates**: Click "Update" in publish dialog
3. **Backend Changes**: Deploy immediately and automatically
4. **Edge Functions**: Auto-deployed with code changes

### Environment Variables

Managed automatically by Lovable Cloud:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

### Database Migrations

Migrations are applied automatically through Lovable interface.

### Custom Domain

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records
4. Wait for SSL certificate provisioning

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Authentication flow (sign up, sign in, sign out)
- [ ] Event creation and management
- [ ] Event registration and check-in
- [ ] Real-time map updates
- [ ] Waste classification
- [ ] Dashboard statistics
- [ ] Profile editing
- [ ] Social features
- [ ] Mobile responsiveness
- [ ] Dark mode

### Testing Edge Functions

```typescript
// Test mapbox-token function
const { data, error } = await supabase.functions.invoke('mapbox-token');
console.log('Token:', data?.token);

// Test classify-waste function
const { data, error } = await supabase.functions.invoke('classify-waste', {
  body: { imageBase64: testImage }
});
console.log('Classification:', data);
```

---

## Performance Optimization

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Events = lazy(() => import('./pages/Events'));

<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/events" element={<Events />} />
  </Routes>
</Suspense>
```

### Image Optimization

```typescript
// Use proper image formats and sizes
<img
  src={event.image}
  alt={event.name}
  loading="lazy"
  className="w-full h-48 object-cover"
/>
```

### Database Query Optimization

```typescript
// ❌ Bad: Select all columns
const { data } = await supabase.from('events').select('*');

// ✅ Good: Select only needed columns
const { data } = await supabase
  .from('events')
  .select('id, name, date, location')
  .limit(10);
```

---

## Troubleshooting

### Common Issues

#### Map Not Loading

```typescript
// Check if Mapbox token is configured
const { data, error } = await supabase.functions.invoke('mapbox-token');
console.log('Token received:', !!data?.token);

// Verify edge function is deployed
// Check Supabase > Edge Functions > mapbox-token
```

#### Real-time Not Working

```typescript
// Verify table has realtime enabled
// ALTER PUBLICATION supabase_realtime ADD TABLE events;

// Check subscription status
const channel = supabase.channel('events')
  .on('postgres_changes', { ... }, callback)
  .subscribe((status) => {
    console.log('Subscription status:', status);
  });
```

#### Authentication Issues

```typescript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);

// Verify RLS policies
// Check Supabase > Database > Tables > Policies
```

### Debug Logging

```typescript
// Enable debug mode in Supabase client
const supabase = createClient(url, key, {
  auth: {
    debug: true,
  },
});
```

### Performance Monitoring

```typescript
// Log query performance
const start = performance.now();
const { data } = await supabase.from('events').select('*');
const end = performance.now();
console.log(`Query took ${end - start}ms`);
```

---

## Additional Resources

- **Official Documentation**: [https://docs.lovable.dev/](https://docs.lovable.dev/)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **React Documentation**: [https://react.dev/](https://react.dev/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
- **Mapbox GL JS**: [https://docs.mapbox.com/mapbox-gl-js/](https://docs.mapbox.com/mapbox-gl-js/)

---

## Contributing

See [README.md](./README.md) for contribution guidelines.

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ for India's marine ecosystems</sub>
  <br>
  <sub>© 2025 Eco-Sanjivani. All rights reserved.</sub>
</div>
