import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function BasicSelect(props) {
  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    const enteredCity = event.target.value;
    setCity(enteredCity);
    if (enteredCity.trim() === '') {
      props.onChange(''); // Pass an empty string to the parent component
    } else {
      props.onChange(enteredCity); // Pass the entered city to the parent component
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          id="city-input"
          label="City"
          value={city}
          onChange={handleChange}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--color-text)',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#ff8c00' },
            },
            '& .MuiInputLabel-root': {
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.45)',
              '&.Mui-focused': { color: '#ff8c00' },
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

// export default function BasicSelect({ onChange }) {
//     const [city, setCity] = React.useState('');
  
//     const handleChange = (event) => {
//       const enteredCity = event.target.value;
//       setCity(enteredCity);
//       onChange(enteredCity);
//     };
  
//     return (
//       <Box sx={{ minWidth: 120 }}>
//         <FormControl fullWidth>
//           <TextField
//             id="city-input"
//             label="City"
//             value={city}
//             onChange={handleChange}
//           />
//         </FormControl>
//       </Box>
//     );
//   }
  