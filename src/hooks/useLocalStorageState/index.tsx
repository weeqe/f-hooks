import { useMemo, useState } from "react";
import { isFunction, isUndef } from "../utils";
import useMemoizedFn from "../useMemoizedFn";


interface Options<T> {
  defaultValue?: T | (() => T)
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}
function useLocalStorageState<T>(key: string, options?: Options<T>) {
  const [state, setState] = useState<T>(() => {
    const raw = localStorage.getItem(key)
    if (raw) {
      return deserializer(raw)
    }
    if (isFunction(options?.defaultValue)) {
      return options?.defaultValue()
    }
    return options?.defaultValue
  });

  const serializer = (value: T) => {
    if (options?.serializer) {
      return options.serializer(value)
    }
    return JSON.stringify(value)
  }

  const deserializer = (value: string) => {
    if (options?.deserializer) {
      return options.deserializer(value)
    }
    return JSON.parse(value)
  }

  const updateState = useMemoizedFn((value: T | ((prevState: T) => T)) => {
    const currentState = isFunction(value) ? value(state) : value
    setState(currentState)

    if (isUndef(currentState)) {
      localStorage.removeItem(key)
    } else {
      try {
        localStorage.setItem(key, serializer(currentState))
      } catch (error) {
        console.error(error)
      }
    }
  })

  return [state, updateState]
}

export default useLocalStorageState
