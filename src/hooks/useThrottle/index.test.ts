import {describe, it, expect} from "vitest";
import {renderHook} from "@testing-library/react-hooks";
import useThrottle from "./index";
import {sleep} from "../utils";

describe('useThrottle', function () {

    it('default useThrottle should work', async () => {
        let mountedState = 1
        const hook = renderHook(() => useThrottle(mountedState, {wait: 500}));
        mountedState = 2
        hook.rerender()
        mountedState = 3
        hook.rerender()
        await sleep(200)
        expect(hook.result.current).toBe(1)
        await sleep(310)
        expect(hook.result.current).toBe(3)
    })
});