import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../../assets/projectsData";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

function ProjectsShowcase() {
    return (
        <section className="projects-section" id="projects">
            <motion.div
                className="projects-section__header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
            >
                <p className="section-label">// projects</p>
                <h2 className="section-heading">Things I&apos;ve built</h2>
                <p className="projects-section__desc">
                    Interactive demos spanning full-stack apps, real-time systems,
                    and API integrations — each one live and runnable.
                </p>
            </motion.div>

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                {projects.map((project) => (
                    <motion.article
                        key={project.id}
                        className="project-card"
                        variants={cardVariants}
                        style={{ "--project-accent": project.accent }}
                    >
                        <div className="project-card__glow" aria-hidden="true" />
                        <div className="project-card__top">
                            <span className="project-card__icon" aria-hidden="true">
                                {project.icon}
                            </span>
                            <span className="project-card__year">{project.year}</span>
                        </div>
                        <h3 className="project-card__title">{project.title}</h3>
                        <p className="project-card__desc">{project.description}</p>
                        <ul className="project-card__tech">
                            {project.tech.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                        <Link to={project.route} className="project-card__link">
                            Launch demo
                            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}

export default ProjectsShowcase;
