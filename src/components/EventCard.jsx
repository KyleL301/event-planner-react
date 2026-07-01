import { useNavigate } from "react-router-dom";

/*
=====================================================
Event Card Component

Responsibilities
- Display an individual event
- Display the event category
- Navigate to the Edit Event page
- Delete an event after confirmation
=====================================================
*/

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  /*
    =====================================================
    Category Icons

    The event only stores its category.

    We derive the correct icon here instead of storing
    icons inside the event object. This keeps our data
    model simple and avoids duplicate information.
    =====================================================
  */

  const categoryIcons = {
    Work: "💼",
    Fitness: "🏋",
    Study: "🎓",
    Family: "👨‍👩‍👧",
    Social: "🎉",
    Personal: "📌",
  };

  const categoryIcon = categoryIcons[event.category] || "📌";

  return (
    <div className="event-card">
      {/* ================= Category Badge ================= */}

      <div className="category-badge">
        {categoryIcon} {event.category}
      </div>

      {/* ================= Event Title ================= */}

      <h3 className="event-title">📅 {event.title}</h3>

      {/* ================= Event Details ================= */}

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

      {/* ================= Description ================= */}

      {event.description && (
        <div className="event-description">
          <p>{event.description}</p>
        </div>
      )}

      {/* ================= Action Buttons ================= */}

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
