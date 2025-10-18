import React, { useEffect, useState } from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';
import { Eye, X } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';

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
      <div className="bg-white p-5 rounded-lg w-full max-w-2xl shadow-lg">
        <PageHeader
          title="Comitte details"
          subtitle="Overview of comitte configuration and metadata"
          icon={<Eye size={20} />}
          right={<button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X size={18} /></button>}
        />

        {loading && <div>Loading...</div>}

        {!loading && comitte && (
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="space-y-2">
              <div className="font-medium text-slate-800">{comitte.comitteName}</div>
              <div><strong>Owner ID:</strong> <span className="text-slate-600">{comitte.ownerId}</span></div>
              <div><strong>Start Date:</strong> <span className="text-slate-600">{comitte.startDate ?? '-'}</span></div>
              <div><strong>Members Count:</strong> <span className="text-slate-600">{comitte.membersCount ?? '-'}</span></div>
            </div>

            <div className="space-y-2">
              <div><strong>Full Amount:</strong> <span className="text-slate-600">{comitte.fullAmount ?? '-'}</span></div>
              <div><strong>Full Share:</strong> <span className="text-slate-600">{comitte.fullShare ?? '-'}</span></div>
              <div><strong>Due / Payment Days:</strong> <span className="text-slate-600">{comitte.dueDateDays ?? '-'} / {comitte.paymentDateDays ?? '-'}</span></div>
              <div><strong>Created:</strong> <span className="text-slate-600">{comitte.createdTimestamp ?? '-'}</span></div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ComitteViewModal;