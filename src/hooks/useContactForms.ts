import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const useContactForms = (supabase: SupabaseClient) => {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Récupérer les messages de contact
  const fetchContactForms = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("contact_forms").select("*");
    setIsLoading(false);

    if (error) {
      console.error("Erreur lors de la récupération des messages:", error);
      return [];
    }
    return data;
  };

  // Insérer un message de contact
  const insertContactForm = async (data: ContactForm) => {
    setIsLoading(true);
    const { error } = await supabase.from("contact_forms").insert([data]);

    if (error) {
      console.error("Erreur lors de l'insertion des données:", error);
      setStatusMessage("Erreur lors de l'envoi du message.");
      setIsLoading(false);
      return;
    }

    setStatusMessage("Message envoyé avec succès!");
    setIsLoading(false);
  };

  return {
    fetchContactForms,
    insertContactForm,
    statusMessage,
    isLoading,
  };
};
