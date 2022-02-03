import './App.css';
import QuizWindow from './components/QuizWindow/QuizWindow';
import Header from './components/UI/Input/Header/Header';
import store from "../src/store/store"
import {Provider} from 'react-redux';


function App() {
  return (
    <Provider store = {store}>    
    <div className="App">
      <Header></Header>
      <main>
      <QuizWindow></QuizWindow>
      <QuizWindow></QuizWindow>
      </main>
    </div>
    </Provider>
  );
}

export default App;
