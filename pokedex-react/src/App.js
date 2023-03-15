import logo from './logo.svg';
import Landing from './views/landing';
import Search from './views/search';
import PokemonPage from './views/pokemon-page';

function App() {
  return (
    <div className="App">
      <PokemonPage id={1}/>
    </div>
  );
}

export default App;
