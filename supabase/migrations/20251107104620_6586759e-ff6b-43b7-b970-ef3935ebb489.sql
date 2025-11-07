-- Add foreign key constraints only if they don't already exist
-- This enables proper joins between tables and profiles

DO $$ 
BEGIN
  -- Social posts to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'social_posts_user_id_fkey'
  ) THEN
    ALTER TABLE public.social_posts
    ADD CONSTRAINT social_posts_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Team members to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'team_members_user_id_fkey'
  ) THEN
    ALTER TABLE public.team_members
    ADD CONSTRAINT team_members_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Cleanups to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cleanups_user_id_fkey'
  ) THEN
    ALTER TABLE public.cleanups
    ADD CONSTRAINT cleanups_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Achievements to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'achievements_user_id_fkey'
  ) THEN
    ALTER TABLE public.achievements
    ADD CONSTRAINT achievements_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Badges to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'badges_user_id_fkey'
  ) THEN
    ALTER TABLE public.badges
    ADD CONSTRAINT badges_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- User stats to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_stats_user_id_fkey'
  ) THEN
    ALTER TABLE public.user_stats
    ADD CONSTRAINT user_stats_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- User rewards to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_rewards_user_id_fkey'
  ) THEN
    ALTER TABLE public.user_rewards
    ADD CONSTRAINT user_rewards_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Waste classifications to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'waste_classifications_user_id_fkey'
  ) THEN
    ALTER TABLE public.waste_classifications
    ADD CONSTRAINT waste_classifications_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Event participants to profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'event_participants_user_id_fkey'
  ) THEN
    ALTER TABLE public.event_participants
    ADD CONSTRAINT event_participants_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
END $$;