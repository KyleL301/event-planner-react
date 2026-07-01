import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

/*
=====================================================
Add Event Page

Responsibilities
- Create a new event
- Validate required fields
- Associate the event with the logged-in user
- Allow the user to assign a category
=====================================================
*/

function AddEvent() {
  // Access Event Context
  const { addEvent } = useEvents();

  // Access the currently logged-in user
  const { currentUser } = useAuth();

  // Used to redirect after creating an event
  const navigate = useNavigate();

  /*
    =====================================================
    Form State

    Each piece of state represents one field in
    the Add Event form.

    These are controlled components, meaning React
    always controls the displayed values.
    =====================================================
  */

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  /*
    Category defaults to "Personal".

    This ensures every event always has
    a valid category even if the user
    doesn't change it.
  */
  const [category, setCategory] = useState("Personal");

  // Validation message
  const [error, setError] = useState("");

  /*
    =====================================================
    Handle Form Submission
    =====================================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !date || !time || !location) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");

    /*
      Create the new event object.

      Notice that we've simply extended the
      existing event model by adding a category.
    */
    const newEvent = {
      id: Date.now(),
      title,
      date,
      time,
      location,
      description,
      category,
      userEmail: currentUser.email,
    };

    // Save the event
    addEvent(newEvent);

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="page auth-container">
      <h2>Add Event</h2>

      {error && <div className="error-message">{error}</div>}

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

        {/* ================= Event Category ================= */}

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">📌 Personal</option>
          <option value="Work">💼 Work</option>
          <option value="Fitness">🏋 Fitness</option>
          <option value="Study">🎓 Study</option>
          <option value="Family">👨‍👩‍👧 Family</option>
          <option value="Social">🎉 Social</option>
        </select>

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
