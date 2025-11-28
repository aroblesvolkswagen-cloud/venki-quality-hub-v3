import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { UserInput } from '../types';

type BrewFormProps = {
  onSubmit: (input: UserInput) => Promise<void>;
  loading: boolean;
};

const BrewForm: React.FC<BrewFormProps> = ({ onSubmit, loading }) => {
  const [form, setForm] = useState<UserInput>({ style: '', profile: '', reference: '' });

  const handleChange = (field: keyof UserInput, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-slate-900 border border-amber-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur"
    >
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="text-amber-400" />
        <div>
          <p className="text-sm uppercase tracking-widest text-amber-300">Diseña la receta</p>
          <h2 className="text-2xl font-bold text-white">Maestro Cervecero AI</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-slate-200">Estilo</label>
          <input
            required
            value={form.style}
            onChange={e => handleChange('style', e.target.value)}
            placeholder="West Coast IPA, Czech Pilsner, etc"
            className="w-full mt-1 rounded-lg bg-slate-800/70 border border-slate-700 p-3 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Perfil buscado</label>
          <input
            required
            value={form.profile}
            onChange={e => handleChange('profile', e.target.value)}
            placeholder="Resinoso, cítrico, crisp"
            className="w-full mt-1 rounded-lg bg-slate-800/70 border border-slate-700 p-3 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Referencia sensorial</label>
          <input
            required
            value={form.reference}
            onChange={e => handleChange('reference', e.target.value)}
            placeholder="Sierra Nevada, Pilsner Urquell, etc"
            className="w-full mt-1 rounded-lg bg-slate-800/70 border border-slate-700 p-3 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-amber-500 text-slate-900 font-semibold shadow-lg hover:bg-amber-400 transition disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Generar recetas
        </button>
        {loading && <p className="text-sm text-amber-200">Calculando maltas, lúpulos y estrategias...</p>}
      </div>
    </form>
  );
};

export default BrewForm;
