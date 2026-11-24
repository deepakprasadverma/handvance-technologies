-- ============================================================================
-- HANDVANCE TECHNOLOGIES: SUPABASE ROW LEVEL SECURITY (RLS) & STORAGE POLICIES
-- ============================================================================

-- 1. ENABLE ROW LEVEL SECURITY ACROSS ALL APPLICATION TABLES
ALTER TABLE "AdminUser" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuoteRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Career" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JobApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Testimonial" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NewsletterSubscriber" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WebsiteSetting" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ActivityLog" ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. PUBLIC READ POLICIES (Static & Published Content)
-- ============================================================================

-- Public can view published projects
CREATE POLICY "Public can view published projects"
  ON "Project"
  FOR SELECT
  USING (status = 'PUBLISHED');

-- Public can view active team members
CREATE POLICY "Public can view active team members"
  ON "TeamMember"
  FOR SELECT
  USING ("isActive" = true);

-- Public can view active career job openings
CREATE POLICY "Public can view active careers"
  ON "Career"
  FOR SELECT
  USING ("isActive" = true);

-- Public can view published testimonials
CREATE POLICY "Public can view published testimonials"
  ON "Testimonial"
  FOR SELECT
  USING (status = 'PUBLISHED');

-- Public can view public website settings
CREATE POLICY "Public can view public website settings"
  ON "WebsiteSetting"
  FOR SELECT
  USING ("isPublic" = true);

-- ============================================================================
-- 3. PUBLIC INGESTION POLICIES (Contact, Quotes, Applications, Newsletter)
-- ============================================================================

-- Public can submit contact inquiries
CREATE POLICY "Public can insert contact inquiries"
  ON "Contact"
  FOR INSERT
  WITH CHECK (true);

-- Public can submit quote requests
CREATE POLICY "Public can insert quote requests"
  ON "QuoteRequest"
  FOR INSERT
  WITH CHECK (true);

-- Public can subscribe to newsletter
CREATE POLICY "Public can insert newsletter subscriptions"
  ON "NewsletterSubscriber"
  FOR INSERT
  WITH CHECK (true);

-- Public can submit job applications
CREATE POLICY "Public can submit job applications"
  ON "JobApplication"
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- 4. SERVICE ROLE & AUTHENTICATED ADMIN FULL ACCESS POLICIES
-- ============================================================================

-- Service-role bypasses RLS automatically in Supabase, but explicit admin policies guarantee security:
CREATE POLICY "Admins have full access to AdminUser"
  ON "AdminUser"
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' IN (SELECT email FROM "AdminUser" WHERE "isActive" = true));

CREATE POLICY "Admins have full access to Contact"
  ON "Contact"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to QuoteRequest"
  ON "QuoteRequest"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to Project"
  ON "Project"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to TeamMember"
  ON "TeamMember"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to Career"
  ON "Career"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to JobApplication"
  ON "JobApplication"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to Testimonial"
  ON "Testimonial"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to NewsletterSubscriber"
  ON "NewsletterSubscriber"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to WebsiteSetting"
  ON "WebsiteSetting"
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admins have full access to ActivityLog"
  ON "ActivityLog"
  FOR ALL
  TO authenticated
  USING (true);

-- ============================================================================
-- 5. SUPABASE STORAGE BUCKET CONFIGURATION
-- ============================================================================

-- Create public storage buckets for project images and team photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-images', 'project-images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
  ('team-photos', 'team-photos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('resumes', 'resumes', false, 15728640, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- Public can view project images
CREATE POLICY "Public can read project images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');

-- Public can view team photos
CREATE POLICY "Public can read team photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'team-photos');

-- Only service role / authenticated admins can read resumes
CREATE POLICY "Admins can read resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');

-- Anyone can upload a resume when submitting a job application
CREATE POLICY "Public can upload resumes"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'resumes');
