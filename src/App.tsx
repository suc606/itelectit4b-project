import React, { useState, useEffect, useRef } from 'react';
import {
  type TutoringSession,
  type Booking,
  BookingStatus,
  type CreateBookingDto,
} from './types';
import { useToggle, usePrevious } from './hooks/useCustomHooks';
import './App.css';

// Mock Data Source for Mount Loading
const MOCK_TUTORING_SESSIONS: TutoringSession[] = [
  {
    id: 'SESS-001',
    tutorId: 101,
    courseCode: 'ITELECT4',
    topic: 'TypeScript Generics & State Management',
    description: 'Master generic interfaces, utility types, and strongly typed state in React applications.',
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
    tutorId: 103,
    courseCode: 'WEB201',
    topic: 'CSS Grid, Flexbox & Responsive Layouts',
    description: 'Learn modern layout techniques, CSS custom properties, and responsive design systems.',
    schedule: 'Fri 13:00 - 15:00',
    maxTutees: 6,
  },
  {
    id: 'SESS-004',
    tutorId: 104,
    courseCode: 'ITELECT4',
    topic: 'Custom React Hooks & DOM Interoperability',
    description: 'Building custom reusable hooks with explicit return types and direct DOM refs.',
    schedule: 'Sat 09:00 - 11:00',
    maxTutees: 4,
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 501,
    sessionId: 'SESS-001',
    tuteeId: 201,
    tutorId: 101,
    status: BookingStatus.CONFIRMED,
    requestedAt: '2026-07-30T10:00:00Z',
    notes: 'Looking forward to reviewing generics and typed state hooks.',
  },
];

function App() {
  // 1. useState<T> for state management (5 explicitly typed states)
  const [sessions, setSessions] = useState<TutoringSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<TutoringSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [bookingNotes, setBookingNotes] = useState<string>('');

  // Custom Hooks Usage (with explicit return types)
  const [showOnlyAvailable, toggleAvailableOnly] = useToggle(false);
  const previousSearchQuery = usePrevious<string>(searchQuery);

  // 2. useRef for DOM reference (Input element reference)
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 3. useEffect to load mock data on mount, replacing hard-coded JSX
  useEffect(() => {
    setLoading(true);
    // Simulating asynchronous API data fetching
    const timer = setTimeout(() => {
      setSessions(MOCK_TUTORING_SESSIONS);
      if (MOCK_TUTORING_SESSIONS.length > 0) {
        setSelectedSession(MOCK_TUTORING_SESSIONS[0]);
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // 4. Typed onChange handler using React.ChangeEvent<HTMLInputElement>
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBookingNotes(e.target.value);
  };

  // Helper method to focus search input using DOM ref
  const focusSearchInput = (): void => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handler to create a new session booking dynamically
  const handleCreateBooking = (session: TutoringSession): void => {
    const newBookingDto: CreateBookingDto = {
      sessionId: session.id,
      tuteeId: 999, // Current user / tutee ID
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

  // Filtered session list based on dynamic state
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showOnlyAvailable) {
      const activeBookingsCount = bookings.filter(b => b.sessionId === session.id).length;
      return matchesSearch && activeBookingsCount < session.maxTutees;
    }
    return matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="app-header">
        <div className="header-badge">Peer Tutoring Platform</div>
        <h1>Academic Tutoring & Session Booking</h1>
        <p className="subtitle">
          Connect with expert tutors, search scheduled peer sessions, and track real-time bookings.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Controls & Search Bar */}
        <section className="search-section">
          <div className="search-bar-wrapper">
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search by topic or course code (e.g. ITELECT4, Generics)..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={focusSearchInput}
              title="Focus search input via useRef DOM reference"
            >
              🔍 Focus Input
            </button>
          </div>

          <div className="filter-bar">
            <button
              type="button"
              className={`btn-toggle ${showOnlyAvailable ? 'active' : ''}`}
              onClick={toggleAvailableOnly}
            >
              {showOnlyAvailable ? '✓ Showing Available Seats Only' : 'Show Available Seats Only'}
            </button>

            {previousSearchQuery !== undefined && previousSearchQuery !== '' && (
              <span className="previous-query-badge">
                Previous query: <em>"{previousSearchQuery}"</em>
              </span>
            )}
          </div>
        </section>

        {/* Dynamic Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading peer tutoring sessions from mock data state...</p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {/* Sessions List Column */}
            <section className="sessions-list-column">
              <h2>
                Available Sessions ({filteredSessions.length})
              </h2>

              {filteredSessions.length === 0 ? (
                <div className="empty-state">
                  <p>No tutoring sessions match your search criteria.</p>
                </div>
              ) : (
                <div className="sessions-list">
                  {filteredSessions.map((session) => {
                    const isSelected = selectedSession?.id === session.id;
                    const sessionBookings = bookings.filter(b => b.sessionId === session.id);
                    const spotsRemaining = session.maxTutees - sessionBookings.length;

                    return (
                      <div
                        key={session.id}
                        className={`session-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedSession(session)}
                      >
                        <div className="card-header">
                          <span className="course-tag">{session.courseCode}</span>
                          <span className="spots-badge">
                            {spotsRemaining > 0 ? `${spotsRemaining} spots open` : 'Full'}
                          </span>
                        </div>
                        <h3 className="session-topic">{session.topic}</h3>
                        <p className="session-schedule">🗓 {session.schedule}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Session Detail & Booking Column */}
            <section className="session-detail-column">
              <h2>Session Details & Booking</h2>

              {selectedSession ? (
                <div className="detail-card">
                  <div className="detail-header">
                    <span className="course-tag lg">{selectedSession.courseCode}</span>
                    <span className="session-id">{selectedSession.id}</span>
                  </div>
                  <h2 className="detail-topic">{selectedSession.topic}</h2>
                  <p className="detail-description">{selectedSession.description}</p>

                  <div className="meta-grid">
                    <div className="meta-item">
                      <span className="meta-label">Schedule</span>
                      <span className="meta-value">{selectedSession.schedule}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Max Tutees</span>
                      <span className="meta-value">{selectedSession.maxTutees} Students</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Tutor ID</span>
                      <span className="meta-value">Tutor #{selectedSession.tutorId}</span>
                    </div>
                  </div>

                  {/* Booking Action Box */}
                  <div className="booking-box">
                    <h3>Request Peer Booking</h3>
                    <div className="booking-input-group">
                      <input
                        type="text"
                        className="booking-input"
                        placeholder="Add notes for the tutor (optional)..."
                        value={bookingNotes}
                        onChange={handleNotesChange}
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleCreateBooking(selectedSession)}
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p>Select a session from the list to view details and book.</p>
                </div>
              )}

              {/* Real-time Bookings List (Dynamic State) */}
              <div className="bookings-summary">
                <h3>My Bookings ({bookings.length})</h3>
                {bookings.length === 0 ? (
                  <p className="no-bookings">No active session bookings yet.</p>
                ) : (
                  <ul className="bookings-list">
                    {bookings.map((booking) => (
                      <li key={booking.id} className="booking-item">
                        <div className="booking-info">
                          <strong>Booking #{booking.id}</strong>
                          <span className="booking-session-ref">({booking.sessionId})</span>
                          <p className="booking-notes">{booking.notes}</p>
                        </div>
                        <span className={`status-pill ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Peer Tutoring Platform • Built with React, TypeScript & Custom Hooks</p>
      </footer>
    </div>
  );
}

export default App;
