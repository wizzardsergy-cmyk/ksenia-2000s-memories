-- Create users table for authentication
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  pin TEXT NOT NULL CHECK (length(pin) = 4),
  gender TEXT NOT NULL CHECK (gender IN ('female', 'male')),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(name)
);

-- Create questionnaires table
CREATE TABLE public.questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  video_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaires ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view all users"
  ON public.users
  FOR SELECT
  USING (true);

-- RLS Policies for questionnaires table
CREATE POLICY "Anyone can insert questionnaires"
  ON public.questionnaires
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view questionnaires"
  ON public.questionnaires
  FOR SELECT
  USING (true);

-- Insert Ксения as admin user
INSERT INTO public.users (name, pin, gender, is_admin)
VALUES ('Ксения', '0000', 'female', true);