import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import Landing from './views/landing';
import Search from './views/search';
import PokemonPage from './views/pokemon-page';
import NotFound from './views/404';
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function App() {


  return (
    <BrowserRouter>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
        />
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
        />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search/:searchParam?" element={<Search />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="/404" element={<NotFound/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
