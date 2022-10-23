import {describe, expect, it} from "vitest";
import {renderHook} from "@testing-library/react-hooks";
import useLatest from "./index";

const setUp = (val: any) => renderHook((state) => useLatest(state), {initialProps: val})

describe('useLatest', () => {
  it('should be defined', () => {
    expect(useLatest).toBeDefined()
  });
  it('useLatest with basic variable should work', () => {
    const hook = setUp(0)
    hook.rerender(1)
    expect(hook.result.current.current).toEqual(1)

    hook.rerender(2)
    expect(hook.result.current.current).toEqual(2)

    hook.rerender(3)
    expect(hook.result.current.current).toEqual(3)
  });
  it('useLatest with reference variable should work', () => {
    const hook = setUp({})
    expect(hook.result.current.current).toEqual({})

    hook.rerender([])
    expect(hook.result.current.current).toEqual([])
  });
});
