import React, { useEffect, useState } from "react";
import particleConfig from "../assets/particles.json";
import Typewriter from "typewriter-effect";
import badgeData from "../assets/badgeData";

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HomePage = () => {
	const titles = [
		"   Finance Professional",
		"   Tech Enthusiast",
		"   Gamer",
	];

	// Initialize particles effect only if on the home page
	useEffect(() => {
		if (window.location.pathname === "/") {
			/* eslint-disable no-undef */
			particlesJS("particles-js", particleConfig); // Use your particleConfig here
			/* eslint-enable no-undef */
		}
	}, []);

	const groupBadgesByType = () => {
		const groupedBadges = {};
		badgeData.forEach((badge) => {
			if (!groupedBadges[badge.type]) {
				groupedBadges[badge.type] = [];
			}
			groupedBadges[badge.type].push(badge);
		});
		return groupedBadges;
	};

	const groupedBadges = groupBadgesByType();

	return (
		<div className="home-page">
			<div className="intro">
				<div className="partcles" id="particles-js"></div>
				<div className="home-page-header">
					<h1>Hi, I'm Sahil Bhatt 👋 </h1>
					<Typewriter
						options={{
							strings: titles,
							autoStart: true,
							cursor: "|",
							loop: true,
							wrapperClassName: "typewriter-wrapper",
						}}
					/>
				</div>
				<p className="intro-text">
					<span className="into-text-content">
						Welcome to my world! I'm Sahil Bhatt, an enthusiast with
						a penchant for all things tech. While my journey started
						in the realm of commerce, my fascination with technology
						has been an unwavering force, propelling me to explore
						its boundless possibilities. As a numbers enthusiast by
						profession, I've mastered the art of managing financial
						landscapes. But beyond the spreadsheets and balance
						sheets, I'm driven by a curiosity to unravel the
						intricate tapestry of the digital world. Join me as I
						bridge the gap between finance and technology,
						unraveling insights and discoveries that merge two
						seemingly distinct domains into a harmonious symphony of
						innovation.
					</span>
				</p>
			</div>

			<div className="tech-info-section">
				<h1>My Tech Stack </h1>
				<div className="block">
					<div disableGutters className="stack-container">
						{Object.keys(groupedBadges).map((type) => (
							<Accordion
								disableGutters
								defaultExpanded
								className={`stack-box`}
								id={type}
								key={type}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<Typography
										className="stack-title"
										variant="h6"
									>
										{type}
									</Typography>
								</AccordionSummary>
								<AccordionDetails className="stack-badges">
									{groupedBadges[type].map((badge, index) => (
										<div key={index}>
											<a
												href={badge.link}
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="stack-item"
													src={badge.imageSrc}
													alt={badge.alt}
												/>
											</a>
										</div>
									))}
								</AccordionDetails>
							</Accordion>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
