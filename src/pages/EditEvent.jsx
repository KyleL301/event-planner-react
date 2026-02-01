import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useEffect, useState } from "react";

/*
  EditEvent page

*/
function EditEvent() {
  const { id } = useParams(); // id is ALWAYS a string
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  const [formData, setFormData] = useState(null);

  /*
    Load event safely with ID normalization
  */
  useEffect(() => {
    if (!events || events.length === 0) {
      return;
    }

    // Convert both IDs to strings before comparison
    const eventToEdit = events.find((event) => String(event.id) === String(id));

    if (!eventToEdit) {
      navigate("/dashboard");
      return;
    }

    setFormData(eventToEdit);
  }, [events, id, navigate]);

  /*
    Handle input changes
  */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
    Submit updated event
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
    <div className="page">
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
        />

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
