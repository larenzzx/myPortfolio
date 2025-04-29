import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ObserverProvider } from "../ObserverProvider";

export const ContactMe = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.from_name.value.trim();
    const email = form.current.from_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill out all fields before sending!",
      });
      return;
    }

    emailjs
      .sendForm("service_vyz19ms", "template_gv1chvm", form.current, {
        publicKey: "abQOvAcfydX4GgF5f",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Message sent successfully!",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Failed to send. Try again.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        },
      );
  };

  return (
    <ObserverProvider>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-4 rounded-2xl bg-gray-800 bg-opacity-10 p-4 sm:p-6 md:p-8 text-center shadow-lg shadow-[rgba(255,255,255,0.1)] backdrop-blur-md intersect-once intersect:motion-translate-y-in-100 intersect:motion-duration-[2s] intersect:motion-ease-spring-smooth"
      >
        <div className="grid gap-y-4 sm:grid-cols-2 sm:justify-center sm:gap-x-2 md:gap-x-4">
          <input
            type="text"
            className="input input-bordered w-full bg-gray-400 bg-opacity-10 bg-clip-padding"
            placeholder="Name"
            name="from_name"
            required
          />
          <input
            type="email"
            className="input input-bordered w-full bg-gray-400 bg-opacity-10 bg-clip-padding"
            name="from_email"
            placeholder="Email"
            required
          />
        </div>

        <textarea
          className="textarea textarea-bordered min-h-32 w-full bg-gray-400 bg-opacity-10 bg-clip-padding sm:min-h-40 md:min-h-48"
          name="message"
          placeholder="Write your message here"
          required
        ></textarea>

        <input
          type="submit"
          className="btn btn-primary w-full"
          value="Send message"
        />

        <div className="divider text-sm">OR REACH ME AT</div>

        <div className="flex items-center justify-center gap-4">
          <a href="mailto:marklarenztabotabo@gmail.com">
            <Mail size={24} />
          </a>
          <a
            href="https://www.facebook.com/share/1BtPFnE8wm/?mibextid=wwXIfr"
            className="text-xl"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmark-larenz-tabotabo-681216346%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dios_app&h=AT2cGGHZ4TPk14HKpse10IUrdxA6vst8idrh0JxVZUbOiTPNR3YMoIV6B1YUdzPssmV4qb5Xvo8qcKcDnT9fjdS06XeYCQOmfCoP6Qj3AtcWpB3fUYzq723Y_IjsX7uDVxflj1I5LMtpw2avbHLOQQ"
            className="text-xl"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://l.messenger.com/l.php?u=https%3A%2F%2Fx.com%2Flarenzz15%3Fs%3D11&h=AT2cGGHZ4TPk14HKpse10IUrdxA6vst8idrh0JxVZUbOiTPNR3YMoIV6B1YUdzPssmV4qb5Xvo8qcKcDnT9fjdS06XeYCQOmfCoP6Qj3AtcWpB3fUYzq723Y_IjsX7uDVxflj1I5LMtpw2avbHLOQQ"
            className="text-xl"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </form>
    </ObserverProvider>
  );
};
