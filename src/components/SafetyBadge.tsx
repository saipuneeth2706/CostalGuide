import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { SafetyStatus } from '../types';

interface SafetyBadgeProps {
  status: SafetyStatus;
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ status }) => {
  if (status === 'safe') {
    return (
      <div className="safety-badge-green">
        <ShieldCheck size={16} className="mr-1" />
        🟢 Safe
      </div>
    );
  } else if (status === 'caution') {
    return (
      <div className="safety-badge-yellow">
        <AlertTriangle size={16} className="mr-1" />
        🟡 Caution
      </div>
    );
  } else {
    return (
      <div className="safety-badge-red">
        <ShieldAlert size={16} className="mr-1" />
        🔴 Unsafe
      </div>
    );
  }
};

export default SafetyBadge;