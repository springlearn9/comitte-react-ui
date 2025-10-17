import React, { useEffect, useMemo, useState } from 'react';
import { Comitte, ComitteMemberMap } from '../types';
import * as mapService from '../services/comitteMemberMapService';
import MemberSearchSelect, { MemberOption } from './MemberSearchSelect';

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

  const totalShare = useMemo(() => entries.reduce((acc, e) => acc + (Number(e.shareCount) || 0), 0), [entries]);
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
      <div className="bg-white p-4 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">Attach members to {comitte.comitteName}</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="space-y-2">
          {entries.map((e, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <div className="flex-1">
                <MemberSearchSelect
                  value={e.memberId ?? null}
                  onChange={(memberId, meta) => updateRow(idx, { memberId: memberId ?? null, _meta: meta ?? null })}
                />
              </div>

              <input
                type="number"
                min={1}
                className="border p-1 w-28"
                value={e.shareCount}
                onChange={(ev) => updateRow(idx, { shareCount: Number(ev.target.value || 0) })}
              />

              <button onClick={() => removeRow(idx)} className="text-red-600">Remove</button>
            </div>
          ))}
        </div>

        <div className="mt-3 text-sm">
          <div>Rows: {entries.length}{membersCountLimit ? ` / ${membersCountLimit}` : ''}</div>
          <div>Total share: {totalShare}{fullShareLimit ? ` / ${fullShareLimit}` : ''}</div>
          {shareExceeded && <div className="text-red-600">Total share exceeds comitte full share</div>}
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={addRow} className="px-3 py-1 border rounded">Add row</button>
          <button onClick={submit} disabled={anyMissingMember || shareExceeded} className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50">Attach</button>
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AttachMembersModal;