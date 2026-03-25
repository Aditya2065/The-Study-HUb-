export default function CoursesSection({ year, courses, onYearChange }) {
  return (
    <section className="card">
      <div className="row">
        <h3>BCS Curriculum (NEP Pattern)</h3>
        <select value={year} onChange={(event) => onYearChange(event.target.value)}>
          <option value="FYBCS">FYBCS</option>
          <option value="SYBCS">SYBCS</option>
          <option value="TYBCS">TYBCS</option>
        </select>
      </div>
      <div className="list-wrap">
        {courses.map((subject) => (
          <p key={subject}>{subject}</p>
        ))}
      </div>
    </section>
  );
}
