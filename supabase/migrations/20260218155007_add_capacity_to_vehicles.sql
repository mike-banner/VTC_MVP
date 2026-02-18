-- Ajouter capacity si absent
alter table vehicles
add column if not exists capacity integer;

-- Forcer category à exister (si jamais elle manque)
alter table vehicles
add column if not exists category text;

-- Optionnel : mettre un default temporaire si tu as déjà des lignes
-- update vehicles set capacity = 4 where capacity is null;

-- Si tu veux verrouiller plus tard :
-- alter table vehicles alter column capacity set not null;
-- alter table vehicles alter column category set not null;
