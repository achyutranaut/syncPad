function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="theme-toggle"
    >
      <span className={`theme-toggle__icon ${isDark ? '' : 'is-hidden'}`}>🌙</span>
      <span className={`theme-toggle__icon ${isDark ? 'is-hidden' : ''}`}>☀️</span>
    </button>
  );
}

export default ThemeToggle;