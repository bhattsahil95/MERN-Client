// AboutPage.js
import React from 'react';
import useStore from '../store';
import noteStore from '../noteStore';


function AboutPage() {

  const {num1, state1, state2} = useStore();
  const { noteValue, increaseNoteValue} = noteStore();


  

  return (
    <div>
      <h1>About Page</h1>
      <h1> Num1 {num1}  </h1>
      <h1> State1 {state1} Page</h1>
      <h1> State2 {state2} Page</h1>
      <h1> Partition: </h1>
      <button onClick={increaseNoteValue}>GET NOTES </button>
     <h1>{noteValue}</h1>
     
           {/* Add your content */}
    </div>
  );
}

export default AboutPage;