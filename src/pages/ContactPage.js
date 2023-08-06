
import React from 'react';
import useStore from '../store';


function ContactPage() {

  const state2 = useStore((state) => state.state2);
  const increaseState2 = useStore((state) => state.increaseState2);
  const decreaseState2 = useStore((state) => state.decreaseState2);


  return (
    <div>
      <h1>Conatct Page</h1>
      {/* Add your content */}
      <div>
      <h1>Page 2</h1>
      <p>State 2: {state2}</p>
      <button onClick={increaseState2}>Increase</button>
      <button onClick={decreaseState2}>Decrease</button>
      
    </div>

    </div>
  );
}

export default ContactPage;