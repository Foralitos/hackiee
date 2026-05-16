export default function PageShell({ children, className = "" }) {
  return (
    <main
      className={`min-h-[calc(100vh-4rem)] max-w-5xl mx-auto px-6 py-12 ${className}`}
    >
      {children}
    </main>
  );
}
