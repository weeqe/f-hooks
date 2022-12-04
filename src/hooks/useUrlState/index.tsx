import { ParseOptions, StringifyOptions, parse, stringify } from 'query-string'
import React, { useMemo, useRef } from 'react';
import * as tmp from 'react-router';
import useMemoizedFn from '../useMemoizedFn';

const baseParseConfig: ParseOptions = {
    parseNumbers: false,
    parseBooleans: false
}

const baseStringifyConfig: StringifyOptions = {
    skipNull: false,
    skipEmptyString: false
}

const rc = tmp as any

console.log(
    rc
);


type UrlState = Record<string, any>

interface Options {
    navigateMode?: 'push' | 'replace'
    parseOptions?: ParseOptions
    stringifyOptions?: StringifyOptions
}

const useUrlState = <S extends UrlState = UrlState>(
    initialState?: S | (() => S),
    options?: Options
) => {
    type State = Partial<{ [P in keyof S]: any }>
    const { navigateMode = 'push', parseOptions, stringifyOptions } = options || {}

    const mergedParseOptions = { ...baseParseConfig, ...parseOptions }
    const mergedStringifyOptions = { ...baseStringifyConfig, ...stringifyOptions }

    const location = rc.useLocation()
    // react-router v5
    const history = rc.useHistory?.()
    // react-router v6
    const navigate = rc.useNavigate?.()

    const initialStateRef = useRef(typeof initialState === 'function' ? initialState() : initialState || {})

    const queryFromUrl = useMemo(() => {
        return parse(location.search, mergedParseOptions)
    }, [location.search])

    const targetQuery: State = useMemo(() => {
        return { ...initialStateRef.current, ...queryFromUrl }
    }, [queryFromUrl])

    const setState = (s: React.SetStateAction<State>) => {
        const newQuery = typeof s === 'function' ? s(targetQuery) : s

        if (history) {
            // 需要重新设置 hash 在改变search的时候，hash的值会被清理
            history[navigateMode]({
                hash: location.hash,
                search: stringify({ ...targetQuery, ...newQuery }, mergedStringifyOptions) || '?'
            })
        } else {
            navigate({
                hash: location.hash,
                search: stringify({ ...targetQuery, ...newQuery }, mergedStringifyOptions) || '?'
            }, {
                replace: navigateMode === 'replace'
            })
        }
    }

    return [targetQuery, useMemoizedFn(setState)] as const
}

export default useUrlState