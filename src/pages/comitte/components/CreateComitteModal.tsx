import React, { useState } from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';
import { PlusCircle, X } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';

type Props = {
  ownerId?: number;
  onClose: () => void;
  onCreated: (created?: Comitte) => void;
};

const CreateComitteModal: React.FC<Props> = ({ ownerId, onClose, onCreated }) => {
  const [form, setForm] = useState({
    comitteName: '',
    startDate: '',
    fullAmount: 0,
    membersCount: 0,
    fullShare: 0,
    dueDateDays: 0,
    paymentDateDays: 0,
  });
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: any) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async () => {
    if (!form.comitteName?.trim()) {
      return alert('Comitte name is required');
    }
    if (!ownerId) return alert('Owner not available');

    setLoading(true);
    try {
      const payload: Partial<Comitte> = {
        ownerId,
        comitteName: form.comitteName,
        startDate: form.startDate || undefined,
        fullAmount: form.fullAmount || undefined,
        membersCount: form.membersCount || undefined,
        fullShare: form.fullShare || undefined,
        dueDateDays: form.dueDateDays || undefined,
        paymentDateDays: form.paymentDateDays || undefined,
      };

      const created = await comitteService.createComitte(payload);
      alert('Comitte created');
      onCreated(created);
    } catch (err) {
      console.error(err);
      alert('Create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-2xl shadow-lg">
        <PageHeader
          title="Create Comitte"
          subtitle="Define basic details for your new comitte"
          icon={<PlusCircle size={20} />}
          right={<button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X size={18} /></button>}
        />

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Comitte Name</label>
            <input className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.comitteName} onChange={(e) => update('comitteName', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Start Date</label>
            <input type="date" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Amount</label>
              <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.fullAmount} onChange={(e) => update('fullAmount', Number(e.target.value || 0))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Members Count</label>
              <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.membersCount} onChange={(e) => update('membersCount', Number(e.target.value || 0))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Share</label>
              <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.fullShare} onChange={(e) => update('fullShare', Number(e.target.value || 0))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Due Days</label>
              <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.dueDateDays} onChange={(e) => update('dueDateDays', Number(e.target.value || 0))} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Payment Days</label>
            <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.paymentDateDays} onChange={(e) => update('paymentDateDays', Number(e.target.value || 0))} />
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={submit} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <PlusCircle size={16} /> Create
          </button>
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateComitteModal;