import React, { useEffect, useState } from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';

type Props = {
  comitteId: number;
  onClose: () => void;
};

const ComitteViewModal: React.FC<Props> = ({ comitteId, onClose }) => {
  const [comitte, setComitte] = useState<Comitte | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const c = await comitteService.getComitte(comitteId);
        setComitte(c);
      } catch (err) {
        console.error(err);
        alert('Failed to load comitte');
        onClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [comitteId, onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">Comitte details</h3>
          <button onClick={onClose}>Close</button>
        </div>

        {loading && <div>Loading...</div>}

        {!loading && comitte && (
          <div className="space-y-2">
            <div><strong>Name:</strong> {comitte.comitteName}</div>
            <div><strong>Owner ID:</strong> {comitte.ownerId}</div>
            <div><strong>Start Date:</strong> {comitte.startDate ?? '-'}</div>
            <div><strong>Members Count:</strong> {comitte.membersCount ?? '-'}</div>
            <div><strong>Full Amount:</strong> {comitte.fullAmount ?? '-'}</div>
            <div><strong>Full Share:</strong> {comitte.fullShare ?? '-'}</div>
            <div><strong>Due Days:</strong> {comitte.dueDateDays ?? '-'}</div>
            <div><strong>Payment Days:</strong> {comitte.paymentDateDays ?? '-'}</div>
            <div><strong>Created:</strong> {comitte.createdTimestamp ?? '-'}</div>
            <div><strong>Updated:</strong> {comitte.updatedTimestamp ?? '-'}</div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ComitteViewModal;