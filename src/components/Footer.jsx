export const Footer = () => {
  return (
    <footer className="rounded-3xl border border-base-content/10 bg-base-100 px-5 py-6 text-base-content shadow-sm">
      <aside className="flex flex-col items-center justify-between gap-2 text-center text-sm text-base-content/60 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Mark Larenz Tabotabo. All rights reserved.</p>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Web Development · Cybersecurity · IT
        </p>
      </aside>
    </footer>
  );
};
