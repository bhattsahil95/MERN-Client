import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import noteStore from "../../noteStore";
import ShowNote from "./showNote";


function NotesList( {selectedOption} ) {
  
  const {notePage, setNotePage } = noteStore();
  const notesPerPage = selectedOption;
  
    
  const [notes, setNotes] = useState([
    {
      title: "Test",
      content: "Test Content",
      timeCreated: "2023-07-02 10:30 AM"
    },
    {
      title: "Test1",
      content: "Test1 Content",
      timeCreated: "2023-07-02 11:45 AM"
    }
  ]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(index) {
    setNotes((prevNotes) => prevNotes.filter((_, noteIndex) => noteIndex !== index));
  }

  // Calculate the index range for the current page
  const indexOfLastNote = notePage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Calculate the total number of pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setNotePage(pageNumber);
  };

   // State to handle the displayed note
   const [displayedNote, setDisplayedNote] = useState(null);

   // Function to display a single note in a popup
   const displayNote = (index) => {
     // Get the note data from the currentNotes array using the index
     const noteToDisplay = currentNotes[index];
     // Set the note data in the state to display it in the popup
     setDisplayedNote(noteToDisplay);
   };
 
   // Function to close the popup and clear the displayedNote state
   const closePopup = () => {
     setDisplayedNote(null);
   };




// Function to handle the "Save" button click in the ShowNote component
const handleSaveNote = (editedNote) => {   
  const updatedNote = { ...displayedNote }; // Make a copy of the displayedNote
  
  updatedNote.title = editedNote.title; // Update the note data with the edited data 
  updatedNote.content = editedNote.content;
  
  setNotes((prevNotes) => // Update the notes array with the updated note 
    prevNotes.map((note) =>
      note.timeCreated === displayedNote.timeCreated ? updatedNote : note
    )
  );
  
  setDisplayedNote(null); // Clear the displayedNote state to close the popup
};


  return (



    <div >
      <CreateArea addNote={addNote} />
      <div className="notes-display" >

     

      {currentNotes.map((data, index) => (
        <Note
            key={index}
            title={data.title}
            content={data.content}
            timeCreated={data.timeCreated}
            removeNote={() => deleteNote(index)}
            displayNote={() => displayNote(index)}
/>
      ))}
      </div>

 {/* OLD METHOD  */}

      {/* {displayedNote && (
       <div className={` popup ${displayedNote ? "show draggable-element" : ""}`}>
          <h1>{displayedNote.title}</h1>
          <p>{displayedNote.content}</p>
          <p>{displayedNote.timeCreated}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )} */}


{/* New Trial with Own Component */}

{  displayedNote && <ShowNote title={displayedNote.title} 
                            content={displayedNote.content} 
                            timeCreated={displayedNote.timeCreated}
                            closeNote={closePopup} 
                            handleSave={handleSaveNote} />
                           }; 

     


      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={notePage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        </div>

          {/* Popup */}
     

   
       

          

      
    </div>
  );
}

export default NotesList;
