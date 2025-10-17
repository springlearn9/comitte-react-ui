import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Comitte } from './types';
import * as comitteService from './services/comitteService';

const ComitteEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Comitte>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const c = await comitteService.getComitte(Number(id));
        setForm(c);
      } catch (err) {
        console.error(err);
        alert('Failed to load comitte');
      }
    })();
  }, [id]);

  const updateField = (k: keyof Comitte, v: any) => setForm((s) => ({ ...(s as any), [k]: v }));

  const submit = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const payload = {
        ownerId: form.ownerId,
        comitteName: form.comitteName,
        startDate: form.startDate,
        fullAmount: form.fullAmount,
        membersCount: form.membersCount,
        fullShare: form.fullShare,
        dueDateDays: form.dueDateDays,
        paymentDateDays: form.paymentDateDays,
      };
      await comitteService.updateComitte(Number(id), payload);
      alert('Updated');
      navigate(`/comittes/${id}`);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-2xl mb-4">Edit Comitte</h2>

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

        <div className="flex gap-2 mt-4">
          <button onClick={submit} disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
          <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ComitteEdit;