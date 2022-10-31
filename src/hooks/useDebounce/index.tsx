import {useEffect, useState} from "react";
import {DebounceOptions} from "./debounceOptions";
import useDebounceFn from "../useDebounceFn";

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState<T>(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value)
  }, options)

  useEffect(() => {
    run()
  }, [value]);

  return debounced
}

export default useDebounce
