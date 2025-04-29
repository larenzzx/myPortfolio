import { SectionTitle } from "../SectionTitle";
import { ContactMe } from "./ContactCTA";

export const Contact = () => {
  return (
    <div className="container min-h-screen">
      <SectionTitle id="contact" title="Contact Me" />
      <ContactMe />
    </div>
  );
};
