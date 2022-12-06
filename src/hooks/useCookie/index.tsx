import Cookies, { CookieAttributes } from 'js-cookie'
import { isFunction, isString } from 'lodash';
import { useState } from 'react'
import useMemoizedFn from '../useMemoizedFn';

export type State = string | undefined;

interface Options extends CookieAttributes {
    defaultValue?: State | (() => State)
}

const useCookieState = (cookieKey: string, options: Options = {}) => {
    const [state, setState] = useState(() => {
        const cookieValue = Cookies.get(cookieKey)
        if (isString(cookieValue)) return cookieValue
        if (isFunction(options.defaultValue)) return options.defaultValue()
        return options.defaultValue
    })

    const setCookie = useMemoizedFn((newValue: State | ((prevState: State) => State), newOptions?: Options) => {
        const { defaultValue, ...restOptions } = { ...options, ...newOptions }
        setState((prevState) => {
            const value = isFunction(newValue) ? newValue(prevState) : newValue
            if (value === undefined) {
                Cookies.remove(cookieKey)
            } else {
                Cookies.set(cookieKey, value)
            }
            return value
        })
    })

    return [state, setState] as const
}

export default useCookieState