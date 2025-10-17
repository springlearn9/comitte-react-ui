import React, { useEffect, useState } from 'react';
import axios from '../../../api/axiosInstance';
import debounce from 'lodash.debounce';

export type MemberOption = {
  memberId: number;
  username?: string;
  name?: string;
  mobile?: string;
};

type Props = {
  value?: number | null;
  onChange: (memberId: number | null, opt?: MemberOption | null) => void;
  placeholder?: string;
};

const MemberSearchSelect: React.FC<Props> = ({ value = null, onChange, placeholder = 'Search member by name / mobile / username' }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<MemberOption[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async (q: string) => {
    if (!q) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get<MemberOption[]>('/api/members/search', { params: { name: q, mobile: q, username: q } });
      setOptions(res.data || []);
    } catch (err) {
      console.error('Member search failed', err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  // debounce search
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = React.useCallback(debounce((q: string) => fetchMembers(q), 400), []);

  useEffect(() => {
    debounced(query.trim());
  }, [query, debounced]);

  const selected = options.find((o) => o.memberId === value) ?? null;

  return (
    <div className="member-search-select">
      <input
        className="border p-1"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-1">
        {loading && <div className="text-sm text-gray-500">Searching...</div>}
        {!loading && options.length > 0 && (
          <div className="bg-white border rounded max-h-40 overflow-auto">
            {options.map((o) => (
              <div
                key={o.memberId}
                onClick={() => {
                  onChange(o.memberId, o);
                  setQuery(`${o.username ?? o.name ?? o.mobile ?? o.memberId}`);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium">{o.username ?? o.name}</div>
                <div className="text-xs text-gray-600">{o.name ? `${o.name} • ` : ''}{o.mobile}</div>
              </div>
            ))}
          </div>
        )}
        {!loading && !options.length && query && <div className="text-sm text-gray-500">No members found</div>}
      </div>

      {selected && (
        <div className="mt-1 text-sm text-gray-700">
          Selected: {selected.username ?? selected.name ?? selected.mobile}
          <button className="ml-2 text-red-600" onClick={() => { onChange(null, null); setQuery(''); }}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default MemberSearchSelect;