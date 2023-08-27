import React from "react";
import Dropdown from "./Helper/dropdown";
import noteStore from "../../noteStore";
import Message from "./Helper/message";

function Header({ selectedOption, setSelectedOption }) {
    const options = [2, 3, 5, 10, 20, 50, 100];
    const { setNotePageOne } = noteStore();

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
                    <h5>Notes per Page : </h5>

                    <Dropdown
                        selectedValue={selectedOption}
                        options={options}
                        onChange={handleDropdownChange}
                    />
                </div>
            </div>
            <Message
                title={"TAKING TOO LONG TO LOAD?"}
                msg={
                    "Please note, I am using free service. It might take some time to cook up my backend.! "
                }
            />
        </header>
    );
}

export default Header;
