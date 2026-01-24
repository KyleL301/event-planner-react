import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventContext";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  const existingEvent = events.find((event) => event.id === Number(id));

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (existingEvent) {
      setFormData(existingEvent);
    }
  }, [existingEvent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEvent(formData);
    navigate("/dashboard");
  };

  if (!existingEvent) {
    return (
      <div className="page">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Edit Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
