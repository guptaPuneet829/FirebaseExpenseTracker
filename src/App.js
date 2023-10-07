import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Authentication } from "./Pages/signInPage/index"
import { ExpenseTracker } from "./Pages/mainPage/index"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Authentication />}/>
          <Route path="/mainPage" element={<ExpenseTracker />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
