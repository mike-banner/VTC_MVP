/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        user: import('@supabase/supabase-js').User | null;
        profile: {
            tenant_id: string | null;
            platform_role: string | null;
            tenant_role: 'owner' | 'manager' | 'driver' | null;
        } | null;
    }
}
