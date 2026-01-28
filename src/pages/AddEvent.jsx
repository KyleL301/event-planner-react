import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

/*
  AddEvent page:
  - Allows a logged-in user to create a new event
  - Each event is linked to the logged-in user
*/
function AddEvent() {
  // Access event context to add a new event
  const { addEvent } = useEvents();

  // Access the currently logged-in user
  const { currentUser } = useAuth();

  // Used to redirect the user after creating an event
  const navigate = useNavigate();

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  /*
    Handles form submission:
    - Validates input
    - Creates a new event
    - Links the event to the logged-in user
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation to ensure required fields are filled
    if (!title || !date || !time || !location) {
      alert("Please fill in all required fields");
      return;
    }

    // Create a new event object linked to the current user
    const newEvent = {
      id: Date.now(),
      title,
      date,
      time,
      location,
      description,
      userEmail: currentUser.email, // 🔑 event ownership
    };

    // Add the event to global state
    addEvent(newEvent);

    // Redirect back to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="page auth-container">
      <h2>Add Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
