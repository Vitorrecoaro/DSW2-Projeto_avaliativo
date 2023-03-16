import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import Landing from './views/landing';
import Search from './views/search';
import PokemonPage from './views/pokemon-page';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search/:searchParam?" element={<Search />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
