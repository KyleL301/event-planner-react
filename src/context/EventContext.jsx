import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

/*
  EventContext
  - Manages all event data
  - Provides add, update, and delete functionality
  - Events are scoped to the logged-in user
*/

const EventContext = createContext();

export function EventProvider({ children }) {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);

  /*
    Load events for the logged-in user
  */
  useEffect(() => {
    if (!currentUser) {
      setEvents([]);
      return;
    }

    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const userEvents = allEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    setEvents(userEvents);
  }, [currentUser]);

  /*
    Add a new event
  */
  const addEvent = (newEvent) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = [...allEvents, newEvent];

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  /*
    UPDATE EVENT
    - REQUIRED by EditEvent.jsx
  */
  const updateEvent = (updatedEvent) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.map((event) =>
      String(event.id) === String(updatedEvent.id) ? updatedEvent : event,
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    const userEvents = updatedEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    setEvents(userEvents);
  };

  /*
    Delete an event
  */
  const deleteEvent = (id) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.filter(
      (event) => String(event.id) !== String(id),
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setEvents((prevEvents) =>
      prevEvents.filter((event) => String(event.id) !== String(id)),
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
