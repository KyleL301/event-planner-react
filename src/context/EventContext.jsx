import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

/*
  EventContext
  - Manages all event-related state
  - Ensures events are scoped to the logged-in user
  - Provides CRUD operations (Create, Read, Update, Delete)
*/
const EventContext = createContext();

export function EventProvider({ children }) {
  const { currentUser } = useAuth();

  // Holds only the logged-in user's events
  const [events, setEvents] = useState([]);

  /*
    Load events whenever the logged-in user changes
    This prevents users from seeing each other's events
  */
  useEffect(() => {
    if (!currentUser) {
      setEvents([]);
      return;
    }

    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Only load events belonging to the current user
    const userEvents = allEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    setEvents(userEvents);
  }, [currentUser]);

  /*
    Add a new event for the logged-in user
  */
  const addEvent = (newEvent) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = [...allEvents, newEvent];

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Update local state immediately
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  /*
    Update an existing event safely
    This fixes the TypeError when editing events
  */
  const updateEvent = (updatedEvent) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event,
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Refresh state for the current user only
    const userEvents = updatedEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    setEvents(userEvents);
  };

  /*
    Delete an event belonging to the logged-in user
  */
  const deleteEvent = (id) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.filter((event) => event.id !== id);

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
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

// Custom hook to access EventContext
export function useEvents() {
  return useContext(EventContext);
}
