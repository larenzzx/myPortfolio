export const SectionTitle = ({ title, id }) => {
  return (
    <div
      id={id}
      className="grid place-items-center bg-gradient-to-r from-primary to-secondary bg-clip-text pb-6 pt-28 text-4xl font-bold text-transparent sm:text-5xl"
    >
      <h1>{title}</h1>
      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
    </div>
  );
};
