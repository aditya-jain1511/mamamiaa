import './App.css';
import Pages from './Pages/Pages';
import Category from './Components/Category';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Pages />    
      </div>
    </BrowserRouter>
  );
}

export default App;
