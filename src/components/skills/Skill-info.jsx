export const SkillInfo = ({ info }) => {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-xl font-bold text-base-content md:text-2xl">
        {info}
      </h3>
      <div className="mx-auto h-0.5 w-16 rounded-full bg-accent"></div>
    </div>
  );
};
