export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-ink mt-8">
      <aside className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
        <p className="font-mono text-[10px] text-gray-400">© {new Date().getFullYear()} Mark Larenz Tabotabo. All rights reserved.</p>
        <p className="font-mono text-[10px] uppercase tracking-[1.5px] text-gray-400">
          Web Development · Cybersecurity · IT
        </p>
      </aside>
    </footer>
  );
};
