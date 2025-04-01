import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInLeft, fadeInRight, fadeInUp, scaleUp } from '../utils/animations';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isSectionInView = useScrollAnimation(sectionRef, { threshold: 0.1 });
  const isImageInView = useScrollAnimation(imageRef, { threshold: 0.2 });
  const isContentInView = useScrollAnimation(contentRef, { threshold: 0.2 });

  return (
    <section id="about" className="py-16 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
          <motion.div
            className="h-1 w-20 bg-indigo-600 mx-auto mt-2"
            initial={{ width: 0 }}
            animate={isSectionInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column with image */}
          <motion.div
            className="flex justify-center"
            ref={imageRef}
            variants={fadeInLeft}
            initial="hidden"
            animate={isImageInView ? "visible" : "hidden"}
          >
            <motion.div
              className="w-full max-w-md bg-gray-100 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                rotate: 2
              }}
            >
              {/* Replace with actual image */}
              <div className="aspect-w-4 aspect-h-5 bg-gray-300 flex items-center justify-center">
                <motion.svg
                  className="w-32 h-32 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={isImageInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -10 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                >
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </motion.svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column with text */}
          <motion.div
            ref={contentRef}
            variants={fadeInRight}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Who I Am
            </motion.h3>
            <motion.p
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I'm a passionate full-stack developer with expertise in modern web technologies.
              With over 5 years of experience in the industry, I've worked on a variety of projects
              from small business websites to complex enterprise applications.
            </motion.p>
            <motion.p
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              My journey into web development started during my university years, where I discovered
              my passion for creating beautiful, functional web applications. Since then, I've been
              continuously learning and improving my skills to stay up-to-date with the latest technologies.
            </motion.p>
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              variants={scaleUp}
            >
              {[
                { title: 'Name:', value: 'John Doe' },
                { title: 'Email:', value: 'john@example.com' },
                { title: 'Location:', value: 'San Francisco, CA' },
                { title: 'Availability:', value: 'Open to opportunities' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                >
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-gray-600">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.a
              href="#contact"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
