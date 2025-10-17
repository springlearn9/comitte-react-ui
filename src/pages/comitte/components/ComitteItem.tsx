import React from 'react';
import { Comitte } from '../types';
import * as comitteService from '../services/comitteService';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    <div className="border p-3 rounded flex justify-between">
      <div>
        <div className="font-semibold">{comitte.comitteName}</div>
        <div className="text-sm text-gray-600">Members: {comitte.membersCount} • Full Amount: {comitte.fullAmount}</div>
      </div>
      <div className="flex gap-2 items-center">
        {onView ? (
          <button onClick={() => onView(comitte)} className="text-blue-600">View</button>
        ) : (
          <Link to={`/comittes/${comitte.comitteId}`} className="text-blue-600">View</Link>
        )}

        {onEdit ? (
          <button onClick={() => onEdit(comitte)} className="text-blue-600">Update</button>
        ) : (
          <Link to={`/comittes/${comitte.comitteId}/edit`} className="text-blue-600">Update</Link>
        )}

        {showOwnerActions && <button onClick={() => onAttach?.(comitte)} className="btn">Attach</button>}
        {showOwnerActions && <button onClick={handleDelete} className="text-red-600">Delete</button>}
      </div>
    </div>
  );
};

export default ComitteItem;