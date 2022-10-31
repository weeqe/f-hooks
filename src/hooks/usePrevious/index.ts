import {useEffect, useRef} from "react";


type ShouldUpdateFn<T> = (prev: T | undefined, next:  T) => boolean

const defaultShouldUpdate = <T>(a?: T, b?:T) => !Object.is(a, b)

function usePrevious<T> (state: T, shouldUpdate: ShouldUpdateFn<T> = defaultShouldUpdate) {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current
    curRef.current = state
  }

  useEffect(() => {
    console.log('effect')
  }, [state]);


  return prevRef.current
}

export default usePrevious
