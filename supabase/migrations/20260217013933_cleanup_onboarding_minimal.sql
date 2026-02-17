-- Supprimer legacy V1
alter table onboarding
drop column if exists city,
drop column if exists logo_url,
drop column if exists primary_color,
drop column if exists secondary_color,
drop column if exists brand,
drop column if exists model,
drop column if exists category,
drop column if exists base_price,
drop column if exists price_per_km,
drop column if exists minimum_fare;

-- S'assurer que les bons noms existent
alter table onboarding
add column if not exists vehicle_brand text,
add column if not exists vehicle_model text,
add column if not exists plate_number text,
add column if not exists capacity integer;
