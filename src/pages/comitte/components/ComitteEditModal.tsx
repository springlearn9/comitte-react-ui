import React, { useEffect, useState } from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';

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
      <div className="bg-white p-4 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">Edit Comitte</h3>
          <button onClick={onClose}>Close</button>
        </div>

        {loading && <div>Loading...</div>}

        {!loading && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm">Comitte Name</label>
              <input className="border p-1 w-full" value={form.comitteName ?? ''} onChange={(e) => updateField('comitteName', e.target.value)} />
            </div>

            <div>
              <label className="block text-sm">Start Date</label>
              <input type="date" className="border p-1 w-full" value={form.startDate ?? ''} onChange={(e) => updateField('startDate', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm">Full Amount</label>
                <input type="number" className="border p-1 w-full" value={form.fullAmount ?? ''} onChange={(e) => updateField('fullAmount', Number(e.target.value || 0))} />
              </div>
              <div>
                <label className="block text-sm">Members Count</label>
                <input type="number" className="border p-1 w-full" value={form.membersCount ?? ''} onChange={(e) => updateField('membersCount', Number(e.target.value || 0))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm">Full Share</label>
                <input type="number" className="border p-1 w-full" value={form.fullShare ?? ''} onChange={(e) => updateField('fullShare', Number(e.target.value || 0))} />
              </div>
              <div>
                <label className="block text-sm">Due Days</label>
                <input type="number" className="border p-1 w-full" value={form.dueDateDays ?? ''} onChange={(e) => updateField('dueDateDays', Number(e.target.value || 0))} />
              </div>
            </div>

            <div>
              <label className="block text-sm">Payment Days</label>
              <input type="number" className="border p-1 w-full" value={form.paymentDateDays ?? ''} onChange={(e) => updateField('paymentDateDays', Number(e.target.value || 0))} />
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={submit} disabled={saving} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ComitteEditModal;