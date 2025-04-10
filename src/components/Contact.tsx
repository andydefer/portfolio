import React, { useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
