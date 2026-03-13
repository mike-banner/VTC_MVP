import {
  deleteDriver,
  getDrivers,
  initializePrimaryDriver,
} from "@/services/drivers";
import {
  CreditCard,
  Edit2,
  Phone,
  Plus,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { DriverModal } from "./DriverModal";

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  license_number: string;
  created_at: string;
}

interface DriverListProps {
  tenantId: string;
  userId: string;
}

export const DriverList: React.FC<DriverListProps> = ({ tenantId, userId }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await getDrivers(tenantId);
      setDrivers(data || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    if (
      window.confirm(
        "Voulez-vous vous enregistrer automatiquement comme premier chauffeur en utilisant vos informations d'inscription ?",
      )
    ) {
      try {
        setInitLoading(true);
        const res = await initializePrimaryDriver(tenantId, userId);
        if (res.success) {
          fetchDrivers();
        } else {
          alert(res.error || res.message || "Erreur lors de l'initialisation");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInitLoading(false);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      window.confirm(`Voulez-vous vraiment supprimer le chauffeur ${name} ?`)
    ) {
      try {
        await deleteDriver(id);
        fetchDrivers();
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedDriver(null);
    setShowModal(true);
  };

  useEffect(() => {
    fetchDrivers();
  }, [tenantId]);

  useEffect(() => {
    const openModal = () => handleCreate();
    window.addEventListener("drivers:open-modal", openModal);
    return () => window.removeEventListener("drivers:open-modal", openModal);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between items-end mb-10'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
            Liste de vos chauffeurs ({drivers.length})
          </p>
        </div>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='glass h-56 rounded-[2rem] border border-white/5 animate-pulse bg-white/5'
            />
          ))}
        </div>
      ) : drivers.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-12'>
          {drivers.map((d) => (
            <div
              key={d.id}
              className='glass p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all group relative overflow-hidden'>
              <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all' />

              <div className='flex justify-between items-start mb-6'>
                <div className='w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110'>
                  <Users className='w-8 h-8' />
                </div>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => handleEdit(d)}
                    className='p-2 text-slate-600 hover:text-white transition-colors'>
                    <Edit2 className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(d.id, `${d.first_name} ${d.last_name}`)
                    }
                    className='p-2 text-slate-600 hover:text-red-500 transition-colors'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1'>
                  {d.first_name}
                </h3>
                <h3 className='text-2xl font-black text-white/50 uppercase tracking-tighter leading-none'>
                  {d.last_name}
                </h3>
              </div>

              <div className='space-y-3 pt-6 border-t border-white/5'>
                <div className='flex items-center gap-3'>
                  <Phone className='w-3 h-3 text-indigo-500' />
                  <p className='text-[11px] font-bold text-slate-300 uppercase tracking-widest'>
                    {d.phone}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <CreditCard className='w-3 h-3 text-slate-500' />
                  <p className='text-[10px] font-medium text-slate-500 uppercase tracking-widest'>
                    Carte : {d.license_number}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-1 glass rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center p-20 text-center'>
          <div className='w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-700 mb-6'>
            <Users className='w-10 h-10' />
          </div>
          <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2'>
            Aucun chauffeur trouvé
          </h3>
          <p className='text-slate-500 text-sm mb-12 max-w-sm'>
            Vous n'avez pas encore enregistré de chauffeur pour votre flotte.
          </p>

          <div className='flex flex-col sm:flex-row gap-4'>
            <button
              onClick={handleInitialize}
              disabled={initLoading}
              className='flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-indigo-50 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-white/10 active:scale-95 disabled:opacity-50'>
              {initLoading ? (
                <span className='w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin' />
              ) : (
                <UserCheck className='w-4 h-4' />
              )}
              <span>M'ajouter comme chauffeur</span>
            </button>

            <button
              onClick={handleCreate}
              className='flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95'>
              <Plus className='w-4 h-4' />
              <span>Créer un autre chauffeur</span>
            </button>
          </div>
        </div>
      )}

      <DriverModal
        tenantId={tenantId}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchDrivers}
        driver={selectedDriver}
      />
    </div>
  );
};
