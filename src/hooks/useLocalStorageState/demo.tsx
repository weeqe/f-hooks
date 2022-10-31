
import useLocalStorageState from './index'

const Demo = () => {
  const [state, setState] = useLocalStorageState('test', {defaultValue: 'local demo'})

  return <div>
    <h2>useLocalStorageState</h2>
    <input type="text" value={state} onChange={e => setState(e.target.value)}/>
  </div>
}

export default Demo
