import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotesList from "./NoteList";
import { toast } from "react-toastify";

function NoteReactApp() {
  const defaultNotesPerPage = 10;
  const [selectedOption, setSelectedOption] = useState(defaultNotesPerPage);

  return (
    <div className="notes-container">
      <Header
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <NotesList selectedOption={selectedOption} />
    </div>
  );
}

export default NoteReactApp;
