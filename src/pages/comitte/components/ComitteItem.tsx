import React from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, UserPlus } from 'lucide-react';

type Props = {
  comitte: Comitte;
  onRefresh: () => void;
  showOwnerActions?: boolean;
  onAttach?: (c: Comitte) => void;
  // optional modal handlers
  onView?: (c: Comitte) => void;
  onEdit?: (c: Comitte) => void;
};

const ComitteItem: React.FC<Props> = ({ comitte, onRefresh, showOwnerActions = false, onAttach, onView, onEdit }) => {
  const handleDelete = async () => {
    if (!confirm('Delete this comitte?')) return;
    try {
      await comitteService.deleteComitte(comitte.comitteId);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="border p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition">
      <div>
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold text-slate-900">{comitte.comitteName}</div>
          <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{comitte.membersCount ?? 0} members</div>
        </div>
        <div className="text-sm text-slate-500 mt-1">Full amount <span className="font-medium text-slate-700">{comitte.fullAmount ?? '-'}</span></div>
      </div>

      <div className="flex gap-2 items-center">
        {onView ? (
          <button onClick={() => onView(comitte)} className="text-indigo-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50">
            <Eye size={14} /> View
          </button>
        ) : (
          <Link to={`/comittes/${comitte.comitteId}`} className="text-indigo-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50">
            <Eye size={14} /> View
          </Link>
        )}

        {onEdit ? (
          <button onClick={() => onEdit(comitte)} className="text-slate-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-50">
            <Edit2 size={14} /> Edit
          </button>
        ) : (
          <Link to={`/comittes/${comitte.comitteId}/edit`} className="text-slate-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-50">
            <Edit2 size={14} /> Edit
          </Link>
        )}

        {showOwnerActions && <button onClick={() => onAttach?.(comitte)} className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-green-700"><UserPlus size={14}/>Attach</button>}
        {showOwnerActions && <button onClick={handleDelete} className="text-red-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50"><Trash2 size={14}/>Delete</button>}
      </div>
    </div>
  );
};

export default ComitteItem;