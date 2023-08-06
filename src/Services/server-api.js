import axios from "axios";




//My base url 
const BASE_URL = process.env.REACT_APP_BASE_URL;

//Get all the states 



//--------------------FETCH ALL NOTES -----------------------------//

const getNotes = async () => {
    const url = `${BASE_URL}note/data`;
    try {
      const response = await axios.get(url);
      const data =  response.data;
      // Transform the data into the desired format
     
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Some error occurred while fetching data.');
    } finally {
      console.log(`Base URL ${url}`)

    }
  };


//-------------------- CRETA A NEW NOTE  -----------------------------//

const createNewNote = async (noteData) => {
 
  const url = `${BASE_URL}note/create`;

  try {
    const response = await axios.post(url, noteData);
    if (response.status === 201) {
      // Note creation was successful
      return { success: true, data: response.data };
    } else {
      // Handle other possible response status codes (optional)
      return { success: false, message: 'Failed to create the note.' };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error creating the note.');
  }
};


// ----------------------------- DELETE A NOTE -------------------------------- //

// In your noteStore.js
const deleteNote = async (noteId) => {
  const url = `${BASE_URL}note/delete/${noteId}`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Some error occurred while deleting the note.');
  }
};


const updateNote = async (noteId, updatedFields) => {
  const url = `${BASE_URL}note/update/${noteId}`;
  try {
    const response = await axios.put(url, updatedFields);
    return response; // Assuming the backend returns an object with `success` and `message` properties
  } catch (error) {
    console.error(error);
    throw new Error('Some error occurred while updating the note.');
  }
};

  export {getNotes, createNewNote, deleteNote, updateNote}; 