import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import OpenInNewTwoToneIcon from "@mui/icons-material/OpenInNewTwoTone";

function Note(props) {
    const { title, content, timeCreated, removeNote, displayNote } = props;

    const titleLimit = 30;
    const contentLimit = 200;

    const limitedTitle =
        title.length > titleLimit
            ? title.substring(0, titleLimit) + "..."
            : title;
    const limitedContent =
        content.length > contentLimit
            ? content.substring(0, contentLimit) + "..."
            : content;

    return (
        <article className="note" aria-label="Note card">
            <div className="note__top">
                <h1>{limitedTitle || "Untitled note"}</h1>
                <button className="note-read" onClick={displayNote} aria-label="Open note">
                    <OpenInNewTwoToneIcon />
                </button>
            </div>

            <p className="note-content">{limitedContent || "Start writing to capture your ideas..."}</p>

            <div className="note-bottom">
                <p className="time-stamp">
                    <span role="img" aria-label="clock emoji">
                        🕔
                    </span>{" "}
                    {timeCreated}
                </p>

                <button className="note-delete" onClick={removeNote} aria-label="Delete note">
                    <DeleteOutlineIcon />
                </button>
            </div>
        </article>
    );
}

export default Note;
