export const SkipNavigation = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-neon-cyan text-space-dark px-4 py-2 rounded-md font-semibold transition-all duration-200 focus:ring-2 focus:ring-neon-purple"
    >
      Skip to main content
    </a>
  );
};