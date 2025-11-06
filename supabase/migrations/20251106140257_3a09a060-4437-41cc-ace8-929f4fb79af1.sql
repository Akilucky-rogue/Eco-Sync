-- Create events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  points_reward integer NOT NULL DEFAULT 0,
  max_volunteers integer NOT NULL,
  current_volunteers integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  waste_target text[] NOT NULL DEFAULT '{}',
  image text,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Events are viewable by authenticated users"
  ON public.events FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create events"
  ON public.events FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update their events"
  ON public.events FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Creators can delete their events"
  ON public.events FOR DELETE
  USING (auth.uid() = created_by);

-- Create event_participants table
CREATE TABLE public.event_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  joined_at timestamp with time zone NOT NULL DEFAULT now(),
  checked_in boolean NOT NULL DEFAULT false,
  checked_in_at timestamp with time zone,
  UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for event_participants
CREATE POLICY "Event participants are viewable by authenticated users"
  ON public.event_participants FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can join events"
  ON public.event_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their participation"
  ON public.event_participants FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can leave events"
  ON public.event_participants FOR DELETE
  USING (auth.uid() = user_id);

-- Create rewards table
CREATE TABLE public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  points_cost integer NOT NULL,
  category text NOT NULL CHECK (category IN ('badge', 'title', 'privilege', 'physical')),
  icon text,
  available boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rewards
CREATE POLICY "Rewards are viewable by authenticated users"
  ON public.rewards FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Create user_rewards table (claimed rewards)
CREATE TABLE public.user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reward_id uuid NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
  claimed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, reward_id)
);

-- Enable RLS
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_rewards
CREATE POLICY "Users can view their own rewards"
  ON public.user_rewards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can claim rewards"
  ON public.user_rewards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create social_posts table
CREATE TABLE public.social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN ('cleanup', 'achievement', 'photo', 'team_join', 'milestone')),
  content text NOT NULL,
  location text,
  image_url text,
  likes integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for social_posts
CREATE POLICY "Social posts are viewable by authenticated users"
  ON public.social_posts FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create posts"
  ON public.social_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their posts"
  ON public.social_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their posts"
  ON public.social_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Create waste_classifications table
CREATE TABLE public.waste_classifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  waste_type text NOT NULL,
  confidence numeric NOT NULL,
  sub_category text NOT NULL,
  recyclable boolean NOT NULL,
  estimated_weight text NOT NULL,
  volume_estimation jsonb,
  environmental_impact text NOT NULL,
  disposal_recommendation text NOT NULL,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waste_classifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for waste_classifications
CREATE POLICY "Users can view their own classifications"
  ON public.waste_classifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create classifications"
  ON public.waste_classifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their classifications"
  ON public.waste_classifications FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger for updating updated_at on events
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.waste_classifications;