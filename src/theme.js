import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // dark|light switch later if you want
    primary: { main: '#1976d2' }, // soft blue (Stripo‑like)
    secondary: { main: '#4dabf5' },
    background: {
      default: '#f2f4f6', // subtle grey canvas b‑g
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['SamsungOne', 'Arial', 'Helvetica', 'sans-serif'].join(','),
  },
  shape: { borderRadius: 4 },
});

export default theme;
