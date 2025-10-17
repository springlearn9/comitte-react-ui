import React, { useState } from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';

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
      <div className="bg-white p-4 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">Create Comitte</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm">Comitte Name</label>
            <input className="border p-1 w-full" value={form.comitteName} onChange={(e) => update('comitteName', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm">Start Date</label>
            <input type="date" className="border p-1 w-full" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Full Amount</label>
              <input type="number" className="border p-1 w-full" value={form.fullAmount} onChange={(e) => update('fullAmount', Number(e.target.value || 0))} />
            </div>
            <div>
              <label className="block text-sm">Members Count</label>
              <input type="number" className="border p-1 w-full" value={form.membersCount} onChange={(e) => update('membersCount', Number(e.target.value || 0))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Full Share</label>
              <input type="number" className="border p-1 w-full" value={form.fullShare} onChange={(e) => update('fullShare', Number(e.target.value || 0))} />
            </div>
            <div>
              <label className="block text-sm">Due Days</label>
              <input type="number" className="border p-1 w-full" value={form.dueDateDays} onChange={(e) => update('dueDateDays', Number(e.target.value || 0))} />
            </div>
          </div>

          <div>
            <label className="block text-sm">Payment Days</label>
            <input type="number" className="border p-1 w-full" value={form.paymentDateDays} onChange={(e) => update('paymentDateDays', Number(e.target.value || 0))} />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={submit} disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateComitteModal;