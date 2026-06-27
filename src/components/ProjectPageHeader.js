import { Link } from "react-router-dom";

function ProjectPageHeader({ title, description, tech = [] }) {
    return (
        <header className="project-page-header">
            <Link to="/#projects" className="project-page-header__back">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                        clipRule="evenodd"
                    />
                </svg>
                All projects
            </Link>
            <div className="project-page-header__body">
                <p className="project-page-header__label">Live demo</p>
                <h1 className="project-page-header__title">{title}</h1>
                {description && (
                    <p className="project-page-header__desc">{description}</p>
                )}
                {tech.length > 0 && (
                    <ul className="project-page-header__tech">
                        {tech.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}

export default ProjectPageHeader;
