import React, { useEffect, useState } from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';
import { Edit2, Check, X } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';

type Props = {
  comitteId: number;
  onClose: () => void;
  onSaved: () => void;
};

const ComitteEditModal: React.FC<Props> = ({ comitteId, onClose, onSaved }) => {
  const [form, setForm] = useState<Partial<Comitte>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const c = await comitteService.getComitte(comitteId);
        setForm(c);
      } catch (err) {
        console.error(err);
        alert('Failed to load comitte');
        onClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [comitteId, onClose]);

  const updateField = (k: keyof Comitte, v: any) => setForm((s) => ({ ...(s as any), [k]: v }));

  const submit = async () => {
    setSaving(true);
    try {
      await comitteService.updateComitte(comitteId, {
        ownerId: form.ownerId,
        comitteName: form.comitteName,
        startDate: form.startDate,
        fullAmount: form.fullAmount,
        membersCount: form.membersCount,
        fullShare: form.fullShare,
        dueDateDays: form.dueDateDays,
        paymentDateDays: form.paymentDateDays,
      });
      alert('Updated');
      onSaved();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-2xl shadow-lg">
        <PageHeader
          title="Edit Comitte"
          subtitle="Update comitte configuration"
          icon={<Edit2 size={20} />}
          right={<button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X size={18} /></button>}
        />

        {loading && <div>Loading...</div>}

        {!loading && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Comitte Name</label>
              <input className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.comitteName ?? ''} onChange={(e) => updateField('comitteName', e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Start Date</label>
              <input type="date" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.startDate ?? ''} onChange={(e) => updateField('startDate', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Amount</label>
                <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.fullAmount ?? ''} onChange={(e) => updateField('fullAmount', Number(e.target.value || 0))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Members Count</label>
                <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.membersCount ?? ''} onChange={(e) => updateField('membersCount', Number(e.target.value || 0))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Share</label>
                <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.fullShare ?? ''} onChange={(e) => updateField('fullShare', Number(e.target.value || 0))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Due Days</label>
                <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.dueDateDays ?? ''} onChange={(e) => updateField('dueDateDays', Number(e.target.value || 0))} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Payment Days</label>
              <input type="number" className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={form.paymentDateDays ?? ''} onChange={(e) => updateField('paymentDateDays', Number(e.target.value || 0))} />
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={submit} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <Check size={16} /> Save
          </button>
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ComitteEditModal;