import React from 'react';
import { Comitte } from '../types';
import ComitteItem from './ComitteItem';

type Props = {
  comittes: Comitte[];
  onRefresh: () => void;
  showOwnerActions?: boolean;
  onAttach?: (c: Comitte) => void;
};

const ComitteList: React.FC<Props> = ({ comittes, onRefresh, showOwnerActions = false, onAttach }) => {
  if (!comittes.length) return <div>No comittes found</div>;

  return (
    <div className="space-y-3">
      {comittes.map((c) => (
        <ComitteItem key={c.comitteId} comitte={c} onRefresh={onRefresh} showOwnerActions={showOwnerActions} onAttach={onAttach} />
      ))}
    </div>
  );
};

export default ComitteList;