import Cookies, { CookieAttributes } from 'js-cookie'
import { isFunction, isString } from 'lodash';
import React, { useState } from 'react'

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

    const setCookie = (s: React.SetStateAction<State>, options?: Options) => {

    }

    return [state, setState] as const
}

export default useCookieState