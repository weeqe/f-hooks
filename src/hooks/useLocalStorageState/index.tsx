import {useMemo, useState} from "react";
import {isFunction} from "../utils";
import useMemoizedFn from "../useMemoizedFn";


interface Options {
  defaultValue?: string | (() => string)
  serializer?: (value: any) => string
  deserializer?: (value: string) => any
}

const useLocalStorageState = (key: string, options: Options = {}) => {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key)
    const defaultValue = isFunction(options.defaultValue) ? options.defaultValue() : options.defaultValue
    if (value === undefined) {
      return defaultValue
    }
    return value
  });

  const serializerState = useMemo(() => {
    if (isFunction(options.serializer)) {
      return options.serializer(state)
    }
    return JSON.stringify(state)
  }, [state]);

  const setValue = useMemoizedFn(() => {

  })

}

export default useLocalStorageState
