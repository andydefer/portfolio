import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  insertContactFormToDB,
  sendToFormspree,
} from "../utils/contactFormHelpers";
import { ContactFormData, contactFormSchema } from "../utils/formSchema";
import Captcha from "./Captcha";

// Définition du schéma de validation avec Zod

const ContactForm = () => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: string;
    text: string;
  }>({ type: "", text: "" });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    console.log("change");
  }, []);
  // Effacer le message après 5 secondes
  useEffect(() => {
    if (submitMessage.text) {
      const timer = setTimeout(() => {
        setSubmitMessage({ type: "", text: "" }); // Réinitialiser le message après 5 secondes
      }, 6000);

      return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
    }
  }, [submitMessage]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitMessage({ type: "loading", text: "Envoi en cours..." });
    const dataWithoutToken: Partial<ContactFormData> = data;
    delete dataWithoutToken.captchaToken;
    try {
      await insertContactFormToDB(data);

      await Promise.all([sendToFormspree(data)]);
      setSubmitMessage({
        type: "success",
        text: "Merci! Votre message a été envoyé.",
      });
      reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setSubmitMessage({
        type: "error",
        text: "Une erreur est survenue, veuillez réessayer.",
      });
    }
  };

  return (
    <section id="contact" className="pb-4 pt-8 bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-2 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Me contacter</h2>
          <motion.div
            className="h-1 w-20 bg-indigo-600 mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Vous avez une question ou souhaitez collaborer ? N'hésitez pas à me
            contacter en utilisant le formulaire ci-dessous.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-sm"
                  />
                )}
              />
              {errors.name && (
                <motion.p
                  className="text-red-500 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-sm"
                  />
                )}
              />
              {errors.email && (
                <motion.p
                  className="text-red-500 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Sujet
              </label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="subject"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-sm"
                  />
                )}
              />
              {errors.subject && (
                <motion.p
                  className="text-red-500 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="message"
                    rows={4}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-sm"
                  />
                )}
              />
              {errors.message && (
                <motion.p
                  className="text-red-500 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.message.message}
                </motion.p>
              )}
            </div>
            <div className="mb-4">
              <Controller
                name="captchaToken"
                control={control}
                defaultValue=""
                rules={{
                  required: "Veuillez valider le captcha.",
                  validate: (value) =>
                    value === "correct" || "Captcha incorrect.", // Vérifiez la réponse ici
                }}
                render={({ field }) => <Captcha onChange={field.onChange} />}
              />
              {errors.captchaToken && (
                <motion.p
                  className="text-red-500 text-xs text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.captchaToken.message}
                </motion.p>
              )}
            </div>

            <div className="mb-4 grid items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white p-3 rounded-sm hover:bg-indigo-700 transition"
              >
                {isSubmitting ? "..." : "Envoyer le message"}
              </button>
              {submitMessage.text && (
                <motion.div
                  className={`mt-4 w-auto transform mx-auto px-4 py-2 rounded-lg text-white text-sm ${
                    submitMessage.type === "error"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>{submitMessage.text}</p>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
