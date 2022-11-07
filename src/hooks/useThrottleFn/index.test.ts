import {describe, expect, it} from "vitest";
import {act, renderHook} from "@testing-library/react-hooks";
import useThrottleFn from "./index";
import {sleep} from "../utils";

let count = 0
const throttleFn = (num: number) => {
    count += num
}

describe('useThrottle', function () {
    it('should work', async () => {
        const hook = renderHook(() => useThrottleFn(throttleFn, {wait: 500}))

        await act(async () => {
            hook.result.current.run(1);
            expect(count).toBe(1);
            hook.result.current.run(1);
            hook.result.current.run(1);
            hook.result.current.run(1);
            expect(count).toBe(1);
            await sleep(450);
            hook.result.current.run(2);
            expect(count).toBe(1);
            await sleep(100); // t: 550
            expect(count).toBe(3);
            hook.result.current.run(3);
            hook.result.current.run(3);
            await sleep(500); // t: 1050
            expect(count).toBe(6)
            hook.result.current.run(1);
            hook.result.current.run(4);
            hook.result.current.cancel();
            await sleep(500); // t: 1550
            expect(count).toBe(7);
            hook.result.current.run(1);
            hook.result.current.run(1);
            expect(count).toBe(8)
            hook.result.current.run(1);
            hook.result.current.flush()
            expect(count).toBe(9)
            await sleep(500)
            expect(count).toBe(9)
        })

    })
});