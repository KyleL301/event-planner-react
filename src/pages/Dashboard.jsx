import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { events, deleteEvent } = useEvents();
  const { currentUser } = useAuth();

  return (
    <div className="page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {currentUser?.name} 👋</h2>

          <p className="dashboard-subtitle">
            Manage your upcoming events and stay organised.
          </p>

          <p className="event-count">
            {events.length} {events.length === 1 ? "event" : "events"}{" "}
            scheduled.
          </p>
        </div>

        <Link to="/add-event" className="primary-btn">
          + Add Event
        </Link>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="empty-state">
          <p>You don’t have any events yet.</p>
          <Link to="/add-event" className="primary-btn">
            Create your first event
          </Link>
        </div>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} onDelete={deleteEvent} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
