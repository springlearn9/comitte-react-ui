import React from 'react';
import { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactElement<LucideIcon>;
  right?: React.ReactNode;
};

const PageHeader: React.FC<Props> = ({ title, subtitle, icon, right }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
          {subtitle && <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>}
        </div>
      </div>

      {right && <div>{right}</div>}
    </div>
  );
};

export default PageHeader;