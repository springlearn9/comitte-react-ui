import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as comitteService from './services/comitteService';
import { Comitte } from './types';

const ComitteView: React.FC = () => {
  const { id } = useParams();
  const [comitte, setComitte] = useState<Comitte | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const c = await comitteService.getComitte(Number(id));
        setComitte(c);
      } catch (err) {
        console.error('Failed loading comitte', err);
        alert('Failed to load comitte');
      }
    })();
  }, [id]);

  if (!comitte) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">{comitte.comitteName}</h2>
        <div className="flex gap-2">
          <Link to={`/comittes/${comitte.comitteId}/edit`} className="text-blue-600">Edit</Link>
          <Link to="/comittes" className="text-gray-600">Back</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div><strong>Owner ID:</strong> {comitte.ownerId}</div>
          <div><strong>Start Date:</strong> {comitte.startDate ?? '-'}</div>
          <div><strong>Members Count:</strong> {comitte.membersCount ?? '-'}</div>
        </div>
        <div>
          <div><strong>Full Amount:</strong> {comitte.fullAmount ?? '-'}</div>
          <div><strong>Full Share:</strong> {comitte.fullShare ?? '-'}</div>
          <div><strong>Due / Payment Days:</strong> {comitte.dueDateDays ?? '-'} / {comitte.paymentDateDays ?? '-'}</div>
        </div>
      </div>
    </div>
  );
};

export default ComitteView;