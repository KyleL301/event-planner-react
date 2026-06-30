import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/EventCard";

/*
=====================================================
Dashboard Page

Responsibilities
- Welcome the logged-in user
- Display dashboard statistics
- Allow users to search their events
- Display all matching events
=====================================================
*/

function Dashboard() {
  // Get the logged-in user
  const { currentUser } = useAuth();

  // Get events from the Event Context
  const { events, deleteEvent } = useEvents();

  /*
    Stores whatever the user types into
    the search box.
  */
  const [searchTerm, setSearchTerm] = useState("");

  /*
    Derived State

    Instead of storing another copy of the
    events array, we calculate the filtered
    events every render.

    This keeps React as the single source
    of truth.
  */
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="page">
      {/* ================= Dashboard Header ================= */}

      <div className="dashboard-header">
        <div className="dashboard-info">
          <h2>Welcome back, {currentUser?.name} 👋</h2>

          <p className="dashboard-subtitle">
            Manage your upcoming events and stay organised.
          </p>

          <div className="dashboard-stats">
            <div className="stat-card">
              📅 {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "Event" : "Events"}
            </div>
          </div>
        </div>

        <Link to="/add-event" className="primary-btn">
          + Create Event
        </Link>
      </div>

      {/* ================= Search Box ================= */}

      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ================= Empty State ================= */}

      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <h3>No matching events found.</h3>

          <p>Try searching for another event.</p>
        </div>
      ) : (
        filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} onDelete={deleteEvent} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
