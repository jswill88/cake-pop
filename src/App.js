import './App.css';
import Synth from './components/Synth';
import Header from './components/Header';
import LoginProvider from './context/loggedIn';

function App() {
  return (
    <LoginProvider>
      <div>
        <Header />
        <Synth />
      </div>
    </LoginProvider>
  );
}

export default App;
