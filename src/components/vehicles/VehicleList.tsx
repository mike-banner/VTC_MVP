// src/components/vehicles/VehicleList.tsx
import { getVehicles } from "@/services/vehicles";
import { Car, Edit2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { VehicleModal } from "./VehicleModal";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plate_number: string;
  category: string | null;
  capacity: number | null;
  status?: string | null;
}

interface VehicleListProps {
  tenantId: string;
}

export const VehicleList: React.FC<VehicleListProps> = ({ tenantId }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await getVehicles(tenantId);
      setVehicles(data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [tenantId]);

  useEffect(() => {
    const openModal = () => setShowModal(true);
    window.addEventListener("vehicles:open-modal", openModal);
    return () => window.removeEventListener("vehicles:open-modal", openModal);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between items-end mb-10'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
            Liste de vos véhicules ({vehicles.length})
          </p>
        </div>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='glass h-48 rounded-[2rem] border border-white/5 animate-pulse bg-white/5'
            />
          ))}
        </div>
      ) : vehicles.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-12'>
          {vehicles.map((v) => (
            <div
              key={v.id}
              className='glass p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all group relative overflow-hidden'>
              {/* Background Glow */}
              <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all' />

              <div className='flex justify-between items-start mb-6'>
                <div className='w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110'>
                  <Car className='w-8 h-8' />
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    v.status === "active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
                      : "bg-slate-500/10 text-slate-500 border-slate-500/10"
                  }`}>
                  {v.status === "active" ? "Opérationnel" : v.status}
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-xl font-black text-white uppercase tracking-tighter mb-1'>
                  {v.brand} {v.model}
                </h3>
                <p className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/5 w-fit px-2 py-0.5 rounded-md'>
                  {v.plate_number}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-white/5 pt-6'>
                <div className='flex gap-4'>
                  <div>
                    <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                      Passagers
                    </p>
                    <p className='text-sm font-bold text-white uppercase italic'>
                      {v.capacity} Places
                    </p>
                  </div>
                  <div>
                    <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                      Catégorie
                    </p>
                    <p className='text-sm font-bold text-white uppercase italic'>
                      {v.category}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-1'>
                  <button className='p-2 text-slate-600 hover:text-white transition-colors'>
                    <Edit2 className='w-4 h-4' />
                  </button>
                  <button className='p-2 text-slate-600 hover:text-red-500 transition-colors'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-1 glass rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center p-20 text-center'>
          <div className='w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-700 mb-6'>
            <Car className='w-10 h-10' />
          </div>
          <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2'>
            Aucun véhicule enregistré
          </h3>
          <p className='text-slate-500 text-sm italic mb-8 max-w-sm'>
            Vous n'avez pas encore de véhicule dans votre flotte. Enregistrez
            votre premier véhicule pour commencer à accepter des courses.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className='flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-indigo-50 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-white/20 active:scale-95'>
            <Plus className='w-4 h-4' />
            Ajouter un véhicule
          </button>
        </div>
      )}

      <VehicleModal
        tenantId={tenantId}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchVehicles}
      />
    </div>
  );
};
