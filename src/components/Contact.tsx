import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { fadeInLeft, fadeInUp, staggerContainer } from "../utils/animations";
import ContactForm from "./ContactForm";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "Andy Kani",
    email: "andykanidimbu@gmail.com",
    subject: "Demande de devis",
    message: "Je souhaite obtenir un devis pour mon site",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Refs for animation triggers
  const sectionRef = useRef<HTMLElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  const isSectionInView = useScrollAnimation(sectionRef, { threshold: 0.1 });
  const isContactInfoInView = useScrollAnimation(contactInfoRef, {
    threshold: 0.2,
  });
  const isContactFormInView = useScrollAnimation(contactFormRef, {
    threshold: 0.2,
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    // Set submitting state and clear previous messages
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    // Simulate API call with timeout
    try {
      // Normally, you'd send the form data to your backend here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setSubmitMessage({
        type: "success",
        text: "Merci! Votre message a été envoyé avec succès.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Show error message
      setSubmitMessage({
        type: "error",
        text: "Désolé, il y a eu une erreur lors de l'envoi de votre message. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media icon animation variants
  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.1 + 0.5,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  };

  return (
    <section id="contact" className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md max-h-[44rem]"
            ref={contactInfoRef}
            variants={fadeInLeft}
            initial="hidden"
            animate={isContactInfoInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isContactInfoInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Informations de contact
            </motion.h3>

            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isContactInfoInView ? "visible" : "hidden"}
            >
              {/* Email */}
              <motion.div
                className="flex items-start"
                variants={fadeInUp}
                custom={0}
              >
                <motion.div
                  className="flex-shrink-0 bg-indigo-100 p-3 rounded-full text-indigo-600"
                  whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Adresse e-mail
                  </h4>
                  <motion.p
                    className="text-gray-600 mt-1"
                    whileHover={{ scale: 1.02, x: 5, color: "#4F46E5" }}
                  >
                    andykanidimbu@gmail.com
                  </motion.p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex items-start"
                variants={fadeInUp}
                custom={1}
              >
                <motion.div
                  className="flex-shrink-0 bg-indigo-100 p-3 rounded-full text-indigo-600"
                  whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Télephone
                  </h4>
                  <motion.p
                    className="text-gray-600 mt-1"
                    whileHover={{ scale: 1.02, x: 5, color: "#4F46E5" }}
                  >
                    (+243) 827 833 329
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Adresse Complète */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col space-y-6 gap-3 mt-8"
            >
              <motion.div
                className="flex items-start"
                variants={fadeInUp}
                custom={3}
              >
                <motion.div
                  className="flex-shrink-0 bg-indigo-100 p-3 rounded-full text-indigo-600"
                  whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A2 2 0 013 15.382V8.618a2 2 0 01.553-1.894L9 4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 20l5.447-2.724A2 2 0 0021 15.382V8.618a2 2 0 00-.553-1.894L15 4"
                    />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Adresse Complète
                  </h4>
                  <motion.p
                    className="text-gray-600 mt-1"
                    whileHover={{ scale: 1.02, x: 5, color: "#4F46E5" }}
                  >
                    45, Quartier K, Cité des Anciens Combattants, Ngaliema,
                    Kinshasa
                  </motion.p>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                className="flex items-start"
                variants={fadeInUp}
                custom={5}
              >
                <motion.div
                  className="flex-shrink-0 bg-indigo-100 p-3 rounded-full text-indigo-600"
                  whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16.862 17.657l-2.475-.825a1 1 0 00-.949.166 6.523 6.523 0 01-3.245 1.024A6.5 6.5 0 015.5 7.5C5.5 4.462 8.462 2 11.5 2a6.5 6.5 0 016.5 6.5c0 2.032-1.08 3.903-2.928 5.157z"
                    />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    WhatsApp
                  </h4>
                  <motion.a
                    href="https://wa.me/243827833329"
                    className="text-gray-600 mt-1"
                    whileHover={{ scale: 1.02, x: 5, color: "#4F46E5" }}
                  >
                    +243 827 833 329
                  </motion.a>
                </div>
              </motion.div>

              {/* Horaires d'ouverture */}
              <motion.div
                className="flex items-start"
                variants={fadeInUp}
                custom={6}
              >
                <motion.div
                  className="flex-shrink-0 bg-indigo-100 p-3 rounded-full text-indigo-600"
                  whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Horaires
                  </h4>
                  <motion.p
                    className="text-gray-600 mt-1"
                    whileHover={{ scale: 1.02, x: 5, color: "#4F46E5" }}
                  >
                    Lundi - Vendredi : 08h00 - 17h00
                  </motion.p>
                </div>
              </motion.div>
              {/* Social Media Links */}
              <motion.div
                className="mt-8 flex items-center justify-between font-semibold"
                initial={{ opacity: 0 }}
                animate={isContactInfoInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h4 className="text-sm md:text-md font-medium text-gray-900 ">
                  Prenez Contact
                </h4>
                <div className="flex space-x-4">
                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/andydefer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
                    variants={socialIconVariants}
                    custom={0}
                    initial="hidden"
                    animate={isContactInfoInView ? "visible" : "hidden"}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://linkedin.com/in/andy-kani-3751a1249"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    variants={socialIconVariants}
                    custom={1}
                    initial="hidden"
                    animate={isContactInfoInView ? "visible" : "hidden"}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.a>

                  {/* Twitter */}
                  <motion.a
                    href="https://x.com/AndreDefer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                    variants={socialIconVariants}
                    custom={2}
                    initial="hidden"
                    animate={isContactInfoInView ? "visible" : "hidden"}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
