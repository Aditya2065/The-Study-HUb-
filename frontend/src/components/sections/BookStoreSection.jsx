export default function BookStoreSection({ resources }) {
  return (
    <section className="card">
      <h3>NEP Book Bank & Resources</h3>
      <div className="list-wrap">
        {resources.map((resource) => (
          <p key={resource.id}>
            {resource.title} - <a href={resource.url}>{resource.type}</a>
          </p>
        ))}
      </div>
    </section>
  );
}
