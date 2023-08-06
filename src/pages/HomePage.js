import React, { useState } from 'react';
import useStore from '../store.js';


const HomePage = () => {
  const { num1, state2, state1, increaseState1, decreaseState1, setNum1 } = useStore();
  const [newNum, setNewNum] = useState('');

  function handleNum1() {
    // Parse the input number to a numeric value
    const parsedNum = parseInt(newNum);

    // Check if the parsedNum is a valid number
    if (!isNaN(parsedNum)) {
      // Calculate the new value by adding num1 and parsedNum
      const newValue = num1 + parsedNum;
      
      // Call the setNum1 action with the new value
      setNum1(newValue);
    }

    
  }

  return (
    <div>
    
    
      <h1>Page 1</h1>
      <h1>num 1: {num1}</h1>
      <input type="number" value={newNum} onChange={(e) => setNewNum(e.target.value)} />
      <button onClick={handleNum1}>Change num1</button>

      <h1>State 2: {state2}</h1>
      <h1>State 1: {state1}</h1>
      <button onClick={increaseState1}>Increase</button>
      <button onClick={decreaseState1}>Decrease</button>
    </div>
  );
};

export default HomePage;
