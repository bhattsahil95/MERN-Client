// this is my store which will hold all the global states in my application 

import {create} from 'zustand';

const useStore = create((set) => ({

  // States 

  state1: 0,
  state2: 0,
  num1: 0,
 

  // Actions 
 
  increaseState1: () => set((state) => ({ state1: state.state1 + 1 })),
  decreaseState1: () => set((state) => ({ state1: state.state1 - 1 })),
  increaseState2: () => set((state) => ({ state2: state.state2 + 10 })),
  decreaseState2: () => set((state) => ({ state2: state.state2 - 10 })),
  setNum1: (newNum) => set({ num1: newNum }),

  
}));

export default useStore;
