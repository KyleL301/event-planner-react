import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

/*
  EventContext
  - Stores and manages all event data
  - Ensures events are scoped per logged-in user
*/
const EventContext = createContext();

export function EventProvider({ children }) {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);

  /*
    Load events when the logged-in user changes
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

    setEvents((prev) => [...prev, newEvent]);
  };

  /*
    UPDATE EXISTING EVENT  ← THIS IS THE FIX
  */
  const updateEvent = (updatedEvent) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event,
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    const userEvents = updatedEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    setEvents(userEvents);
  };

  /*
    Delete event
  */
  const deleteEvent = (id) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.filter((event) => event.id !== id);

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent, // 🚨 MUST BE HERE
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
