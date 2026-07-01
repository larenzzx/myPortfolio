export const Footer = () => {
  return (
    <footer className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-6 text-ink shadow-sm">
      <aside className="flex flex-col items-center justify-between gap-2 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
        <p className="font-mono text-[11px]">© {new Date().getFullYear()} Mark Larenz Tabotabo. All rights reserved.</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-build">
          Web Development · Cybersecurity · IT
        </p>
      </aside>
    </footer>
  );
};
