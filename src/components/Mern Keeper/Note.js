import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import useStore from "../../store";
import OpenInNewTwoToneIcon from "@mui/icons-material/OpenInNewTwoTone";

function Note(props) {
    const { title, content, timeCreated, status, removeNote, displayNote } =
        props;

    const statusOptions = ["active", "deleted", "draft"];

    // Truncating the displayed Data

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

    // Showing Formatted time

    const date = new Date(timeCreated);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/Edmonton",
    };

    const formattedDate = new Intl.DateTimeFormat("en-CA", options).format(
        date
    );

    return (
        <div className="note">
            <h1>{limitedTitle}</h1>
            <button className="note-read" onClick={displayNote}>
                {" "}
                <OpenInNewTwoToneIcon />{" "}
            </button>
            <p className="note-content">{limitedContent}</p>

            <p className="note-status">status: {status}</p>

            <div className="note-bottom">
                <p className="time-stamp">
                    <span role="img" aria-label="clock emoji">
                        🕔
                    </span>{" "}
                    {formattedDate}
                </p>

                <button className="note-delete" onClick={removeNote}>
                    <DeleteOutlineIcon />
                </button>
            </div>
        </div>
    );
}

export default Note;
