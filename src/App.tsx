import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import useUnmount from "./hooks/useUnmount";
import useUnmountedRef from './hooks/useUnmountedRef'
import SetStateDemo from "./hooks/useSetState/demo";
import ToggleDemo from './hooks/useToggle/demo'
import ToggleDemo2 from './hooks/useToggle/demo2'
import MemoizedFnDemo from './hooks/useMemoizedFn/demo'
import LocalStorageDemo from './hooks/useLocalStorageState/demo'
import ThrottleDemo from './hooks/useThrottle/demo'
import UrlStateDemo from './hooks/useUrlState/demo'

function App() {
    const [show, setShow] = useState(true);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<UrlStateDemo />}></Route>
                </Routes>
            </BrowserRouter>

            {/* <button onClick={() => setShow(!show)}>hidden</button>
            {show ? <Child/> : null}
            <SetStateDemo/>
            <ToggleDemo/>
            <ToggleDemo2/>
            <MemoizedFnDemo/>
            <LocalStorageDemo/>
            <ThrottleDemo/> */}
        </div>
    )
}

const Child = () => {
    const [num, setNum] = useState(0);
    const unmountedRef = useUnmountedRef()
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
