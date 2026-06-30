import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <h3 className="event-title">📅 {event.title}</h3>

      <div className="event-details">
        <p>
          <strong>🗓 Date:</strong>{" "}
          {new Date(event.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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

        <button
          className="delete-btn"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this event?",
            );

            if (confirmed) {
              onDelete(event.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
