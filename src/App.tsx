import {useEffect, useState} from 'react'
import useUnmount from "./hooks/useUnmount";
import useUnmountedRef from './hooks/useUnmountedRef'

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
  const unmountedRef  = useUnmountedRef()
  useUnmount(() => {
    console.log('unmount', num)
  })
  useEffect(() => {
    if (!unmountedRef.current) {
      console.log('component is alive')
    }
  }, [])
  return <div>
    <h2>child</h2>
    <span>num: {num}</span>
    <button onClick={() => setNum(num + 1)}>add</button>
  </div>
}


export default App
