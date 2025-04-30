import { SectionTitle } from "../SectionTitle";
import { ContactMe } from "./ContactCTA";

export const Contact = () => {
  return (
    <div className="container grid min-h-screen">
      <SectionTitle id="contact" title="Contact Me" />
      <div className="w-full">
        <ContactMe />
      </div>
    </div>
  );
};
