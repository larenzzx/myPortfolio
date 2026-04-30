import { useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await emailjs.send(
        "service_vyz19ms",
        "template_gv1chvm",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "abQOvAcfydX4GgF5f"
      );
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="card border border-base-content/10 bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <svg className="h-7 w-7 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-base-content">Send a Message</h3>
            <p className="mt-1 text-sm text-base-content/60">
              Fill out the form and I&apos;ll get back to you soon.
            </p>
          </div>

          {/* Success / error alerts */}
          {isSubmitted && (
            <div className="alert alert-success mb-4">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Message sent successfully!</span>
            </div>
          )}
          {errors.submit && (
            <div className="alert alert-error mb-4">
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name + Email row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="form-control">
                <label className="label pb-1" htmlFor="name">
                  <span className="label-text font-medium">
                    Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className={`input input-bordered w-full focus:input-primary transition-all duration-200 ${
                    errors.name ? "input-error" : ""
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.name && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error">{errors.name}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label pb-1" htmlFor="email">
                  <span className="label-text font-medium">
                    Email <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className={`input input-bordered w-full focus:input-primary transition-all duration-200 ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.email && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="form-control">
              <label className="label pb-1" htmlFor="subject">
                <span className="label-text font-medium">
                  Subject <span className="text-error">*</span>
                </span>
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What is this about?"
                className={`input input-bordered w-full focus:input-primary transition-all duration-200 ${
                  errors.subject ? "input-error" : ""
                }`}
                value={formData.subject}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.subject && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error">{errors.subject}</span>
                </label>
              )}
            </div>

            {/* Message */}
            <div className="form-control">
              <label className="label pb-1" htmlFor="message">
                <span className="label-text font-medium">
                  Message <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={500}
                className={`textarea textarea-bordered w-full resize-none focus:textarea-primary transition-all duration-200 ${
                  errors.message ? "textarea-error" : ""
                }`}
                placeholder="Tell me about your project or inquiry..."
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.message && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error">{errors.message}</span>
                </label>
              )}
              <label className="label pt-1">
                <span className="label-text-alt text-base-content/40">
                  {formData.message.length}/500
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="form-control pt-2">
              <button
                type="submit"
                className="btn btn-primary w-full transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
