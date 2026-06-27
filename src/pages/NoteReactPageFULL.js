import React from "react";
import NoteReactApp from "../components/Mern Keeper/NoteReactApp";
import ProjectPageHeader from "../components/ProjectPageHeader";
import projects from "../assets/projectsData";

const project = projects.find((p) => p.id === "mern-notes");

function MernNotes() {
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

export default MernNotes;
