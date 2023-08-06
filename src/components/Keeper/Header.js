import React  from "react";
import Dropdown from "./Helper/dropdown";
import noteStore from "../../noteStore";

function Header( {selectedOption, setSelectedOption} ) {

  const options = [2,3,5,10,20,50,100];
  const {setNotePageOne} = noteStore();
  
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setNotePageOne();
    

  };


  return (
    <header>
    <div className="notespage-header">
      <h1>Personal Note Book</h1>
      <div className="notes-per-page-input">
      <h2>Notes per Page : </h2>
     
      <Dropdown selectedValue={selectedOption} options={options} onChange={handleDropdownChange} />
     
      </div>
    </div>
    </header>
    
  );
}

export default Header;
