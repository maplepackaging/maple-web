import { supabase } from "./supabase";

// Newsletter subscription
export async function subscribeToNewsletter(email: string, source = "website") {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email, source });

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "You're already subscribed!" };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
  return { success: true, message: "Welcome to the Maple family!" };
}

// Contact form submission
export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) {
    return { success: false, message: "Failed to send. Please try again." };
  }
  return { success: true, message: "Message sent! We'll respond within 24 hours." };
}

// Custom order enquiry
export async function submitCustomEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  product_type: string;
  quantity: string;
  requirements: string;
}) {
  const { error } = await supabase.from("custom_enquiries").insert(data);
  if (error) {
    return { success: false, message: "Failed to submit. Please try again." };
  }
  return { success: true, message: "Enquiry received! We'll get back within 24 hours." };
}
