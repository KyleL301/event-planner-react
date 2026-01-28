function Help() {
  return (
    <div className="page">
      <h2>Help & User Guide</h2>

      <h3>Getting Started</h3>
      <p>
        To use the Event Planner, first create an account by clicking the
        Register link in the navigation menu. Fill in your details and submit
        the form.
      </p>

      <h3>Logging In</h3>
      <p>
        After registering, log in using your email and password to access your
        dashboard.
      </p>

      <h3>Managing Events</h3>
      <ul>
        <li>
          <strong>Add Event:</strong> Use the Add Event page to create a new
          event by entering the event name, date, time, location, and
          description.
        </li>
        <li>
          <strong>Edit Event:</strong> Click the Edit button on an event to
          update its details.
        </li>
        <li>
          <strong>Delete Event:</strong> Click Delete to remove an event
          permanently.
        </li>
      </ul>

      <h3>Tips for Organising Events</h3>
      <ul>
        <li>Use clear event names so events are easy to identify.</li>
        <li>Include locations for better planning.</li>
        <li>Review your dashboard regularly to stay organised.</li>
      </ul>
    </div>
  );
}

export default Help;
