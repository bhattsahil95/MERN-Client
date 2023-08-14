import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import useStore from "../../store";
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';



function Note(props) {

  const { title, content, timeCreated, removeNote, displayNote} = props;
 
  
 
  const titleLimit = 30;
  const contentLimit = 200; 

  
 

  const limitedTitle = title.length > titleLimit ? title.substring(0, titleLimit) + '...' : title;
  const limitedContent = content.length > contentLimit ? content.substring(0, contentLimit) + '...' : content;


  return (
    <div className="note">
     
      <h1>{limitedTitle}</h1>
       <button className="note-read" onClick={displayNote}> <OpenInNewTwoToneIcon /> </button>
       <p className="note-content">{limitedContent}</p>
   
      <div className="note-bottom">
      <p className="time-stamp">
        <span role="img" aria-label="clock emoji">
          🕔
        </span>{" "}
        {timeCreated}
      </p>
     
      <button className="note-delete" onClick={removeNote}>
        <DeleteOutlineIcon />
      </button>
      </div>
    </div>
  );
}

export default Note;
