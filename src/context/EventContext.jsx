import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

/*
  EventContext:
  - Manages events globally
  - Ensures events are ALWAYS scoped to the logged-in user
*/
const EventContext = createContext();

export function EventProvider({ children }) {
  const { currentUser } = useAuth();

  // Store only the current user's events in state
  const [events, setEvents] = useState([]);

  /*
    Load events from localStorage when user changes
    Only events belonging to the logged-in user are loaded
  */
  useEffect(() => {
    if (!currentUser) {
      setEvents([]);
      return;
    }

    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Filter events so user only gets their own
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
    Delete an event belonging to the logged-in user
  */
  const deleteEvent = (id) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.filter((event) => event.id !== id);

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Update local state
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

// Hook to access event context
export function useEvents() {
  return useContext(EventContext);
}
