import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <h3 className="event-title">📅 {event.title}</h3>

      <div className="event-details">
        <p>
          <strong>🗓 Date:</strong> {event.date}
        </p>

        <p>
          <strong>🕒 Time:</strong> {event.time}
        </p>

        <p>
          <strong>📍 Location:</strong> {event.location}
        </p>
      </div>

      <div className="event-description">
        <p>{event.description}</p>
      </div>

      <div className="event-actions">
        <button
          className="edit-btn"
          onClick={() => navigate(`/edit-event/${event.id}`)}
        >
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(event.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
