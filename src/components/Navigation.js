import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../assets/projectsData";

const mainLinks = [
	{ to: "/", label: "Home", end: true },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
];

const projectLinks = projects.map(({ route, shortLabel }) => ({
	to: route,
	label: shortLabel,
}));

const socialLinks = [
	{
		href: "https://github.com/bhattsahil95",
		label: "GitHub",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
			</svg>
		),
	},
	{
		href: "https://ca.linkedin.com/in/sahil-bhatt-ab5238a0",
		label: "LinkedIn",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
			</svg>
		),
	},
];

function NavItem({ to, label, end, onClick }) {
	return (
		<NavLink
			to={to}
			end={end}
			onClick={onClick}
			className={({ isActive }) =>
				`nav-link${isActive ? " nav-link--active" : ""}`
			}
		>
			{label}
		</NavLink>
	);
}

function Navigation() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [projectsOpen, setProjectsOpen] = useState(false);
	const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setProjectsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const closeMobile = () => {
		setMobileOpen(false);
		setMobileProjectsOpen(false);
	};

	return (
		<header className="site-header">
			<nav className="navigation" aria-label="Main navigation">
				<NavLink to="/" className="nav-brand" onClick={closeMobile}>
					<span className="nav-brand__mark">SB</span>
					<span className="nav-brand__text">Sahil Bhatt</span>
				</NavLink>

				<div className="nav-desktop">
					<ul className="navigation-menu">
						{mainLinks.map((link) => (
							<li key={link.to}>
								<NavItem {...link} />
							</li>
						))}
						<li
							className="nav-dropdown"
							ref={dropdownRef}
							onMouseEnter={() => setProjectsOpen(true)}
							onMouseLeave={() => setProjectsOpen(false)}
						>
							<button
								type="button"
								className={`nav-link nav-dropdown__trigger${
									projectsOpen ? " nav-link--active" : ""
								}`}
								aria-expanded={projectsOpen}
								aria-haspopup="true"
								onClick={() => setProjectsOpen((prev) => !prev)}
							>
								Projects
								<svg
									className={`nav-chevron${
										projectsOpen ? " nav-chevron--open" : ""
									}`}
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<AnimatePresence>
								{projectsOpen && (
									<motion.div
										className="nav-dropdown__panel"
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.12 }}
									>
										{projectLinks.map((link) => (
											<NavLink
												key={link.to}
												to={link.to}
												className={({ isActive }) =>
													`nav-dropdown__item${
														isActive
															? " nav-dropdown__item--active"
															: ""
													}`
												}
												onClick={() =>
													setProjectsOpen(false)
												}
											>
												{link.label}
											</NavLink>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</li>
					</ul>

					<div className="socials">
						{socialLinks.map((social) => (
							<a
								key={social.href}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="social-link"
								aria-label={social.label}
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>

				<button
					type="button"
					className="nav-toggle"
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
					aria-expanded={mobileOpen}
					onClick={() => setMobileOpen((prev) => !prev)}
				>
					<span
						className={`nav-toggle__bar${
							mobileOpen ? " nav-toggle__bar--open" : ""
						}`}
					/>
					<span
						className={`nav-toggle__bar${
							mobileOpen ? " nav-toggle__bar--open" : ""
						}`}
					/>
					<span
						className={`nav-toggle__bar${
							mobileOpen ? " nav-toggle__bar--open" : ""
						}`}
					/>
				</button>
			</nav>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						className="nav-mobile-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeMobile}
					>
						<motion.div
							className="nav-mobile-panel"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{
								type: "spring",
								damping: 28,
								stiffness: 320,
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="nav-mobile-links">
								{mainLinks.map((link) => (
									<NavItem
										key={link.to}
										{...link}
										onClick={closeMobile}
									/>
								))}
								<div className="nav-mobile-group">
									<button
										type="button"
										className="nav-mobile-group__trigger"
										onClick={() =>
											setMobileProjectsOpen(
												(prev) => !prev
											)
										}
										aria-expanded={mobileProjectsOpen}
									>
										Projects
										<svg
											className={`nav-chevron${
												mobileProjectsOpen
													? " nav-chevron--open"
													: ""
											}`}
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									<AnimatePresence>
										{mobileProjectsOpen && (
											<motion.div
												className="nav-mobile-group__items"
												initial={{ height: 0, opacity: 0 }}
												animate={{
													height: "auto",
													opacity: 1,
												}}
												exit={{ height: 0, opacity: 0 }}
											>
												{projectLinks.map((link) => (
													<NavLink
														key={link.to}
														to={link.to}
														className={({
															isActive,
														}) =>
															`nav-mobile-sub${
																isActive
																	? " nav-mobile-sub--active"
																	: ""
															}`
														}
														onClick={closeMobile}
													>
														{link.label}
													</NavLink>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
							<div className="nav-mobile-socials">
								{socialLinks.map((social) => (
									<a
										key={social.href}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="social-link"
										aria-label={social.label}
									>
										{social.icon}
									</a>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

export default Navigation;
