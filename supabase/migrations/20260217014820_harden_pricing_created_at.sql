alter table pricing_rules
alter column created_at set default now();

alter table pricing_rules
alter column created_at set not null;
