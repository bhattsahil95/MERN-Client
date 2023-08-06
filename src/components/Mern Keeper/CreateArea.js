// import React, { useState } from "react";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import Zoom from "@mui/material/Zoom";

// function CreateArea(props) {
//   const [note, setNote] = useState({ title: "", content: "", timeCreated: "" });
//   const [isActive, setisActive] = useState(false);

//   function handleNote(event) {
//     const { name, value } = event.target;
//     setNote((prevNote) => ({
//       ...prevNote,
//       [name]: value
//     }));
//     if (name === "title" && value.trim() !== "" && note.content.trim() !== "") {
//       setisActive(true);
//     } else if (
//       name === "content" &&
//       value.trim() !== "" &&
//       note.title.trim() !== ""
//     ) {
//       setisActive(true);
//     } else {
//       setisActive(false);
//     }
//   }

//   function handleNoteSubmit(event) {
//     event.preventDefault();

//     // Get the current date and time
//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleString();

//     // Create a new note object with the title, content, and timeCreated
//     const newNote = {
//       title: note.title,
//       content: note.content,
//       timeCreated: formattedDate
//     };

//     props.addNote(newNote);
//     setNote({ title: "", content: "", timeCreated: "" });
//     setisActive(false); // Reset the note to clear the input fields
//   }

//   return (
//     <div className="form">
//       {/* <form> */}
//       <input
//         name="title"
//         onChange={handleNote}
//         value={note.title}
//         placeholder="Title"
//       />
//       <textarea
//         name="content"
//         value={note.content}
//         placeholder="Take a note..."
//         rows="3"
//         onChange={handleNote}
//       />
//       <span> {note.timeCreated} </span>
//       <Zoom in={isActive} timeout={500}>
//         <Fab
//           color="primary"
//           onClick={handleNoteSubmit}
//           sx={{
//             backgroundColor: "#f5ba13",
//             "&:hover": {
//               backgroundColor: "darkorange",
//               transform: "scale(1.15)",
//               transition: "transform 0.3s ease"
//             }
//           }}
//         >
//           <AddIcon sx={{ color: "black" }} />
//         </Fab>
//       </Zoom>
//       {/* </form> */}
//     </div>
//   );
// }

// export default CreateArea;


import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "", timeCreated: "" });
  const [isActive, setisActive] = useState(false);

  function handleNote(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
    if (name === "title" && value.trim() !== "" && note.content.trim() !== "") {
      setisActive(true);
    } else if (
      name === "content" &&
      value.trim() !== "" &&
      note.title.trim() !== ""
    ) {
      setisActive(true);
    } else {
      setisActive(false);
    }
  }

  function handleNoteSubmit(event) {
    event.preventDefault();

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Create a new note object with the title, content, and timeCreated
    const newNote = {
      title: note.title,
      content: note.content,
      timeCreated: formattedDate
    };

    props.addNote(newNote);
    setNote({ title: "", content: "", timeCreated: "" });
    setisActive(false); // Reset the note to clear the input fields
  }

  return (
    <div className="form">
      {/* <form> */}
      <input
        name="title"
        onChange={handleNote}
        value={note.title}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={note.content}
        placeholder="Take a note..."
        rows={1}
        onChange={handleNote}
        style={{
          height: isActive
            ? "100px" // Set height to 100px when active (or any other desired value)
            : "32px" // Set height to the default size when not active
        }}
      />
      <span> {note.timeCreated} </span>
      <Zoom in={isActive}>
        <Fab
          color="primary"
          onClick={handleNoteSubmit}
          sx={{
            backgroundColor: "#f5ba13",
            "&:hover": {
              backgroundColor: "darkorange",
              transform: "scale(1.15)",
              transition: "transform 0.3s ease"
            }
          }}
        >
          <AddIcon sx={{ color: "black" }} />
        </Fab>
      </Zoom>
      {/* </form> */}
    </div>
  );
}

export default CreateArea;
