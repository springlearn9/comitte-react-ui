import React, { useEffect, useState } from 'react';
import { Comitte } from '../types';
import { ComitteMemberMap } from '../types';
import * as mapService from '../services/comitteMemberMapService';
import * as comitteService from '../services/comitteService';
import MemberSearchSelect, { MemberOption } from './MemberSearchSelect';
import { UserPlus, X, Check } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';

type Props = {
  comitte: Comitte;
  onClose: () => void;
  onAttached: () => void;
};

type MemberEntry = { memberId: number | null; shareCount: number; _meta?: MemberOption | null };

const AttachMembersModal: React.FC<Props> = ({ comitte, onClose, onAttached }) => {
  const [entries, setEntries] = useState<MemberEntry[]>([]);
  const membersCountLimit = comitte.membersCount ?? undefined;
  const fullShareLimit = comitte.fullShare ?? undefined;

  useEffect(() => {
    setEntries([{ memberId: null, shareCount: 1, _meta: null }]);
  }, [comitte.comitteId]);

  const addRow = () => {
    if (membersCountLimit !== undefined && entries.length >= membersCountLimit) {
      alert(`Max ${membersCountLimit} member slots allowed`);
      return;
    }
    setEntries((s) => [...s, { memberId: null, shareCount: 1, _meta: null }]);
  };

  const updateRow = (idx: number, v: Partial<MemberEntry>) => {
    setEntries((s) => {
      const copy = [...s];
      copy[idx] = { ...copy[idx], ...v };
      return copy;
    });
  };

  const removeRow = (idx: number) => {
    setEntries((s) => s.filter((_, i) => i !== idx));
  };

  const totalShare = entries.reduce((acc, e) => acc + (Number(e.shareCount) || 0), 0);
  const shareExceeded = fullShareLimit !== undefined && totalShare > fullShareLimit;
  const anyMissingMember = entries.some((e) => !e.memberId);

  const submit = async () => {
    if (!entries.length) return alert('Add at least one member');
    if (anyMissingMember) return alert('Select member for every row');
    if (shareExceeded) return alert(`Total share (${totalShare}) exceeds comitte full share (${fullShareLimit})`);

    try {
      const payloads: ComitteMemberMap[] = entries.map((e) => ({ comitteId: comitte.comitteId, memberId: e.memberId!, shareCount: e.shareCount }));
      await Promise.all(payloads.map((p) => mapService.create(p)));
      alert('Members attached');
      onAttached();
    } catch (err) {
      console.error(err);
      alert('Attach failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-3xl shadow-lg">
        <PageHeader
          title={`Attach members — ${comitte.comitteName}`}
          subtitle="Select members and assign shares. Total share validated against comitte full share."
          icon={<UserPlus size={20} />}
          right={<button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X size={18} /></button>}
        />

        <div className="space-y-3">
          {entries.map((e, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-1">
                <MemberSearchSelect
                  value={e.memberId ?? null}
                  onChange={(memberId, meta) => updateRow(idx, { memberId: memberId ?? null, _meta: meta ?? null })}
                />
              </div>

              <div className="w-36">
                <label className="block text-xs text-slate-600">Share</label>
                <input
                  type="number"
                  min={1}
                  className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={e.shareCount}
                  onChange={(ev) => updateRow(idx, { shareCount: Number(ev.target.value || 0) })}
                />
              </div>

              <div className="pt-6">
                <button onClick={() => removeRow(idx)} className="text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <div>Rows: {entries.length}{membersCountLimit ? ` / ${membersCountLimit}` : ''}</div>
            <div>Total share: <span className="font-medium">{totalShare}</span>{fullShareLimit ? ` / ${fullShareLimit}` : ''}</div>
          </div>
          {shareExceeded && <div className="text-red-600 mt-1">Total share exceeds comitte full share</div>}
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={addRow} className="px-3 py-1 border rounded flex items-center gap-2"><UserPlus size={16}/> Add</button>
          <button onClick={submit} disabled={anyMissingMember || shareExceeded} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <Check size={16} /> Attach
          </button>
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AttachMembersModal;