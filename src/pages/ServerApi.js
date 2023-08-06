import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
;


export default function ServerApi () {

    

    const startData = ""
    const BASE_URL = "https://mern-server-1j3g.onrender.com/";

    const [data, setData] = useState(startData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = `${BASE_URL}note/data`

    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
          try {
            const response = await axios.get(url);
            setData(response.data);
            setIsLoading(false);
            
          } catch (error) {
            setError(error);
            setIsLoading(false);
          }
        };
    
        fetchData(); // Call the function to fetch data
      }, [url]);
    
      if (isLoading) {
        return (
         <Box sx={{ width: '100%' }}>
        <LinearProgress />
        </Box>
            );
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

      
    
      const namesAndNotes = data.map(({ title, content }) => ({ name:title, note:content }));

  return (
    <div>
      {namesAndNotes.map(({ name, note }) => (
        <div key={name}>
          <h3>Name: {name}</h3>
          <p>Note: {note}</p>
        </div>
      ))}
        <br />
        <br />
        <br />
        <h1>Raw Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>


    </div>
  );
    };


