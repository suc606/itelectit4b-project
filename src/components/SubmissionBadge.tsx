import React from 'react';
import { BookingStatus } from '../types';

export interface SubmissionBadgeProps {
  status?: string;
  grade?: number;
  notes?: string;
  title?: string;
  date?: string;
  variant?: 'default' | 'compact';
}

export const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({
  status,
  grade,
  notes,
  title,
  date,
  variant = 'default',
}) => {
  const getStatusColor = (st?: string) => {
    switch (st?.toLowerCase()) {
      case BookingStatus.CONFIRMED:
      case 'passed':
        return {
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/60',
          dot: 'bg-emerald-500',
        };
      case BookingStatus.REQUESTED:
      case 'pending':
        return {
          badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800/60',
          dot: 'bg-amber-500',
        };
      case BookingStatus.COMPLETED:
        return {
          badge: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800/60',
          dot: 'bg-blue-500',
        };
      case BookingStatus.CANCELLED:
      case 'failed':
        return {
          badge: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800/60',
          dot: 'bg-rose-500',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
          dot: 'bg-slate-400',
        };
    }
  };

  const statusStyle = getStatusColor(status);

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center space-x-2">
        {status && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyle.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusStyle.dot}`} />
            <span className="capitalize">{status}</span>
          </span>
        )}
        {grade !== undefined && (
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            Score: {grade}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          {title && (
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h4>
          )}
          {date && (
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
              {new Date(date).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {grade !== undefined && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs">
              Grade: {grade}%
            </span>
          )}

          {status && (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border shadow-2xs ${statusStyle.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusStyle.dot}`} />
              {status}
            </span>
          )}
        </div>
      </div>

      {notes && (
        <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 italic">
          "{notes}"
        </div>
      )}
    </div>
  );
};
