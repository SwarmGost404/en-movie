import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Player from './components/pages/Player.tsx';
import Recommendations from './components/pages/Recommendations.tsx';
import Footer from './components/Footer.tsx';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Recommendations /> } />
        <Route path="/video/:id" element={<Player />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
