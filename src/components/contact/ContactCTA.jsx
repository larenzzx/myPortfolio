import { useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS
      const result = await emailjs.send(
        "service_vyz19ms", 
        "template_gv1chvm", 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "abQOvAcfydX4GgF5f", 
      );

      console.log("SUCCESS!", result.text);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("FAILED...", error.text);
      
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl mb-8">
      <div className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <svg
                className="h-8 w-8 text-primary-content"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-base-content">
              Send Message
            </h3>
            <p className="text-base-content/70">
              Fill out the form below and I'll get back to you as soon as
              possible.
            </p>
          </div>

          {isSubmitted && (
            <div className="alert alert-success mb-6 animate-pulse">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {errors.submit && (
            <div className="alert alert-error mb-6">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className={`input input-bordered w-full transition-all duration-300 focus:input-primary ${
                    errors.name ? "input-error" : ""
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.name}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Email <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className={`input input-bordered w-full transition-all duration-300 focus:input-primary ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Message <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                name="message"
                className={`textarea textarea-bordered h-32 w-full resize-none transition-all duration-300 focus:textarea-primary ${
                  errors.message ? "textarea-error" : ""
                }`}
                placeholder="Input message here"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              ></textarea>
              {errors.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.message}
                  </span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  {formData.message.length}/500 characters
                </span>
              </label>
            </div>

            <div className="form-control pt-4">
              <button
                type="submit"
                className={`btn btn-primary btn-lg w-full transition-all duration-300 ${
                  isLoading ? "loading" : ""
                } hover:scale-[1.02] hover:shadow-lg`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 text-center">
              <p className="text-sm text-base-content/60">
                By sending this message, you agree to be contacted regarding
                your inquiry.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute left-10 top-10 -z-10 h-20 w-20 animate-pulse rounded-full bg-primary/5 blur-xl"></div>
      <div className="absolute bottom-10 right-10 -z-10 h-32 w-32 animate-pulse rounded-full bg-secondary/5 blur-xl delay-1000"></div>
    </div>
  );
};
