import RoutesMain from './routes';
import './App.css'
import './Main.css'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <div className="App">
        <RoutesMain />
      </div>
    </Provider>
  );
}

export default App;
