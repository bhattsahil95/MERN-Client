import { create } from 'zustand';

const noteStore = create((set) => ({
  
    notes_all: [],
    noteValue: 1,
    notePage: 1,
   
  
    // Actions
   
    setNotes_all: (newNotes) => set({ notes_all: newNotes }),
     increaseNoteValue: () => set((state) => ({noteValue: state.noteValue + 1})),
    setNotePage: (newPage) => set({ notePage: newPage }),
    setNotePageOne: () => set((state) => ({notePage: 1}))
  }));

export default noteStore;
