"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/email-template";

const resend = new Resend(process.env.re_FMHZWico_5UMioZbZK3M2YomBsEPdChdK);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("user_name") as string;
  const email = formData.get("user_email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "atul11tem@gmail.com", // আপনার ইমেইল ঠিক আছে তো?
      subject: `New Message: ${subject}`,
      replyTo: email,
      react: EmailTemplate({
        name,
        email,
        message,
        subject,
      }),
    });

    if (data.error) {
      console.error("Resend Validation Error:", data.error);
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error: any) {
    // এই লাইনটি টার্মিনালে আসল সমস্যা প্রিন্ট করবে
    console.error("Resend Server Error:", error);

    // এরর মেসেজটি ক্লায়েন্টে পাঠাবে
    return { error: error.message || "Something went wrong" };
  }
};
