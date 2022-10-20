import {useMemo, useState} from "react";


interface Actions<T> {
  toggle: () => void
  set: (state: T) => void
  setLeft: () => void
  setRight: () => void
}

function useToggle<T = boolean>(): [boolean, Actions<T>]

function useToggle<T>(defaultValue: T): [T, Actions<T>]

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]

function useToggle<D, R>(defaultValue: D = false as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo<Actions<D | R>>(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R
    const toggle = () => setState(prev => prev === defaultValue ? reverseValueOrigin : defaultValue)
    const set = (val: D | R) => setState(val)
    const setLeft = () => setState(defaultValue)
    const setRight = () => setState(reverseValueOrigin)
    return {
      toggle,
      set,
      setLeft,
      setRight
    }
  }, []);

  return [state, actions]
}

export default useToggle
