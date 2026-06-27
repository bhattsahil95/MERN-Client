import React from "react";
import Dropdown from "./Helper/dropdown";
import noteStore from "../../noteStore";
import Message from "./Helper/message";

function Header({ selectedOption, setSelectedOption }) {
    const options = [5, 10, 20, 50, 100];
    const { setNotePageOne } = noteStore();

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setNotePageOne();
    };

    return (
        <header className="notes-app-header">
            <div className="notespage-header">
                <h1 className="notes-app-header__title">MERN Notes</h1>

                <div className="notes-per-page-input">
                    <Dropdown
                        selectedValue={selectedOption}
                        options={options}
                        onChange={handleDropdownChange}
                    />
                </div>
            </div>
            <div className="notes-info">
                <Message
                    title={"TAKING TOO LONG TO LOAD?"}
                    msg={
                        "Please note, I am using free service. It might take some time to cook up my backend.! "
                    }
                />
            </div>
        </header>
    );
}

export default Header;
