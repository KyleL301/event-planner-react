import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
    };

    addEvent(newEvent);
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <h2>Add Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          onChange={handleChange}
        />

        <input type="date" name="date" onChange={handleChange} />

        <input type="time" name="time" onChange={handleChange} />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          onChange={handleChange}
        />

        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
