import {useState} from 'react'
import useUnmount from "./hooks/useUnmount";

function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      <button onClick={() => setShow(!show)}>hidden</button>
      {show ? <Child/> : null}
    </div>
  )
}

const Child = () => {
  const [num, setNum] = useState(0);
  useUnmount(() => {
    console.log('unmount', num)
  })
  return <div>
    <h2>child</h2>
    <span>num: {num}</span>
    <button onClick={() => setNum(num + 1)}>add</button>
  </div>
}


export default App
