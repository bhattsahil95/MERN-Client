import { create } from 'zustand';

const noteStore = create((set) => ({
    // States
    // popUp: false,
    notes_all: [],
    // loading: false,
    // error: null,
    // selectedNote: null,
    noteValue: 1,
    notePage: 1,
   
  
    // Actions
    // togglePopUp: () => set((state) => ({ popUp: !state.popUp })),
    setNotes_all: (newNotes) => set({ notes_all: newNotes }),
    // setLoading: (isLoading) => set({ loading: isLoading }),
    // setError: (errorMsg) => set({ error: errorMsg }),
    // setSelectedNote: (note) => set({ selectedNote: note }),
    increaseNoteValue: () => set((state) => ({noteValue: state.noteValue + 1})),
    setNotePage: (newPage) => set({ notePage: newPage }),
    setNotePageOne: () => set((state) => ({notePage: 1}))
  }));

export default noteStore;
