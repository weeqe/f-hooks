import {useRef} from "react";
import {isFunction} from "../utils";


type Fn = (...args: any[]) => any

type PickFn<T extends Fn> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

function useMemoizedFn<T extends Fn>(fn: T) {
  if (!isFunction(fn)) {
   console.error(`useMemoizedFn expect parameter is a function, got ${typeof fn}`)
  }

  const fnRef = useRef(fn)

  fnRef.current = fn

  const memoizedFn = useRef<PickFn<T>>()

  if (!memoizedFn.current) {
    memoizedFn.current =  function (this, ...args: any[]) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current
}

export default useMemoizedFn
