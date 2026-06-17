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
        <div className="note">
            <h1>{limitedTitle}</h1>
            <button className="note-read" onClick={displayNote}>
                <OpenInNewTwoToneIcon />{" "}
            </button>
            <p className="note-content">{limitedContent}</p>

            <div className="note-bottom">
                <p className="time-stamp">
                    <span role="img" aria-label="clock emoji">
                        🕔
                    </span>{" "}
                    {timeCreated}
                </p>
                <div class="bg-blue-500 text-white p-4 bottom-10 ">
                    This is a div TW with CSS classes.
                </div>

                <button className="note-delete" onClick={removeNote}>
                    <DeleteOutlineIcon />
                </button>
            </div>
        </div>
    );
}

export default Note;
