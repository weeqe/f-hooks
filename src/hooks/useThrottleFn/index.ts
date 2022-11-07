import useLatest from "../useLatest";
import {useMemo} from "react";
import {throttle} from 'lodash'
import useUnmount from "../useUnmount";

type noop = (...args: any[]) => any

export interface ThrottleOptions {
    wait: number
    leading?: boolean
    trailing?: boolean
}

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {

    const fnRef = useLatest(fn)

    const wait = options?.wait ?? 1000

    const throttled = useMemo(() => {
        return throttle((...args: [...Parameters<T>]): ReturnType<T> => {
            return fnRef.current(...args)
        }, wait, options)
    }, [])

    useUnmount(() => {
        throttled.cancel();
    })

    return {
        run: throttled,
        cancel: throttled.cancel,
        flush: throttled.flush
    }
}

export default useThrottleFn