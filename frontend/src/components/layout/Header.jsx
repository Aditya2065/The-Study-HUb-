export default function Header({ dashboard }) {
  const completion = dashboard?.profile_completion ?? 0;
  const progressStyle = {
    background: `conic-gradient(var(--primary-btn) ${completion}%, #d8dee9 ${completion}% 100%)`,
  };

  return (
    <header className="topbar">
      <div>
        <h2>Welcome, Scholar</h2>
        <p className="muted">NEP 2020 B.Sc. Computer Science Workspace</p>
      </div>
      <div className="profile-wrap">
        <div className="ring" style={progressStyle}>
          <div className="inner">{completion}%</div>
        </div>
        <div>
          <p className="xp">XP: {dashboard?.xp ?? 0}</p>
          <p className="muted">Study Streak: {dashboard?.study_streak ?? 0} days</p>
        </div>
      </div>
    </header>
  );
}
