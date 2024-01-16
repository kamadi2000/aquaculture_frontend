import { ThemeProvider } from '@mui/material';
import './App.css';
import { Allroutes } from './routes/allroutes';
import { theme } from './utils/theme';
import { NotificationProvider } from './hooks/notification';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
      <Allroutes/>
      </NotificationProvider>
        
    </ThemeProvider>
    
  );
}

export default App;
