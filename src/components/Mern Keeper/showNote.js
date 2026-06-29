import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';



const ShowNote = ({_id, title, content, timeCreated, closeNote, handleSave }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  // State variables to track whether the title and content have been modified
  const [isTitleModified, setIsTitleModified] = useState(false);
  const [isContentModified, setIsContentModified] = useState(false);
  const [validData, setValidData] = useState(true)

  // Function to handle the "Save" button click
  const handleSaveClick = async () => {
    try {
      const result = await handleSave(_id, { title: editedTitle, content: editedContent });
      if (result === true) {
        toast.success('Note saved');
        closeNote();
      } else {
        toast.error('Failed to save note');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while saving');
    }
  };

  // Function to handle changes in the title input
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
    // Set the title modification state to true if the edited title is different from the original title
    setIsTitleModified(e.target.value !== title);
    setValidData(!!e.target.value);

  };

  // Function to handle changes in the content textarea
  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
    // Set the content modification state to true if the edited content is different from the original content
    setIsContentModified(e.target.value !== content);
    
    setValidData(!!e.target.value);

  };

  return (
    <div className="popup">
      <h1>My Note</h1>
      <CloseIcon onClick={closeNote} className="show-note-close-icon" />
      <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={handleTitleChange}
      />
      <label>Content:</label>
      <textarea
        value={editedContent}
        onChange={handleContentChange}
      ></textarea>
     <p className="time-stamp">
        <span role="img" aria-label="clock emoji">
          🕔
        </span>{" "}
        {timeCreated}
      </p>
      <div className="popup-buttons">
        {/* Conditionally enable/disable the "Save" button based on the modification state */}
        <button
          className="save-button"
          onClick={handleSaveClick}
          disabled={!((isTitleModified || isContentModified) && validData)}
          title={!((isTitleModified || isContentModified) && validData) ? 'No changes to save' : 'Save changes'}
        >
          <SaveIcon fontSize="small" />
        </button>
      
        

      </div>
    </div>
  );
};

export default ShowNote;
