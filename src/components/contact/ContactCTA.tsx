import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";

export const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
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
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg shadow-sm">
        <div className="p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-4 border-b border-gray-200/60 dark:border-gray-800/60 pb-5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-build/15 bg-build/5 text-build">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink font-serif">Send a Message</h3>
              <p className="mt-1 text-sm text-gray-500">
                Fill out the form and I&apos;ll get back to you soon.
              </p>
            </div>
          </div>

          {/* Success / error alerts */}
          {isSubmitted && (
            <div className="border border-green-500/20 bg-green-500/5 text-green-500 rounded-xl p-4 flex items-center gap-3 text-sm mb-4 font-mono">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Message sent successfully!</span>
            </div>
          )}
          {errors.submit && (
            <div className="border border-defend/20 bg-defend/5 text-defend rounded-xl p-4 flex items-center gap-3 text-sm mb-4 font-mono">
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name + Email row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400" htmlFor="name">
                  Name <span className="text-defend">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className={`w-full rounded-xl border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-build/50 focus:ring-2 focus:ring-build/10 disabled:opacity-50 ${
                    errors.name ? "border-defend/50 ring-2 ring-defend/10" : "border-gray-200 dark:border-gray-800"
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.name && (
                  <span className="text-[10px] font-mono text-defend">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400" htmlFor="email">
                  Email <span className="text-defend">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className={`w-full rounded-xl border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-build/50 focus:ring-2 focus:ring-build/10 disabled:opacity-50 ${
                    errors.email ? "border-defend/50 ring-2 ring-defend/10" : "border-gray-200 dark:border-gray-800"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-[10px] font-mono text-defend">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400" htmlFor="subject">
                Subject <span className="text-defend">*</span>
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What is this about?"
                className={`w-full rounded-xl border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-build/50 focus:ring-2 focus:ring-build/10 disabled:opacity-50 ${
                  errors.subject ? "border-defend/50 ring-2 ring-defend/10" : "border-gray-200 dark:border-gray-800"
                }`}
                value={formData.subject}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.subject && (
                <span className="text-[10px] font-mono text-defend">{errors.subject}</span>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400" htmlFor="message">
                Message <span className="text-defend">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={500}
                className={`w-full rounded-xl border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-build/50 focus:ring-2 focus:ring-build/10 disabled:opacity-50 resize-none ${
                  errors.message ? "border-defend/50 ring-2 ring-defend/10" : "border-gray-200 dark:border-gray-800"
                }`}
                placeholder="Tell me about your project or inquiry..."
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.message && (
                <span className="text-[10px] font-mono text-defend">{errors.message}</span>
              )}
              <span className="text-[10px] font-mono text-right text-gray-400">
                {formData.message.length}/500
              </span>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-bg border-t-transparent rounded-full animate-spin mr-1.5" />
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
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
