import React, { useState, useEffect } from "react";

const Dashboard = ({ notes }) => {
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalActiveNotes, setTotalActiveNotes] = useState(0);
  const [totalInactiveNotes, setTotalInactiveNotes] = useState(0);

  useEffect(() => {
    const startCounter = (targetValue, setCounter) => {
      let currentValue = 0;
      const increment = Math.ceil(targetValue / 100);
      const animate = () => {
        if (currentValue < targetValue) {
          currentValue += increment;
          setCounter(currentValue);
          requestAnimationFrame(animate);
        } else {
          setCounter(targetValue);
        }
      };
      requestAnimationFrame(animate);
    };

    startCounter(notes.length, setTotalNotes);
    startCounter(notes.filter((note) => note.status === "active").length, setTotalActiveNotes);
    startCounter(notes.filter((note) => note.status === "deleted").length, setTotalInactiveNotes);
  }, [notes]);

  return (
    <div className="dashboard">
   
      <div className="counter">
        <span className="counter-label">Total Notes  :</span>
        <span className="counter-value">{totalNotes}</span>
      </div>
      <div className="counter">
        <span className="counter-label"> Active Notes  :</span>
        <span className="counter-value">{totalActiveNotes}</span>
      </div>
      <div className="counter">
        <span className="counter-label"> Deleted Notes  :</span>
        <span className="counter-value">{totalInactiveNotes}</span>
      </div>
      {/* Add more metrics and styles as desired */}
    </div>
  );
};

export default Dashboard;
