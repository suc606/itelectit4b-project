import React, { useState, useEffect, useRef } from 'react';
import {
  type TutoringSession,
  type Booking,
  type User,
  type Submission,
  BookingStatus,
  UserRole,
  type CreateBookingDto,
} from './types';
import { useToggle, usePrevious } from './hooks/useCustomHooks';
import { UserCard } from './components/UserCard';
import { CourseCard } from './components/CourseCard';
import { SubmissionBadge } from './components/SubmissionBadge';
import './App.css';

const MOCK_USERS: User[] = [
  {
    id: 101,
    name: 'Marcus Rodillo',
    email: 'marcus@dlsl.edu.ph',
    role: UserRole.TUTOR,
    subjectSpecialization: ['TypeScript', 'React', 'Tailwind CSS'],
    bio: 'Senior CS student specializing in modern web architecture & UI engineering.',
  },
  {
    id: 102,
    name: 'Sophia Chen',
    email: 'sophia.c@dlsl.edu.ph',
    role: UserRole.TUTOR,
    subjectSpecialization: ['Data Structures', 'Algorithms', 'C++'],
    bio: 'Competitive programmer and algorithm mentor for lower-year students.',
  },
  {
    id: 103,
    name: 'Alex Santos',
    email: 'alex.s@dlsl.edu.ph',
    role: UserRole.TUTEE,
    subjectSpecialization: ['Web Basics', 'HTML/CSS'],
    bio: '2nd year IT student aiming to master frontend frameworks.',
  },
  {
    id: 104,
    name: 'Dr. Robert Vance',
    email: 'rvance@dlsl.edu.ph',
    role: UserRole.ADMIN,
    bio: 'Academic Program Chair & Peer Tutoring Coordinator.',
  },
];

const MOCK_TUTORING_SESSIONS: TutoringSession[] = [
  {
    id: 'SESS-001',
    tutorId: 101,
    courseCode: 'ITELECT4',
    topic: 'TypeScript Generics & Tailwind CSS',
    description: 'Master generic interfaces, utility types, and strongly typed state styled with Tailwind CSS.',
    schedule: 'Mon & Wed 14:00 - 16:00',
    maxTutees: 5,
  },
  {
    id: 'SESS-002',
    tutorId: 102,
    courseCode: 'CS102',
    topic: 'Data Structures & Algorithms in TS',
    description: 'In-depth study of stacks, queues, binary search trees, and time complexity analysis.',
    schedule: 'Tue & Thu 10:00 - 12:00',
    maxTutees: 8,
  },
  {
    id: 'SESS-003',
    tutorId: 101,
    courseCode: 'WEB201',
    topic: 'CSS Grid, Flexbox & Responsive Layouts',
    description: 'Learn modern layout techniques, CSS custom properties, and responsive Tailwind design.',
    schedule: 'Fri 13:00 - 15:00',
    maxTutees: 6,
  },
  {
    id: 'SESS-004',
    tutorId: 102,
    courseCode: 'ITELECT4',
    topic: 'Custom React Hooks & Dark Mode Integration',
    description: 'Building custom reusable hooks with class-based dark mode and state synchronization.',
    schedule: 'Sat 09:00 - 11:00',
    maxTutees: 4,
  },
];

const MOCK_SUBMISSIONS: Submission[] = [
  { id: 301, courseId: 'ITELECT4', studentId: 103, grade: 96 },
  { id: 302, courseId: 'CS102', studentId: 103, grade: 88 },
  { id: 303, courseId: 'WEB201', studentId: 103, grade: 92 },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 501,
    sessionId: 'SESS-001',
    tuteeId: 103,
    tutorId: 101,
    status: BookingStatus.CONFIRMED,
    requestedAt: '2026-08-01T10:00:00Z',
    notes: 'Looking forward to reviewing generics and Tailwind CSS utility classes.',
  },
  {
    id: 502,
    sessionId: 'SESS-002',
    tuteeId: 103,
    tutorId: 102,
    status: BookingStatus.REQUESTED,
    requestedAt: '2026-08-05T14:30:00Z',
    notes: 'Need assistance with binary search tree balancing.',
  },
];

