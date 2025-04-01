import { motion } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer } from "../utils/animations";
import { data } from "../utils/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isFooterInView = useScrollAnimation(footerRef, { threshold: 0.1 });

  // Link hover animation
  const linkHoverVariants = {
    hover: {
      x: 5,
      color: "#fff",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Social icon animation variants
  const socialIconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.footer className="bg-gray-900 text-white" ref={footerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          animate={isFooterInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Logo and about */}
          <motion.div
            className="col-span-1 md:col-span-2"
            variants={fadeInUp}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            <motion.h3
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Andy Kani
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-4 max-w-md"
              initial={{ opacity: 0 }}
              animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Développeur web et mobile, entrepreneur passionné par la création
              de solutions numériques innovantes et performantes.
            </motion.p>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Basé à Kinshasa, RDC
            </motion.p>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeInUp} custom={1}>
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Liens rapide
            </motion.h4>
            <motion.ul
              className="space-y-2"
              variants={staggerContainer}
              initial="hidden"
              animate={isFooterInView ? "visible" : "hidden"}
            >
              {data.routes.map((item, index) => (
                <motion.li
                  key={item.name}
                  variants={fadeInUp}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.a
                    href={`#${item.link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                    variants={linkHoverVariants}
                  >
                    {item.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} custom={2}>
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Contact
            </motion.h4>
            <motion.ul
              className="space-y-2"
              variants={staggerContainer}
              initial="hidden"
              animate={isFooterInView ? "visible" : "hidden"}
            >
              <motion.li
                className="flex items-center"
                variants={fadeInUp}
                custom={0}
              >
                <motion.svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  whileHover={{ scale: 1.2, color: "#E0E7FF" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </motion.svg>
                <motion.a
                  href="mailto:andykanidimbu@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 3, color: "#fff" }}
                >
                  andykanidimbu@gmail.com
                </motion.a>
              </motion.li>
              <motion.li
                className="flex items-center"
                variants={fadeInUp}
                custom={1}
              >
                <motion.svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  whileHover={{ scale: 1.2, color: "#E0E7FF" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </motion.svg>
                <motion.span
                  className="text-gray-400"
                  whileHover={{ x: 3, color: "#fff" }}
                >
                  (+243) 827 833 329
                </motion.span>
              </motion.li>
            </motion.ul>

            {/* Social icons */}
            <motion.div
              className="flex space-x-3 mt-4"
              initial={{ opacity: 0 }}
              animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {[
                { icon: "github", href: "https://github.com/andydefer/" },
                {
                  icon: "linkedin",
                  href: "https://linkedin.com/in/andy-kani-3751a1249",
                },
                { icon: "twitter", href: "https://x.com/AndreDefer" },
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  variants={socialIconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {social.icon === "github" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={
              isFooterInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            &copy; {currentYear} {data.appName}. All rights reserved.
          </motion.p>
          <motion.p
            className="mt-2 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={
              isFooterInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 1 }}
          >
            Conçu et développé avec {"AndyKani DevServices "}
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={
                isFooterInView
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.5, opacity: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 1.2,
              }}
              whileHover={{
                scale: 1.3,
                rotate: [0, -10, 10, -10, 10, 0],
                transition: {
                  duration: 0.5,
                },
              }}
              className="inline-block"
            >
              ❤️
            </motion.span>{" "}
            En utilisant React et Tailwind CSS
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
