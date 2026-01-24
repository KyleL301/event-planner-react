import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";

function Dashboard() {
  const { events, deleteEvent } = useEvents();

  return (
    <div className="page">
      <h2>Dashboard</h2>

      {events.length === 0 && <p>No events yet.</p>}

      {events.map((event) => (
        <EventCard key={event.id} event={event} onDelete={deleteEvent} />
      ))}
    </div>
  );
}

export default Dashboard;
