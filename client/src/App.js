import "./App.css";
import { GetFundaciones } from "./components/ListFundaciones";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Arquitectura monolitica</h1>
      <h2>Fundaciones</h2>
      <GetFundaciones/>

    </div>
  );
}

export default App;
