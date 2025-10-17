import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ComitteList from './components/ComitteList';
import { Comitte } from './types';
import * as comitteService from './services/comitteService';
import AttachMembersModal from './components/AttachMembersModal';
import CreateComitteModal from './components/CreateComitteModal';

const MemberDashboard: React.FC = () => {
  const { user } = useAuth();
  const memberId: number | undefined = (user as any)?.memberId ?? (user as any)?.id ?? (user as any)?.userId;

  const [myComittes, setMyComittes] = useState<Comitte[]>([]);
  const [ownedComittes, setOwnedComittes] = useState<Comitte[]>([]);
  const [tab, setTab] = useState<'my' | 'owned'>('my');
  const [attachComitte, setAttachComitte] = useState<Comitte | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    if (!memberId) return;
    try {
      const my = await comitteService.getMemberComittes(memberId);
      setMyComittes(my);
      const owned = await comitteService.getOwnerComittes(memberId);
      setOwnedComittes(owned);
    } catch (err) {
      console.error('Failed loading comittes', err);
      alert('Failed to load comittes');
    }
  };

  useEffect(() => {
    load();
  }, [memberId]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Comittes</h2>
        <div>
          <button onClick={() => setShowCreate(true)} className="bg-green-600 text-white px-3 py-1 rounded">Create Comitte</button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('my')} className={tab === 'my' ? 'font-bold' : ''}>My Comittes</button>
        <button onClick={() => setTab('owned')} className={tab === 'owned' ? 'font-bold' : ''}>Owned Comittes</button>
      </div>

      {tab === 'my' && (
        <ComitteList
          comittes={myComittes}
          onRefresh={load}
          showOwnerActions={false}
          onAttach={() => {}}
        />
      )}

      {tab === 'owned' && (
        <ComitteList
          comittes={ownedComittes}
          onRefresh={load}
          showOwnerActions
          onAttach={(c) => setAttachComitte(c)}
        />
      )}

      {attachComitte && (
        <AttachMembersModal
          comitte={attachComitte}
          onClose={() => setAttachComitte(null)}
          onAttached={() => {
            setAttachComitte(null);
            load();
          }}
        />
      )}

      {showCreate && (
        <CreateComitteModal
          ownerId={memberId}
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            load();
          }}
        />
      )}
    </div>
  );
};

export default MemberDashboard;