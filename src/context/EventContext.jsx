// Import React tools needed for global state management
import { createContext, useContext, useEffect, useState } from "react";

// Import authentication context so we know which user is logged in
import { useAuth } from "./AuthContext";

/*
  Create a global context for events.
  This allows any component to access events without prop drilling.
*/
const EventContext = createContext();

/*
  EventProvider wraps the app and provides event data globally.
*/
export function EventProvider({ children }) {
  // Get the currently logged-in user from AuthContext
  const { currentUser } = useAuth();

  // Store events in state for the current user only
  const [events, setEvents] = useState([]);

  /*
    Load events whenever the logged-in user changes.
    This ensures users only see THEIR events.
  */
  useEffect(() => {
    // If no user is logged in, clear events
    if (!currentUser) {
      setEvents([]);
      return;
    }

    // Get all events from localStorage
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Filter events to only those belonging to this user
    const userEvents = allEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    // Store only this user's events in state
    setEvents(userEvents);
  }, [currentUser]);

  /*
    Add a new event.
    Called from AddEvent.jsx
  */
  const addEvent = (newEvent) => {
    // Get all existing events
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Add new event to the array
    const updatedEvents = [...allEvents, newEvent];

    // Save updated list to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Update state immediately so UI refreshes
    setEvents((prev) => [...prev, newEvent]);
  };

  /*
    updateEvent updates an existing event.
    Called from EditEvent.jsx
  */
  const updateEvent = (updatedEvent) => {
    // Get all events from storage
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Replace the event with matching ID
    const updatedEvents = allEvents.map((event) =>
      String(event.id) === String(updatedEvent.id) ? updatedEvent : event,
    );

    // Save updated list back to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Filter again for this user only
    const userEvents = updatedEvents.filter(
      (event) => event.userEmail === currentUser.email,
    );

    // Update state so dashboard refreshes
    setEvents(userEvents);
  };

  /*
    Delete an event.
    Called from Dashboard/EventCard.
  */
  const deleteEvent = (id) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = allEvents.filter(
      (event) => String(event.id) !== String(id),
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setEvents((prev) =>
      prev.filter((event) => String(event.id) !== String(id)),
    );
  };

  /*
    Provide event functions globally.
  */
  return (
    <EventContext.Provider
      value={{
        events, // list of current user's events
        addEvent, // function to create event
        updateEvent, // function to edit event
        deleteEvent, // function to remove event
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

/*
  Custom hook so components can easily access EventContext.
*/
export function useEvents() {
  return useContext(EventContext);
}
