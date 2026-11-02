import { send } from "@emailjs/browser";

// EmailJS keys (dashboard.emailjs.com). They are public by design: EmailJS limits who can send
// through the "Allowed origins" and rate-limit settings in its dashboard, not by hiding these.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export const emailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/** Fields of the contact form. Use the same names as {{variables}} in the EmailJS template. */
export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message: string;
};

/** Sends the contact form through EmailJS. Throws if it isn't set up or the send fails. */
export async function sendContactEmail(message: ContactMessage) {
  if (!emailConfigured) throw new Error("EmailJS keys are missing (NEXT_PUBLIC_EMAILJS_*)");
  await send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      ...message,
      phone: message.phone || "Not given",
      organization: message.organization || "Not given",
      subject: message.subject || "General enquiry",
      reply_to: message.email, // lets "Reply" in the inbox go straight to the sender
      sent_at: new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }),
    },
    {
      publicKey: PUBLIC_KEY,
      blockHeadless: true, // ignores headless-browser bots
      limitRate: { id: "contact-form", throttle: 10_000 }, // one message per 10 seconds per visitor
    },
  );
}
