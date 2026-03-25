export default function TimetableSection({ timetable }) {
  return (
    <section className="card">
      <h3>Today&apos;s Lecture Schedule</h3>
      <div className="list-wrap">
        {timetable.map((slot) => (
          <p key={`${slot.time}-${slot.subject}`}>
            {slot.time} - {slot.subject}
          </p>
        ))}
      </div>
    </section>
  );
}
