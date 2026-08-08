import React from 'react';
import { type TutoringSession } from '../types';

export interface CourseCardProps {
  session: TutoringSession;
  variant?: 'default' | 'compact';
  isSelected?: boolean;
  onSelect?: (session: TutoringSession) => void;
  bookedCount?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  session,
  variant = 'default',
  isSelected = false,
  onSelect,
  bookedCount = 0,
}) => {
  const spotsRemaining = Math.max(0, session.maxTutees - bookedCount);
  const isFull = spotsRemaining === 0;

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect && onSelect(session)}
        className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
          isSelected
            ? 'bg-sky-50 border-sky-500 dark:bg-sky-950/40 dark:border-sky-500 shadow-sm'
            : 'bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <span className="px-2 py-1 text-xs font-bold rounded bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 dark:border dark:border-sky-800/60 flex-shrink-0">
            {session.courseCode}
          </span>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {session.topic}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{session.schedule}</p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0 ${
            isFull
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
          }`}
        >
          {isFull ? 'Full' : `${spotsRemaining} spots`}
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect && onSelect(session)}
      className={`group relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
        isSelected
          ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-500/20 dark:bg-sky-950/40 dark:border-sky-500 shadow-md'
          : 'bg-white border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 dark:border dark:border-sky-800/60 uppercase tracking-wider">
            {session.courseCode}
          </span>

          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              isFull
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isFull ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'
              }`}
            ></span>
            {isFull ? 'Session Full' : `${spotsRemaining} spots left`}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-2">
          {session.topic}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {session.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{session.schedule}</span>
        </span>
        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
          ID: {session.id}
        </span>
      </div>
    </div>
  );
};
