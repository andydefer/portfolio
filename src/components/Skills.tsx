import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer } from "../utils/animations";

// Skill progress component with animation
const SkillProgress = ({
  name,
  percentage,
}: {
  name: string;
  percentage: number;
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const isInView = useScrollAnimation(progressRef, { threshold: 0.1 });

  return (
    <motion.div
      className="mb-6"
      ref={progressRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-gray-700 font-medium">{name}</h4>
        <motion.span
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-indigo-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Technology item component with animation
const TechItem = ({ name, icon }: { name: string; icon: React.ReactNode }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="text-indigo-600 mb-2 text-3xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <motion.h4
        className="font-medium text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {name}
      </motion.h4>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const isSectionInView = useScrollAnimation(sectionRef, { threshold: 0.1 });
  const isFrontendInView = useScrollAnimation(frontendRef, { threshold: 0.2 });
  const isBackendInView = useScrollAnimation(backendRef, { threshold: 0.2 });
  const isTechInView = useScrollAnimation(techRef, { threshold: 0.1 });
  // Frontend skills
  const frontendSkills = [
    { name: "React", percentage: 90 },
    { name: "TypeScript", percentage: 85 },
    { name: "HTML/CSS", percentage: 95 },
    { name: "Vue.js", percentage: 80 },
    { name: "TailwindCSS", percentage: 85 },
  ];

  // Backend skills
  const backendSkills = [
    { name: "Node.js", percentage: 85 },
    { name: "Express", percentage: 80 },
    { name: "PHP", percentage: 80 },
    { name: "Symfony", percentage: 75 },
    { name: "Laravel", percentage: 80 },
  ];

  const otherSkills = [
    { name: "SQL", percentage: 75 },
    { name: "Android Development", percentage: 75 },
    { name: "Git", percentage: 90 },
    { name: "Docker", percentage: 80 },
    { name: "AWS", percentage: 70 },
  ];

  // Technologies - using emoji as placeholders for icons
  const technologies = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "🔷" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Git", icon: "📊" },
    { name: "TailwindCSS", icon: "🌊" },
    { name: "Docker", icon: "🐳" },
    { name: "Symfony", icon: "🔧" },
    { name: "Vue.js", icon: "🔮" },
    { name: "Laravel", icon: "⚙️" },
    { name: "PHP", icon: "💻" },
    { name: "Android", icon: "📱" },
  ];
  return (
    <section id="skills" className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Mes compétences</h2>
          <motion.div
            className="h-1 w-20 bg-indigo-600 mx-auto mt-2"
            initial={{ width: 0 }}
            animate={isSectionInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            J'ai travaillé avec diverses technologies et je continue d'élargir
            mes compétences. Voici quelques-unes des compétences clés que j'ai
            développées au fil des années.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center place-items-center gap-12 mb-16">
          {/* Frontend skills */}
          <motion.div
            ref={frontendRef}
            initial={{ opacity: 0, x: -50 }}
            animate={
              isFrontendInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.h3
              className="text-xl font-semibold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isFrontendInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
            >
              Développement Frontend
            </motion.h3>
            <div>
              {frontendSkills.map((skill) => (
                <SkillProgress
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
          </motion.div>

          {/* Backend skills */}
          <motion.div
            ref={backendRef}
            initial={{ opacity: 0, x: 50 }}
            animate={
              isBackendInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.h3
              className="text-xl font-semibold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isBackendInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
            >
              Développement Backend
            </motion.h3>
            <div>
              {backendSkills.map((skill) => (
                <SkillProgress
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
          </motion.div>

          {/* Others skills */}
          <motion.div
            ref={backendRef}
            initial={{ opacity: 0, x: 50 }}
            animate={
              isBackendInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.h3
              className="text-xl font-semibold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isBackendInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
            >
              Autres Compétences
            </motion.h3>
            <div>
              {otherSkills.map((skill) => (
                <SkillProgress
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div
          ref={techRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isTechInView ? "visible" : "hidden"}
        >
          <motion.h3
            className="text-xl font-semibold text-gray-800 text-center mb-8"
            variants={fadeInUp}
          >
            Technologies avec lesquelles je travaille
          </motion.h3>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isTechInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <TechItem name={tech.name} icon={tech.icon} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
