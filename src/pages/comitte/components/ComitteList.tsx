import React from 'react';
import ComitteItem from './ComitteItem';
import { Comitte } from '../types';

type Props = {
  comittes: Comitte[];
  onRefresh: () => void;
  showOwnerActions?: boolean;
  onAttach?: (c: Comitte) => void;
  onView?: (c: Comitte) => void;
  onEdit?: (c: Comitte) => void;
};

const ComitteList: React.FC<Props> = ({ comittes, onRefresh, showOwnerActions = false, onAttach, onView, onEdit }) => {
  if (!comittes || comittes.length === 0) return <div>No comittes found</div>;

  return (
    <div className="space-y-3">
      {comittes.map((c) => (
        <ComitteItem
          key={c.comitteId}
          comitte={c}
          onRefresh={onRefresh}
          showOwnerActions={showOwnerActions}
          onAttach={onAttach}
          onView={onView}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ComitteList;