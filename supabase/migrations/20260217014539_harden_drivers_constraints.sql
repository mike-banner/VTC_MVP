alter table drivers
alter column phone set not null;

alter table drivers
alter column license_number set not null;

alter table drivers
alter column created_at set default now();

alter table drivers
alter column created_at set not null;
