import { supabase } from "@/lib/supabase/client";

export const getVehicles = async (tenantId: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createVehicle = async (vehicle: {
  tenant_id: string;
  brand: string;
  model: string;
  plate_number: string;
  category: string;
  capacity: number;
  status: string;
}) => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([vehicle])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateVehicle = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("vehicles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteVehicle = async (id: string) => {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) throw error;
};
