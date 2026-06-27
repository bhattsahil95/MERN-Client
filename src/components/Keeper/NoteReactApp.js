import React, { useState } from "react";
import Header from "./Header";

import NotesList from "./NoteList";



function NoteReactApp() {

  
  const defaultNotesPerPage = 2; 
  const [selectedOption, setSelectedOption] = useState(defaultNotesPerPage);

  return (
    <div className="notes-app">
      <div className="notes-container">
      <Header  selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>

     

      <NotesList selectedOption={selectedOption}/> 

     


      
    </div>
    </div>
  );
}

export default NoteReactApp;
