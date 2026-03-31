-- 20260331233000_booking_ratings.sql
-- Add rating fields to bookings and create aggregation view

ALTER TABLE "public"."bookings"
ADD COLUMN IF NOT EXISTS "rating" smallint CHECK (rating >= 1 AND rating <= 5),
ADD COLUMN IF NOT EXISTS "rating_comment" text,
ADD COLUMN IF NOT EXISTS "rating_created_at" timestamptz;

-- Create a view for driver performance analytics
CREATE OR REPLACE VIEW "public"."driver_ratings" AS
SELECT
    driver_id,
    tenant_id,
    AVG(rating)::numeric(3,2) as average_rating,
    COUNT(rating) as total_ratings,
    COUNT(*) FILTER (WHERE rating >= 4) as fast_track_count
FROM bookings
WHERE rating IS NOT NULL
GROUP BY driver_id, tenant_id;

GRANT SELECT ON TABLE "public"."driver_ratings" TO "authenticated";
GRANT SELECT ON TABLE "public"."driver_ratings" TO "service_role";
