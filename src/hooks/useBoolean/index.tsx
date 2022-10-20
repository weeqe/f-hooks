import {useMemo} from "react";
import useToggle from "../useToggle";

interface Actions {
  toggle: () => void
  set: (value: boolean) => void
  setTrue: () => void
  setFalse: () => void
}

const useBoolean = (defaultValue = false): [boolean, Actions] => {
  const [state, {toggle, set}] = useToggle(defaultValue);

  const actions = useMemo<Actions>(() => {
    const setTrue = () => set(true)
    const setFalse = () => set(false)
    return {
      toggle,
      setTrue,
      setFalse,
      set: (v) => set(!!v)
    }
  }, []);

  return [state, actions]
}

export default useBoolean
