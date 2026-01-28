import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";

function Dashboard() {
  const { events, deleteEvent } = useEvents();

  return (
    <div className="page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2>My Events</h2>
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
