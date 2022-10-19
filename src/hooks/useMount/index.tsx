import { useEffect } from "react";
import {isFunction} from "../utils";

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.()
  }, []);
}

export default useMount
