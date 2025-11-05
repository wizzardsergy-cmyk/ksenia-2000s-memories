-- Create storage bucket for video greetings
INSERT INTO storage.buckets (id, name, public)
VALUES ('video-greetings', 'video-greetings', true);

-- Create storage policies
CREATE POLICY "Anyone can upload videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'video-greetings');

CREATE POLICY "Anyone can view videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'video-greetings');

-- Update questionnaires table to make video_url NOT NULL
ALTER TABLE public.questionnaires 
ALTER COLUMN video_url SET NOT NULL;