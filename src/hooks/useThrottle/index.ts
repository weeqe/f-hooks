import useThrottleFn, {ThrottleOptions} from "../useThrottleFn";
import {useEffect, useState} from "react";



function useThrottle<T>(value: T, options?: ThrottleOptions) {
    const [throttled, setThrottled] = useState(value);

    const { run } = useThrottleFn(() => {
        setThrottled(value)
    }, options)

    useEffect(() => {
        run()
    }, [value]);

    return throttled
}

export default useThrottle