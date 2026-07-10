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
- Highlight the next upcoming event
- Allow users to search their events
- Display matching events in chronological order

Design Notes
- The Upcoming Event widget should NEVER change
  when the user searches.
- The search box should only affect the event list.
=====================================================
*/

function Dashboard() {
  // Get the logged-in user
  const { currentUser } = useAuth();

  // Get all events for the current user
  const { events, deleteEvent } = useEvents();

  /*
    Stores the user's search input.

    This makes the search field a controlled
    React component.
  */
  const [searchTerm, setSearchTerm] = useState("");

  /*
=====================================================
Category Filter

Stores the currently selected category.

"All" displays every event.
=====================================================
*/
  const [selectedCategory, setSelectedCategory] = useState("All");

  /*
    =====================================================
    Helper Function

    Combines an event's date and time into one Date object.

    Why?

    Comparing only the date causes events on the same day
    to appear in the wrong order.

    By combining the date and time we can sort events
    accurately down to the minute.
    =====================================================
  */
  const getEventDateTime = (event) => new Date(`${event.date}T${event.time}`);

  /*
    =====================================================
    Sort ALL Events

    Used ONLY for the Upcoming Event widget.
    =====================================================
  */
  const sortedAllEvents = [...events].sort(
    (a, b) => getEventDateTime(a) - getEventDateTime(b),
  );

  /*
=====================================================
Filter Events

Filtering happens in two stages.

1. Filter by category.
2. Filter by search text.

Keeping these separate makes the logic easier
to understand and maintain.
=====================================================
*/

  // First filter by category
  const categoryFilteredEvents = events.filter((event) => {
    if (selectedCategory === "All") {
      return true;
    }

    return event.category === selectedCategory;
  });

  // Then filter by search term
  const filteredEvents = categoryFilteredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /*
    =====================================================
    Sort Filtered Events

    Uses both date AND time.
    =====================================================
  */
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => getEventDateTime(a) - getEventDateTime(b),
  );

  /*
    =====================================================
    Upcoming Event

    Find the first event that has not yet started.

    Unlike the previous implementation,
    this compares BOTH the date and the time.
    =====================================================
  */

  /*
=====================================================
Current Date & Time

Used to calculate dashboard statistics and
determine the next upcoming event.
=====================================================
*/
  const now = new Date();

  /*
=====================================================
Dashboard Statistics

These values are derived from the event list.

We calculate them every render instead of storing
them in React state. This avoids duplicate state
and keeps the dashboard synchronized automatically.
=====================================================
*/

  // Total events
  const totalEvents = events.length;

  // Events that have not happened yet
  const upcomingEvents = events.filter(
    (event) => getEventDateTime(event) >= now,
  );

  // Events that have already happened
  const pastEvents = events.filter((event) => getEventDateTime(event) < now);

  // Events taking place today
  const todayEvents = events.filter((event) => {
    const eventDate = getEventDateTime(event);

    return (
      eventDate.getDate() === now.getDate() &&
      eventDate.getMonth() === now.getMonth() &&
      eventDate.getFullYear() === now.getFullYear()
    );
  });

  /*
=====================================================
Upcoming Event

The first upcoming event from the sorted list.
=====================================================
*/
  const upcomingEvent = sortedAllEvents.find(
    (event) => getEventDateTime(event) >= now,
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
              <h4>Total</h4>
              <p>{totalEvents}</p>
            </div>

            <div className="stat-card">
              <h4>Upcoming</h4>
              <p>{upcomingEvents.length}</p>
            </div>

            <div className="stat-card">
              <h4>Past</h4>
              <p>{pastEvents.length}</p>
            </div>

            <div className="stat-card">
              <h4>Today</h4>
              <p>{todayEvents.length}</p>
            </div>
          </div>
        </div>

        <Link to="/add-event" className="primary-btn">
          + Create Event
        </Link>
      </div>

      {/* ================= Upcoming Event Widget ================= */}

      {upcomingEvent && (
        <div className="upcoming-event">
          <h3>⭐ Next Upcoming Event</h3>

          <h2>{upcomingEvent.title}</h2>

          <p>
            📅{" "}
            {new Date(upcomingEvent.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p>🕒 {upcomingEvent.time}</p>

          <p>📍 {upcomingEvent.location}</p>
        </div>
      )}

      {/* ================= Category Filter ================= */}

      <select
        className="category-filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Work">💼 Work</option>
        <option value="Fitness">🏋 Fitness</option>
        <option value="Study">🎓 Study</option>
        <option value="Family">👨‍👩‍👧 Family</option>
        <option value="Social">🎉 Social</option>
        <option value="Personal">📌 Personal</option>
      </select>

      {/* ================= Search ================= */}

      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ================= Event List ================= */}

      {sortedEvents.length === 0 ? (
        <div className="empty-state">
          <h3>No matching events found.</h3>

          <p>Try searching for another event.</p>
        </div>
      ) : (
        sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} onDelete={deleteEvent} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
