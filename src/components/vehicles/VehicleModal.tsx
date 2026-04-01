// src/components/vehicles/VehicleModal.tsx
import { createVehicle } from '@/services/vehicles';
import { Car, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

interface VehicleModalProps {
  tenantId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  tenantId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const vehicleData = {
      tenant_id: tenantId,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      plate_number: formData.get('plate_number') as string,
      category: formData.get('category') as string,
      capacity: parseInt(formData.get('capacity') as string) || 4,
      status: 'active',
    };

    try {
      await createVehicle(vehicleData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/80 transition-all'>
      <div className='relative glass max-w-lg w-full rounded-[2.5rem] border border-white/10 shadow-2xl p-8 animate-in fade-in zoom-in duration-300'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-slate-500 hover:text-white transition-colors'>
          <X className='w-6 h-6' />
        </button>

        <div className='flex items-center gap-4 mb-10'>
          <div className='w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 shadow-lg shadow-indigo-500/10'>
            <Car className='w-6 h-6' />
          </div>
          <div>
            <h3 className='text-2xl font-black uppercase text-white tracking-tighter leading-none mb-1'>
              Nouveau véhicule
            </h3>
            <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
              Enregistrer un véhicule dans la flotte
            </p>
          </div>
        </div>

        {error && (
          <div className='mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {' '}
                Marque{' '}
              </label>
              <input
                name='brand'
                required
                placeholder='Mercedes, Tesla, etc.'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {' '}
                Modèle{' '}
              </label>
              <input
                name='model'
                required
                placeholder='Classe E, Model S, etc.'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
              {' '}
              Plaque d'immatriculation{' '}
            </label>
            <input
              name='plate_number'
              required
              placeholder='AA-123-BB'
              className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 uppercase'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {' '}
                Catégorie{' '}
              </label>
              <div className='relative group'>
                <select
                  name='category'
                  required
                  className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer'>
                  <option value='berline' className='bg-[#050505] text-white'>
                    Berline
                  </option>
                  <option value='van' className='bg-[#050505] text-white'>
                    Van
                  </option>
                  <option value='suv' className='bg-[#050505] text-white'>
                    SUV
                  </option>
                  <option value='minibus' className='bg-[#050505] text-white'>
                    Minibus
                  </option>
                  <option value='luxury' className='bg-[#050505] text-white'>
                    Luxe
                  </option>
                </select>
                <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-white transition-colors'>
                  <Plus className='w-4 h-4 rotate-45 transform' />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {' '}
                Passagers{' '}
              </label>
              <input
                name='capacity'
                type='number'
                required
                defaultValue='4'
                min='1'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-6 flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]'>
            {loading ? (
              <span className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin' />
            ) : (
              <>
                <Plus className='w-4 h-4' />
                <span>Créer le véhicule</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
