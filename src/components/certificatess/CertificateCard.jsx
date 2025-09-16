import React from "react";
import { ObserverProvider } from "../ObserverProvider";
export const CertificateCard = ({ certificate }) => {
  return (
    <ObserverProvider>
      <div className="glass rounded-lg shadow-md duration-300 ease-in-out hover:scale-105 intersect-once intersect:motion-translate-x-in-[-57%] intersect:motion-translate-y-in-[2%]">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="rounded-xl border border-gray-200 object-cover"
        />
      </div>
    </ObserverProvider>
  );
};
