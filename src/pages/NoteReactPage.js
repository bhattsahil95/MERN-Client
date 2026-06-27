import React from "react";
import NoteReactApp from "../components/Keeper/NoteReactApp";
import ProjectPageHeader from "../components/ProjectPageHeader";
import projects from "../assets/projectsData";

const project = projects.find((p) => p.id === "keeper-notes");

function NoteReactPage() {
    return (
        <div>
            <ProjectPageHeader
                title={project.title}
                description={project.description}
                tech={project.tech}
            />
            <NoteReactApp />
        </div>
    );
}

export default NoteReactPage;
