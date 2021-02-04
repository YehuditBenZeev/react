import logo from './logo.svg';
import './App.css';

function SignedApp(props) {
    const text = 'user logedin/ signedup.' + props.displayName
  return (
    <div className="App">
      <header className="App-header">
        <div>{text}</div>
      </header>
    </div>
  );
}

export default SignedApp;
