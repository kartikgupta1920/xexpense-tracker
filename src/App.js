
import {SnackbarProvider} from 'notistack';
import HomePage from './Page/HomePage';

function App() {
  return (
    <SnackbarProvider>
      <div>
        <HomePage />
      </div>
    </SnackbarProvider>
  );
}

export default App;
