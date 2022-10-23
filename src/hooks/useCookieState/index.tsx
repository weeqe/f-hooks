import Cookies from 'js-cookie'
import {useState} from "react";
import {isFunction, isString} from '../utils'
import useMemoizedFn from "../useMemoizedFn";

type State = string | undefined

export interface Options extends Cookies.CookieAttributes {
  // 定义 Cookie 默认值，但不同步到本地 Cookie
  defaultValue?: State | (() => State)
}

const useCookieState = (cookieKey: string, options: Options = {}) => {
  const [state, setState] = useState(() => {
    const cookieValue = Cookies.get(cookieKey)
    if (isString(cookieValue)) return cookieValue
    if (isFunction(options.defaultValue)) {
      return options.defaultValue()
    }
    return options.defaultValue
  });

  const updateState = useMemoizedFn((newValue: State | ((prevState: State) => State), newOptions: Cookies.CookieAttributes = {}) => {
    const {defaultValue, ...restOptions} = {...options, ...newOptions}

    setState((prevState) => {
      const value = isFunction(newValue) ? newValue(prevState) : newValue
      if (value === undefined) {
        Cookies.remove(cookieKey)
      } else {
        Cookies.set(cookieKey, value, restOptions)
      }
      return value
    })
  })

  return [state, updateState] as const
}

export default useCookieState
