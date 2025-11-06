-- Create profiles table for basic user info
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  full_name text not null,
  avatar_url text,
  bio text,
  location text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create user_stats table for gamification data
create table public.user_stats (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade unique,
  level integer not null default 1,
  points integer not null default 0,
  next_level_points integer not null default 500,
  environmental_score integer not null default 0,
  cleanups_count integer not null default 0,
  waste_collected numeric(10,2) not null default 0,
  volunteers_helped integer not null default 0,
  quizzes_taken integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.user_stats enable row level security;

create policy "User stats are viewable by everyone"
  on public.user_stats for select
  using (true);

create policy "Users can update their own stats"
  on public.user_stats for update
  using (auth.uid() = user_id);

create policy "Users can insert their own stats"
  on public.user_stats for insert
  with check (auth.uid() = user_id);

-- Create badges table
create table public.badges (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  earned_at timestamp with time zone not null default now()
);

alter table public.badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.badges for select
  using (true);

create policy "Users can insert their own badges"
  on public.badges for insert
  with check (auth.uid() = user_id);

-- Create achievements table
create table public.achievements (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text not null,
  earned boolean not null default false,
  progress numeric(10,2),
  earned_at timestamp with time zone,
  created_at timestamp with time zone not null default now()
);

alter table public.achievements enable row level security;

create policy "Achievements are viewable by everyone"
  on public.achievements for select
  using (true);

create policy "Users can update their own achievements"
  on public.achievements for update
  using (auth.uid() = user_id);

create policy "Users can insert their own achievements"
  on public.achievements for insert
  with check (auth.uid() = user_id);

-- Create cleanups table
create table public.cleanups (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  location text not null,
  date timestamp with time zone not null,
  waste_collected numeric(10,2) not null,
  points_earned integer not null,
  created_at timestamp with time zone not null default now()
);

alter table public.cleanups enable row level security;

create policy "Cleanups are viewable by everyone"
  on public.cleanups for select
  using (true);

create policy "Users can insert their own cleanups"
  on public.cleanups for insert
  with check (auth.uid() = user_id);

-- Create teams table
create table public.teams (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone not null default now()
);

alter table public.teams enable row level security;

create policy "Teams are viewable by everyone"
  on public.teams for select
  using (true);

create policy "Users can create teams"
  on public.teams for insert
  with check (auth.uid() = created_by);

-- Create team_members table
create table public.team_members (
  id uuid not null default gen_random_uuid() primary key,
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamp with time zone not null default now(),
  unique(team_id, user_id)
);

alter table public.team_members enable row level security;

create policy "Team members are viewable by everyone"
  on public.team_members for select
  using (true);

create policy "Users can join teams"
  on public.team_members for insert
  with check (auth.uid() = user_id);

-- Create storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Storage policies for avatars
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Insert profile
  insert into public.profiles (id, full_name)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', 'New User')
  );
  
  -- Insert initial stats
  insert into public.user_stats (user_id)
  values (new.id);
  
  return new;
end;
$$;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_user_stats_updated_at
  before update on public.user_stats
  for each row execute function public.update_updated_at_column();