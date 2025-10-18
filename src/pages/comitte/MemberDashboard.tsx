import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ComitteList from './components/ComitteList';
import { Comitte } from './types';
import * as comitteService from './services/comitteService';
import AttachMembersModal from './components/AttachMembersModal';
import CreateComitteModal from './components/CreateComitteModal';
import ComitteViewModal from './components/ComitteViewModal';
import ComitteEditModal from './components/ComitteEditModal';
import PageHeader from '../../components/ui/PageHeader';
import { Users } from 'lucide-react';

const MemberDashboard: React.FC = () => {
  const { user } = useAuth();
  const memberId: number | undefined = (user as any)?.memberId ?? (user as any)?.id ?? (user as any)?.userId;

  const [myComittes, setMyComittes] = useState<Comitte[]>([]);
  const [ownedComittes, setOwnedComittes] = useState<Comitte[]>([]);
  const [tab, setTab] = useState<'my' | 'owned'>('my');
  const [attachComitte, setAttachComitte] = useState<Comitte | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // new modal states
  const [viewComitte, setViewComitte] = useState<Comitte | null>(null);
  const [editComitte, setEditComitte] = useState<Comitte | null>(null);

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
      <PageHeader
        title="Comittes"
        subtitle="Manage and participate in your comittes"
        icon={<Users size={20} />}
        right={<button onClick={() => setShowCreate(true)} className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"><Users size={16}/> New</button>}
      />

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('my')} className={`px-3 py-1 rounded ${tab === 'my' ? 'bg-indigo-600 text-white' : 'text-slate-600 border'}`}>My Comittes</button>
          <button onClick={() => setTab('owned')} className={`px-3 py-1 rounded ${tab === 'owned' ? 'bg-indigo-600 text-white' : 'text-slate-600 border'}`}>Owned Comittes</button>
        </div>

        {tab === 'my' && (
          <ComitteList
            comittes={myComittes}
            onRefresh={load}
            showOwnerActions={false}
            onAttach={() => {}}
            onView={(c: Comitte) => setViewComitte(c)}
            onEdit={(c: Comitte) => setEditComitte(c)}
          />
        )}

        {tab === 'owned' && (
          <ComitteList
            comittes={ownedComittes}
            onRefresh={load}
            showOwnerActions
            onAttach={(c) => setAttachComitte(c)}
            onView={(c: Comitte) => setViewComitte(c)}
            onEdit={(c: Comitte) => setEditComitte(c)}
          />
        )}
      </div>

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

      {viewComitte && (
        <ComitteViewModal
          comitteId={viewComitte.comitteId}
          onClose={() => setViewComitte(null)}
        />
      )}

      {editComitte && (
        <ComitteEditModal
          comitteId={editComitte.comitteId}
          onClose={() => setEditComitte(null)}
          onSaved={() => {
            setEditComitte(null);
            load();
          }}
        />
      )}
    </div>
  );
};

export default MemberDashboard;