function App() {
  const [sessions, setSessions] = useState<TutoringSession[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedSession, setSelectedSession] = useState<TutoringSession | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');

  const [showOnlyAvailable, toggleAvailableOnly] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [isCompactVariant, toggleCompactVariant] = useToggle(false);
  const previousSearchQuery = usePrevious<string>(searchQuery);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchMockData();
  }, []);

  const fetchMockData = (): void => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setSessions(MOCK_TUTORING_SESSIONS);
      setUsers(MOCK_USERS);
      setSubmissions(MOCK_SUBMISSIONS);
      if (MOCK_TUTORING_SESSIONS.length > 0) {
        setSelectedSession(MOCK_TUTORING_SESSIONS[0]);
      }
      if (MOCK_USERS.length > 0) {
        setSelectedUser(MOCK_USERS[0]);
      }
      setLoading(false);
    }, 700);
  };

  const triggerSimulatedError = (): void => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setError('Failed to fetch tutoring sessions from backend. Network error 503.');
    }, 500);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBookingNotes(e.target.value);
  };

  const focusSearchInput = (): void => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCreateBooking = (session: TutoringSession): void => {
    const newBookingDto: CreateBookingDto = {
      sessionId: session.id,
      tuteeId: 103,
      tutorId: session.tutorId,
      status: BookingStatus.REQUESTED,
      requestedAt: new Date().toISOString(),
      notes: bookingNotes.trim() || 'No additional notes provided.',
    };

    const newBooking: Booking = {
      id: Date.now(),
      ...newBookingDto,
    };

    setBookings((prevBookings) => [newBooking, ...prevBookings]);
    setBookingNotes('');
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (showOnlyAvailable) {
      const activeBookingsCount = bookings.filter((b) => b.sessionId === session.id).length;
      return matchesSearch && activeBookingsCount < session.maxTutees;
    }
    return matchesSearch;
  });

  const activeVariant = isCompactVariant ? 'compact' : 'default';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Peer Tutoring Platform
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Tailwind & TS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Session scheduling, peer matching & real-time booking status
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={toggleCompactVariant}
              className="px-3 py-2 text-xs font-medium rounded-lg border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 transition-all flex items-center space-x-1.5 shadow-2xs"
              title="Toggle Component Variant (Compact / Default)"
            >
              <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Variant: <strong className="capitalize">{activeVariant}</strong></span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="px-3.5 py-2 text-xs font-medium rounded-lg border bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-all flex items-center space-x-2 shadow-2xs"
              title="Toggle Class-Based Dark Mode (darkMode: 'class')"
            >
              <span>{isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                🔍
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all"
                placeholder="Search by course code, topic, or description (e.g. ITELECT4, Generics)..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={focusSearchInput}
                className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <span>🎯 Focus Input</span>
              </button>

              <button
                type="button"
                onClick={triggerSimulatedError}
                className="px-3 py-2.5 text-xs font-semibold rounded-xl bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60 hover:bg-rose-100 transition-colors"
                title="Test styled error state component"
              >
                ⚠️ Sim Error
              </button>

              <button
                type="button"
                onClick={fetchMockData}
                className="px-3 py-2.5 text-xs font-semibold rounded-xl bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/60 hover:bg-sky-100 transition-colors"
                title="Reload mock data"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={toggleAvailableOnly}
                className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  showOnlyAvailable
                    ? 'bg-sky-500 text-white border-sky-600 shadow-2xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {showOnlyAvailable ? '✓ Filter: Open Seats Only' : 'Filter: Show All Seats'}
              </button>
            </div>

            {previousSearchQuery !== undefined && previousSearchQuery !== '' && (
              <span className="text-slate-500 dark:text-slate-400 italic">
                Previous search query: <strong className="not-italic text-slate-700 dark:text-slate-300">"{previousSearchQuery}"</strong>
              </span>
            )}
          </div>
        </section>

        {loading ? (
          <section className="space-y-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full border-4 border-sky-200 dark:border-sky-900 animate-spin border-t-sky-600 dark:border-t-sky-400"></div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  Loading Peer Tutoring Data...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fetching tutoring sessions, user profiles, and active bookings from state...
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-pulse"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="w-16 h-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                  </div>
                  <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
              ))}
            </div>
          </section>
        ) : error ? (
          <section className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 shadow-sm text-center space-y-4 max-w-2xl mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 flex items-center justify-center mx-auto text-2xl shadow-inner">
              ⚠️
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">
                Tutoring Session Loading Error
              </h3>
              <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed">
                {error}
              </p>
            </div>
            <button
              onClick={fetchMockData}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 transition-colors shadow-md inline-flex items-center space-x-2"
            >
              <span>🔄 Retry Loading Data</span>
            </button>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                    <span>📚 Tutoring Sessions</span>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {filteredSessions.length}
                    </span>
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Showing <strong className="capitalize">{activeVariant}</strong> variant
                  </span>
                </div>

                {filteredSessions.length === 0 ? (
                  <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      No tutoring sessions found
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Try clearing your search query or toggling seat filters.
                    </p>
                  </div>
                ) : (
                  <div
                    className={
                      isCompactVariant
                        ? 'flex flex-col space-y-2.5'
                        : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                    }
                  >
                    {filteredSessions.map((session) => {
                      const sessionBookings = bookings.filter((b) => b.sessionId === session.id);
                      return (
                        <CourseCard
                          key={session.id}
                          session={session}
                          variant={activeVariant}
                          isSelected={selectedSession?.id === session.id}
                          onSelect={(s) => setSelectedSession(s)}
                          bookedCount={sessionBookings.length}
                        />
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                    <span>👥 Peer Tutor & Student Directory</span>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {users.length}
                    </span>
                  </h2>
                </div>

                <div
                  className={
                    isCompactVariant
                      ? 'flex flex-col space-y-2.5'
                      : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                  }
                >
                  {users.map((u) => (
                    <UserCard
                      key={u.id}
                      user={u}
                      variant={activeVariant}
                      isSelected={selectedUser?.id === u.id}
                      onSelect={(usr) => setSelectedUser(usr)}
                    />
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Session Detail & Booking
                  </h2>
                  {selectedSession && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {selectedSession.id}
                    </span>
                  )}
                </div>

                {selectedSession ? (
                  <div className="space-y-5">
                    <div>
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 mb-2">
                        {selectedSession.courseCode}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {selectedSession.topic}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {selectedSession.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                      <div>
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase">
                          Schedule
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selectedSession.schedule}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase">
                          Capacity
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selectedSession.maxTutees} Max Students
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/30 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-300">
                        Request Peer Booking
                      </h4>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100"
                        placeholder="Add notes for your tutor (e.g. topic review requests)..."
                        value={bookingNotes}
                        onChange={handleNotesChange}
                      />
                      <button
                        type="button"
                        onClick={() => handleCreateBooking(selectedSession)}
                        className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shadow-sm"
                      >
                        Book This Session
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Select a tutoring session to view details & request booking.
                  </div>
                )}
              </section>

              <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    My Session Bookings ({bookings.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {bookings.map((b) => (
                    <SubmissionBadge
                      key={b.id}
                      title={`Booking #${b.id} (${b.sessionId})`}
                      status={b.status}
                      notes={b.notes}
                      date={b.requestedAt}
                      variant={activeVariant}
                    />
                  ))}
                </div>
              </section>

              <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Academic Submissions & Grades
                  </h3>
                </div>

                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <SubmissionBadge
                      key={sub.id}
                      title={`Submission #${sub.id} - ${sub.courseId}`}
                      grade={sub.grade}
                      status={sub.grade && sub.grade >= 75 ? 'passed' : 'failed'}
                      variant={activeVariant}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            Peer Tutoring Booking Platform • Built with React, TypeScript, Tailwind CSS & Custom Hooks
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
