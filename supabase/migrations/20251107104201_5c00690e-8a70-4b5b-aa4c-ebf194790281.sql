-- Add missing fields to teams table
ALTER TABLE public.teams 
ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS member_limit integer,
ADD COLUMN IF NOT EXISTS location text;

-- Create storage bucket for social photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('social-photos', 'social-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for social photos bucket
CREATE POLICY "Anyone can view social photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'social-photos');

CREATE POLICY "Authenticated users can upload social photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'social-photos' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own social photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'social-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own social photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'social-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);