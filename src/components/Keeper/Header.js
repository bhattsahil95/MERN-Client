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
    <header className="notes-app-header">
      <div className="notespage-header">
        <div>
          <p className="notes-app-header__eyebrow">Personal workspace</p>
          <h1 className="notes-app-header__title">Keeper Notes</h1>
        </div>
        <div className="notes-per-page-input">
          <span className="notes-per-page-input__label">Notes per page</span>
          <Dropdown selectedValue={selectedOption} options={options} onChange={handleDropdownChange} />
        </div>
      </div>
    </header>
  );
}

export default Header;
