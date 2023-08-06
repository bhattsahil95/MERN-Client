import React from 'react';


function Dropdown({selectedValue, options, onChange }) {
  return (
    <div className="dropdown-container">
    <select value={selectedValue} className='dropdown' onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    </div>
  );
}

export default Dropdown;



