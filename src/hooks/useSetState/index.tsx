import {useCallback, useState} from "react";
import {isFunction} from "../utils";

export type State<S, K extends keyof S> = Pick<S, K> | S | null

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: State<S, K> | ((prevState: Readonly<S>) => State<S, K> | S)
) => void

const useSetState = <S extends Record<string, any>>(initState: S | (() => S)): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initState);

  const setMergeState = useCallback<SetState<S>>((patch) => {
    setState(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch
      return newState ? {...prevState, ...newState} : prevState
    })
  }, [])

  return [state, setMergeState]
}

export default useSetState
