import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import noteStore from "../../noteStore";
import ShowNote from "./showNote";
import {
    getNotes,
    createNewNote,
    deleteNote,
    updateNote,
} from "../../Services/server-api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./dashboard";
import NoteSkeleton from "./Helper/NoteSkeleton";

function NotesList({ selectedOption, socket }) {
    const { notePage, setNotePage, setNotes_all } = noteStore();
    const notesPerPage = selectedOption;
    const [displayedNote, setDisplayedNote] = useState(null);

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const notes = await getNotes();
            setNotes(notes);
            setNotes_all(notes);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            // Handle the error if needed
        }
    };

    useEffect(() => {
        // Set up socket event listeners
        socket.on("updatePage", (message) => {
            fetchNotes();
            toast.warning(message);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    useEffect(() => {
        fetchNotes(); // Call the async function immediately
    }, []);

    async function addNote(newNote) {
        try {
            // Create the new note and wait for the response
            const createNoteResponse = await createNewNote(newNote);

            // Check if the note creation was successful
            if (createNoteResponse.success) {
                // Note was created successfully, now fetch the updated notes
                await fetchNotes();
                toast.success("Note created successfully!");
                socket.emit("newNote", "Refresh Required!");
            } else {
                // Note creation failed, handle the error (optional)
                toast.error("Failed to create the note.");
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error creating the note:", error);
            toast.error("An error occurred while creating the note.");
        }
    }

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await deleteNote(noteId);

            if (response.status === 200) {
                toast.warn("Note deleted successfully!");

                await fetchNotes();
                socket.emit("deleteNote", "A note has been deleted!");
            } else {
                toast.error("Note not found");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the note.");
        }
    };

    // Function to handle the "Save" button click in the ShowNote component
    // Function to update a note
    const handleSaveNote = async (noteId, updatedFields) => {
        try {
            // Update the note and wait for the response
            const response = await updateNote(noteId, updatedFields);

            // Check the status code of the response
            if (response.status === 200) {
                toast.info(response.data.message);

                // Fetch the updated notes after successful update
                await fetchNotes();
                setDisplayedNote(null);
                socket.emit("updateNote", "Refresh Required!");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error updating the note:", error);
            toast.error("An error occurred while updating the note.");
        }
    };

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

    // Function to display a single note in a popup
    const displayNote = (noteId) => {
        // Get the note data from the currentNotes array using the index
        const noteToDisplay = notes.find((note) => note._id === noteId);
        // Set the note data in the state to display it in the popup
        setDisplayedNote(noteToDisplay);
        console.log(displayedNote);
    };

    // Function to close the popup and clear the displayedNote state
    const closePopup = () => {
        setDisplayedNote(null);
    };

    return (
        <div>
            <Dashboard notes={notes}> </Dashboard>
            <CreateArea addNote={addNote} />
            {/* Notes display Section */}
            {/* <div className="notes-display" >
 
        {currentNotes.map((data, index) => (
          <Note
              key={data._id}
              title={data.title}
              content={data.content}
              status={data.status}
              timeCreated={data.timeCreated}
              removeNote={() => handleDeleteNote(data._id)}
              displayNote={() => displayNote(data._id)}/>
        ))}

      </div> */}
            <div className="notes-display skeleton">
                {isLoading // Conditional rendering of Skeleton while loading
                    ? Array.from({ length: notesPerPage }, (_, index) => (
                          <NoteSkeleton key={index} />
                      ))
                    : currentNotes.map((data, index) => (
                          <Note
                              key={data._id}
                              title={data.title}
                              content={data.content}
                              status={data.status}
                              timeCreated={data.timeCreated}
                              removeNote={() => handleDeleteNote(data._id)}
                              displayNote={() => displayNote(data._id)}
                          />
                      ))}
            </div>
            {displayedNote && (
                <ShowNote
                    _id={displayedNote._id}
                    title={displayedNote.title}
                    content={displayedNote.content}
                    timeCreated={displayedNote.timeCreated}
                    closeNote={closePopup}
                    handleSave={handleSaveNote}
                />
            )}
            ;{/* Pagination */}
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
        </div>
    );
}

export default NotesList;
