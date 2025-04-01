import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, scaleUp, staggerContainer } from '../utils/animations';

// Project card component with animation
const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl
}: {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useScrollAnimation(cardRef, { threshold: 0.1 });

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Project image */}
      <motion.div
        className="h-48 bg-gray-300 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <motion.svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -10 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                type: "spring",
                stiffness: 200
              }}
            >
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </motion.svg>
          </div>
        )}
      </motion.div>

      {/* Project details */}
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.h3
          className="text-xl font-semibold text-gray-900 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tags.map((tag) => (
            <motion.span
              key={`${title}-${tag}`}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
              variants={fadeInUp}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#C7D2FE",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with product management, cart functionality, and payment processing.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      imageUrl: "",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics with real-time data visualization.",
      tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
      imageUrl: "",
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features.",
      tags: ["TypeScript", "React", "Express", "Socket.io"],
      imageUrl: "",
    },
    {
      id: 4,
      title: "Weather Forecast App",
      description: "Location-based weather forecast application with 7-day predictions and historical data.",
      tags: ["JavaScript", "OpenWeather API", "Chart.js"],
      imageUrl: "",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Personal portfolio website built with modern web technologies.",
      tags: ["React", "Tailwind CSS", "Vite"],
      imageUrl: "",
    },
    {
      id: 6,
      title: "Recipe Finder App",
      description: "Recipe search and saving application with filtering by ingredients and dietary restrictions.",
      tags: ["React", "Redux", "Food API"],
      imageUrl: "",
    },
  ];

  // Filter state
  const [activeFilter, setActiveFilter] = useState("All");

  // Get unique tags for filter buttons
  const allTags = ["All", ...new Set(projects.flatMap(project => project.tags))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  // Refs for animation triggers
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useScrollAnimation(sectionRef, { threshold: 0.1 });

  return (
    <section id="projects" className="py-16 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">My Projects</h2>
          <motion.div
            className="h-1 w-20 bg-indigo-600 mx-auto mt-2"
            initial={{ width: 0 }}
            animate={isSectionInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Here are some projects I've worked on. Each project demonstrates different skills and technologies.
          </motion.p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeFilter === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.7 + (index * 0.05),
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
