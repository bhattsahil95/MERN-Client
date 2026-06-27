import React, { useState } from "react";
import ExperienceTimeline from "../components/AboutPage/ExperienceTimeline";
import PFitems from "../assets/professionalData.js";
import { educationData, certificationData } from "../assets/educationData.js";

const TABS = [
    { id: "professional", label: "Experience", data: PFitems },
    { id: "education", label: "Education", data: educationData },
    { id: "certifications", label: "Certifications", data: certificationData },
];

const AboutPage = () => {
    const [activeTab, setActiveTab] = useState("professional");
    const current = TABS.find((tab) => tab.id === activeTab);

    return (
        <div className="about-page">
            <p className="section-label">// about</p>
            <div className="about-hero">
                <h1 className="about-hero__title">
                    Finance × Technology
                </h1>
                <p className="about-hero__text">
                    I am a finance professional with a deep passion for building
                    software — dashboards, APIs, and tools that make businesses
                    run smarter.
                </p>
            </div>

            <div className="about-tabs" role="tablist" aria-label="About sections">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`about-tab${activeTab === tab.id ? " about-tab--active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="about-timeline-wrap" role="tabpanel">
                <ExperienceTimeline data={current.data} />
            </div>
        </div>
    );
};

export default AboutPage;
