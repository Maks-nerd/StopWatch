import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [btnText, setbtnText] = useState('');
  const [wait, setWait] = useState(false);

  useEffect(() => {
    let interval = null;

    if(start){
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10);
      setbtnText('Stop')
      setWait(false);
    } else {
      clearInterval(interval);
      setbtnText('Start')
      setWait(true);
    }

    return () => clearInterval(interval);
  }, [start]);
  return (
    <div className="App">
      <h1>StopWatch</h1>
      <h1>
        <span className="me-3">{('0' + Math.floor(( time / 60000 ) % 60)).slice(-2)}</span>
        <span className="me-3">{('0' + Math.floor(( time / 1000 ) % 60)).slice(-2)}</span>
        <span>{('0' + ( time / 10 ) % 1000).slice(-2)}</span>
      </h1>
      <div>
        <button type="button" className="me-3" onClick={() => {!wait && setTime(0); start ? setStart(false) : setStart(true);}}>{btnText}</button>
        <button type="button" className="me-3" onDoubleClick={() => {setStart(false); setWait(true);}}>Wait</button>
        {/* <button type="button" className="me-3" onClick={clickHandler}>Wait</button> */}
        <button type="button" onClick={() => {setTime(0); setStart(true); setWait(false);}}>Reset</button>
      </div>
    </div>
  );
}

export default App;
