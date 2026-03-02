create unique index unique_active_policy_per_tenant
on cancellation_policies (tenant_id)
where active = true;
