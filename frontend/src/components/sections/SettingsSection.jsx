export default function SettingsSection({ theme, onToggleTheme }) {
  return (
    <section className="card">
      <h3>Help & Settings</h3>
      <div className="row">
        <p>Theme</p>
        <button className="action-btn" onClick={onToggleTheme}>
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </section>
  );
}
