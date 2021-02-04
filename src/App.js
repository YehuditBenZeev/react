import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form>
      <label>
    Email:
    <input type="text" name="name" />
  </label>
  <label>
    Password:
    <input type="password" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
