export default function DashboardSection({ dashboard }) {
  return (
    <section className="panel-grid">
      <article className="card">
        <h3>Daily Tasks</h3>
        {(dashboard?.tasks ?? []).map((task) => (
          <p key={task.id} className={task.done ? 'done' : ''}>
            {task.done ? '?' : '??'} {task.title}
          </p>
        ))}
      </article>

      <article className="card">
        <h3>Assignments</h3>
        {(dashboard?.assignments ?? []).map((assignment) => (
          <p key={assignment.id}>
            {assignment.subject}: <strong>{assignment.due}</strong>
          </p>
        ))}
      </article>

      <article className="card">
        <h3>Quick Analytics</h3>
        <p>Completed this week: {dashboard?.weekly_completed ?? 0}</p>
        <p>Quiz attempts: {dashboard?.quizzes ?? 0}</p>
        <p>Books downloaded: {dashboard?.downloads ?? 0}</p>
      </article>
    </section>
  );
}
