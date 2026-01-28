import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <h3>{event.title}</h3>

      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Time:</strong> {event.time}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>{event.description}</p>

      <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit</button>

      <button onClick={() => onDelete(event.id)}>Delete</button>
    </div>
  );
}

export default EventCard;
