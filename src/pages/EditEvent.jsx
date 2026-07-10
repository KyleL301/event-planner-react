// QA verification: EditEvent correctly calls updateEvent from context

import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useEffect, useState } from "react";

/*
=====================================================
Edit Event Page

Responsibilities
- Load the selected event
- Allow the user to edit event details
- Allow the user to edit the event category
- Save changes back to EventContext
=====================================================
*/

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, updateEvent } = useEvents();

  const [formData, setFormData] = useState(null);

  /*
  =====================================================
  Load Event

  Convert IDs to strings to avoid type mismatch
  between numbers and route parameters.
  =====================================================
  */
  useEffect(() => {
    if (!events || events.length === 0) {
      return;
    }

    const eventToEdit = events.find((event) => String(event.id) === String(id));

    if (!eventToEdit) {
      navigate("/dashboard");
      return;
    }

    setFormData(eventToEdit);
  }, [events, id, navigate]);

  /*
  =====================================================
  Handle Form Changes

  Uses computed property names so one function can
  update every form field.
  =====================================================
  */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  =====================================================
  Submit Changes
  =====================================================
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    updateEvent(formData);

    navigate("/dashboard");
  };

  if (!formData) {
    return <p className="page">Loading event...</p>;
  }

  return (
    <div className="page auth-container">
      <h2>Edit Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* ================= Category ================= */}

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Personal">📌 Personal</option>
          <option value="Work">💼 Work</option>
          <option value="Fitness">🏋 Fitness</option>
          <option value="Study">🎓 Study</option>
          <option value="Family">👨‍👩‍👧 Family</option>
          <option value="Social">🎉 Social</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditEvent;
