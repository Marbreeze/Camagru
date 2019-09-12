import React, {useState} from 'react';
import './App.css';

function App() {

  const [apistatus, setApiStatus] = useState('Api is not working');

  const makeRequest = async () => {
    const response = await fetch('http://localhost:9000/testAPI');
    const answer = await response.json();
    console.log(answer);
    if (answer && answer.success)
      setApiStatus(answer.message);
  }



  return (
    <div className="App">
      <h1>{apistatus}</h1>
      <button onClick={makeRequest}>Test</button>
    </div>
  );
}

export default App;
