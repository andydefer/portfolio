// utils/contactFormHelpers.ts

import axios from "axios";
import { ContactFormData } from "../types/contactForm";
import createSupabaseClient from "./supabaseClient";

export const insertContactFormToDB = async (data: ContactFormData) => {
  const supabase = createSupabaseClient();
  const { error, status } = await supabase.from("contact_forms").insert(data);

  if (error || status !== 201) {
    throw new Error("Erreur lors de l'insertion dans la base de données.");
  }
};

export const sendToFormspree = async (data: ContactFormData) => {
  await axios.post("https://formspree.io/f/xblgqkad", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const sendEmailNotification = async (data: ContactFormData) => {
  await axios.post("/.netlify/functions/send-email", data, {
    headers: { "Content-Type": "application/json" },
  });
};
