import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from "./components/Header"
import Player from './components/pages/Player.tsx';
import Recommendations from './components/pages/Recommendations.tsx';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/video/:id" element={<Player />} />
        <Route path="/recom/" element={<Recommendations /> } />
      </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
