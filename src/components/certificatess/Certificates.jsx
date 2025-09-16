import React from "react";
import { CertificateCard } from "./CertificateCard";
import { SectionTitle } from "../SectionTitle";
import frontCert from "../../assets/frontCert.png";
import jsCert from "../../assets/jsCert.png";
import reactCert from "../../assets/reactCert.png";
import webCert from "../../assets/webCert.png";
import dataStruc from "../../assets/dataStruc.png";

const certificates = [
  {
    title: "Introduction to Front End Development",
    image: frontCert,
  },
  {
    title: "JavaScript for Beginners",
    image: jsCert,
  },
  {
    title: "ReactJS for Beginners",
    image: reactCert,
  },
  {
    title: "Responsive Web Design",
    image: webCert,
  },
  {
    title: "Responsive Web Design",
    image: dataStruc,
  }
];

export const Certificates = () => {
  return (
    <>
      <div className="container mb-12">
          <SectionTitle id="certs" title={"My Certificates"} />
          <section>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert, index) => (
                <CertificateCard key={index} certificate={cert} />
              ))}
            </div>
          </section>
      </div>
    </>
  );
};
