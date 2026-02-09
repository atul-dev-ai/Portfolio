"use server";

import { Resend } from "resend";
import { EmailTemplate } from "./email-template";
import * as React from "react";

const resend = new Resend(process.env.re_WMypeu89_CGmeQ7LoXduyhYzKpfGFRHhr);

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
      to: "atul11tem@gmail.com",
      subject: `New Message: ${subject}`,
      replyTo: email,
      // ⚠️ আগে ভুল ছিল এখানে, এখন ঠিক করা হলো JSX দিয়ে
      react: (
        <EmailTemplate
          name={name}
          email={email}
          message={message}
          subject={subject}
        />
      ),
    });

    if (data.error) {
      console.error("Resend Validation Error:", data.error);
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Resend Server Error:", error);
    return { error: error.message || "Something went wrong" };
  }
};