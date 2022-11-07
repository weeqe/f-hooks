import {useState} from "react";
import useThrottle from "./index";


export default () => {
    const [value, setValue] = useState<string>();
    const throttledValue = useThrottle(value, { wait: 1000 });

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Typed value"
                style={{ width: 280 }}
            />
            <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
        </div>
    );
};