import React from "react";

export const CertificateCard = ({ certificate }) => {
  return (
    <div className="glass rounded-lg shadow-md duration-300 ease-in-out hover:scale-105">
      <img
        src={certificate.image}
        alt={certificate.title}
        className="border border-gray-200 object-cover rounded-xl"
      />
    </div>
  );
};
