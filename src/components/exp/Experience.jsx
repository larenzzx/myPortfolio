import { ObserverProvider } from "../ObserverProvider";
import { SectionTitle } from "../SectionTitle";

export const Experience = () => {
  return (
    <div className="container min-h-screen">
      <ObserverProvider>
        {/* <div
          id="#exp"
          className="grid place-items-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text pb-6 pt-20 text-4xl font-bold text-transparent sm:text-5xl"
        >
          <h1>Experience</h1>
        </div> */}
        <SectionTitle id="exp" title="Experience" />

        <div className="intersect-once px-4 py-8 intersect:motion-translate-y-in-100 intersect:motion-duration-[2s] intersect:motion-ease-spring-smooth">
          <div className="mx-auto max-w-3xl space-y-6 text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
              Full-Stack Developer at Innovix (Jan - May 2024)
            </h2>
            <p className="text-sm sm:text-base">
              During the school year 2023-2024, I worked as a full-stack
              developer under the company name{" "}
              <span className="font-medium text-primary">Innovix</span> for our
              Software Engineering project. Our team collaborated with our
              client from {" "}
              <span className="font-medium text-primary">WESMAARRDEC</span>, to
              develop a comprehensive{" "}
              <span className="font-medium text-primary">
                Event Management System
              </span>
              . The system was tailored to streamline event planning and
              coordination for the organization, helping improve efficiency and
              information management.
            </p>
            <p className="text-sm sm:text-base">
              In addition to this project, I have gained valuable experience
              working on{" "}
              <span className="font-medium text-primary">e-commerce</span>{" "}
              website development and successfully completing our{" "}
              <span className="font-medium text-primary">Capstone project</span>
              . We also presented our{" "}
              <span className="font-medium text-primary">Capstone project</span>{" "}
              at a research forum, showcasing our work and innovations. These
              diverse experiences have strengthened my skills in both frontend
              and backend development.
            </p>
          </div>
        </div>
      </ObserverProvider>
    </div>
  );
};
