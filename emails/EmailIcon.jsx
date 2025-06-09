
export const EmailIcon = ({ type }) => {
  const icons = {
    github: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 ... [truncated]" />
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.45 20.45h-3.6v-5.4c0-1.28... [truncated]" />
      </svg>
    ),
  };
  return icons[type] || null;
};
