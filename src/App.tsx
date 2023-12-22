import { ThemeProvider } from '@mui/material';
import './App.css';
import { Allroutes } from './routes/allroutes';
import { theme } from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Allroutes/>
    </ThemeProvider>
    
  );
}

export default App;
