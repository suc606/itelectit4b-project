import React from 'react';
import { type User, UserRole } from '../types';

export interface UserCardProps {
  user: User;
  variant?: 'default' | 'compact';
  onSelect?: (user: User) => void;
  isSelected?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  variant = 'default',
  onSelect,
  isSelected = false,
}) => {
  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case UserRole.TUTOR:
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800/50';
      case UserRole.TUTEE:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/50';
      case UserRole.ADMIN:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800/50';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect && onSelect(user)}
        className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
          isSelected
            ? 'bg-indigo-50/80 border-indigo-500 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm'
            : 'bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full border uppercase tracking-wider ${getRoleBadgeColor(
            user.role
          )}`}
        >
          {user.role}
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect && onSelect(user)}
      className={`group relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 ${
        onSelect ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''
      } ${
        isSelected
          ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/20 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-md'
          : 'bg-white border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow">
              {getInitials(user.name)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {user.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border uppercase tracking-wider shadow-2xs ${getRoleBadgeColor(
              user.role
            )}`}
          >
            {user.role}
          </span>
        </div>

        {user.bio && (
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed italic">
            "{user.bio}"
          </p>
        )}
      </div>

      {user.subjectSpecialization && user.subjectSpecialization.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Specializations
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.subjectSpecialization.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-md dark:bg-slate-800 dark:text-slate-300 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
