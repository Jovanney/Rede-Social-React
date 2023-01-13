import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Main} from "./pages/main/main"
import {Login} from "./pages/login"
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/createpost/CreatePost';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Main/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='createpost' element={<CreatePost/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
