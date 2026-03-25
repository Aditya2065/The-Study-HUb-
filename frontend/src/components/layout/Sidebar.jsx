export default function Sidebar({ items, activeTab, onSelect, onLogout }) {
  return (
    <aside className="sidebar">
      <h1 className="brand">The Study Hub</h1>
      <p className="tagline">Your All-in-One Digital Academic Universe</p>
      <nav>
        {items.map((item) => (
          <button
            key={item.key}
            className={item.key === activeTab ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onSelect(item.key)}
          >
            {item.icon ? <span>{item.icon} </span> : null}
            {item.label}
          </button>
        ))}
      </nav>
      <button className="logout" onClick={onLogout}>Logout</button>
    </aside>
  );
}
