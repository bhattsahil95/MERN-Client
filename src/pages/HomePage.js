import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import badgeData from "../assets/badgeData";
import particleConfig from "../assets/particles-subtle.json";
import ProjectsShowcase from "../components/HomePage/ProjectsShowcase";
import StatsBar from "../components/HomePage/StatsBar";

const ROLES = [
    "Finance Manager",
    "Full-Stack Developer",
    "Tech Enthusiast",
];

const HIGHLIGHT_STACK = [
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "Power BI",
    "TypeScript",
];

const MARQUEE_ITEMS = [
    "React", "Node.js", "TypeScript", "MongoDB", "Socket.io",
    "Express", "Python", "Power BI", "Axios", "Zustand",
    "Framer Motion", "REST APIs",
];

const heroStagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
};

const heroItem = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const codePanelVariant = {
    hidden: { opacity: 0, x: 32, scale: 0.97 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
    },
};

const HomePage = () => {
    useEffect(() => {
        if (window.location.pathname === "/") {
            /* eslint-disable no-undef */
            particlesJS("particles-js", particleConfig);
            /* eslint-enable no-undef */
        }
    }, []);

    const groupedBadges = badgeData.reduce((groups, badge) => {
        const type = badge.type.trim();
        if (!groups[type]) groups[type] = [];
        groups[type].push(badge);
        return groups;
    }, {});

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero__grid-bg" aria-hidden="true" />
                <div className="hero__orbs" aria-hidden="true">
                    <span className="hero__orb hero__orb--1" />
                    <span className="hero__orb hero__orb--2" />
                    <span className="hero__orb hero__orb--3" />
                </div>
                <div className="hero__particles" id="particles-js" aria-hidden="true" />

                <div className="hero__grid">
                    <motion.div
                        className="hero__content"
                        variants={heroStagger}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="hero__status" variants={heroItem}>
                            <span className="hero__status-dot" />
                            Open to opportunities
                        </motion.div>

                        <motion.p className="hero__eyebrow" variants={heroItem}>
                            sahil.bhatt / portfolio
                        </motion.p>

                        <motion.h1 className="hero__title" variants={heroItem}>
                            Finance professional.
                            <br />
                            <span className="hero__title-accent hero__title-gradient">
                                Builder at heart.
                            </span>
                        </motion.h1>

                        <motion.div className="hero__terminal-line" variants={heroItem}>
                            <span className="hero__prompt">&gt;</span>
                            <Typewriter
                                options={{
                                    strings: ROLES,
                                    autoStart: true,
                                    cursor: "_",
                                    loop: true,
                                    wrapperClassName: "hero__typewriter",
                                }}
                            />
                        </motion.div>

                        <motion.p className="hero__bio" variants={heroItem}>
                            I manage financial operations by day and ship web
                            applications by night — bridging spreadsheets, APIs,
                            and clean UI. Based in Fort McMurray, Canada.
                        </motion.p>

                        <motion.div className="hero__actions" variants={heroItem}>
                            <Link to="/about" className="btn btn--primary">
                                View experience
                            </Link>
                            <Link to="/contact" className="btn btn--ghost">
                                Contact me
                            </Link>
                            <a
                                href="https://github.com/bhattsahil95"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn--ghost"
                            >
                                GitHub
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.aside
                        className="hero__code-panel"
                        aria-label="Profile summary"
                        variants={codePanelVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="code-window code-window--animated">
                            <div className="code-window__chrome">
                                <span />
                                <span />
                                <span />
                                <p className="code-window__filename">profile.ts</p>
                            </div>
                            <pre className="code-window__body">
                                <code>
                                    <span className="tok-keyword">const</span>{" "}
                                    <span className="tok-name">sahil</span>{" "}
                                    <span className="tok-op">=</span> {"{"}
                                    {"\n"}
                                    {"  "}
                                    <span className="tok-key">role</span>
                                    <span className="tok-op">:</span>{" "}
                                    <span className="tok-str">
                                        "Finance Manager"
                                    </span>
                                    ,{"\n"}
                                    {"  "}
                                    <span className="tok-key">focus</span>
                                    <span className="tok-op">:</span> [
                                    {"\n"}
                                    {HIGHLIGHT_STACK.map((skill) => (
                                        <React.Fragment key={skill}>
                                            {"    "}
                                            <span className="tok-str">
                                                "{skill}"
                                            </span>
                                            ,{"\n"}
                                        </React.Fragment>
                                    ))}
                                    {"  "}],
                                    {"\n"}
                                    {"  "}
                                    <span className="tok-key">location</span>
                                    <span className="tok-op">:</span>{" "}
                                    <span className="tok-str">
                                        "Fort McMurray, CA"
                                    </span>
                                    ,{"\n"}
                                    {"  "}
                                    <span className="tok-key">openToWork</span>
                                    <span className="tok-op">:</span>{" "}
                                    <span className="tok-bool">true</span>
                                    {"\n"}
                                    {"}"}
                                </code>
                            </pre>
                        </div>
                    </motion.aside>
                </div>

                <StatsBar />
            </section>

            <div className="tech-marquee" aria-hidden="true">
                <div className="tech-marquee__track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={`${item}-${i}`} className="tech-marquee__item">
                            {item}
                            <span className="tech-marquee__dot">·</span>
                        </span>
                    ))}
                </div>
            </div>

            <ProjectsShowcase />

            <section className="tech-section">
                <motion.div
                    className="tech-section__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="section-label">// stack</p>
                    <h2 className="section-heading">Tools I work with</h2>
                    <p className="tech-section__desc">
                        From front-end interfaces to databases and automation —
                        here is the toolkit behind my projects.
                    </p>
                </motion.div>

                <div className="stack-bento">
                    {Object.entries(groupedBadges).map(([type, badges], index) => (
                        <motion.div
                            className="stack-card"
                            key={type}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="stack-card__head">
                                <span className="stack-card__index">/</span>
                                <h3 className="stack-card__title">{type}</h3>
                                <span className="stack-card__count">
                                    {badges.length}
                                </span>
                            </div>
                            <ul className="stack-card__grid">
                                {badges.map((badge) => (
                                    <li key={badge.alt}>
                                        <a
                                            href={badge.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="stack-card__item"
                                            title={badge.alt}
                                        >
                                            <img
                                                src={badge.imageSrc}
                                                alt={badge.alt}
                                            />
                                            <span>{badge.alt}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
