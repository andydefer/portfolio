import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp } from "../utils/animations";
import { data } from "../utils/data";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-blue-100 to-purple-100 pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        {/* Left column with text */}
        <motion.div
          className="md:w-1/2 md:pr-8 mb-8 mt-3 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={fadeInUp}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Salut, Je Suis
            </motion.span>
            <motion.span
              className="block text-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {data.appName}
            </motion.span>
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Développeur Full Stack Web & Mobile
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Je crée des applications web et des applications Android, pensés
            pour offrir une expérience fluide sur tous les appareils. Chaque
            projet est conçu pour valoriser votre image et répondre concrètement
            à vos objectifs.
          </motion.p>
          <motion.div
            className="flex flex-nowrap  gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Me Contacter
            </motion.a>
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Mes Réalisations
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right column with profile image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeInRight}
        >
          <motion.div
            className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full overflow-hidden shadow-xl border-4 border-white"
            whileHover={{
              scale: 1.05,
              rotate: 5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Replace with your profile image */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <motion.img
                className="text-gray-500"
                src="/assets/andy-classe.png"
                alt="Profile icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.2,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
