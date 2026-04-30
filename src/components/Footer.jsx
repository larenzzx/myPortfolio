export const Footer = () => {
  return (
    <footer className="border-t border-base-content/10 bg-base-100 px-4 py-6 text-base-content">
      <aside className="container mx-auto flex flex-col items-center justify-between gap-2 text-center text-sm text-base-content/60 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Mark Larenz Tabotabo. All rights reserved.</p>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Web Development · Cybersecurity · IT
        </p>
      </aside>
    </footer>
  );
};
