import {expect, describe, it, vi} from "vitest";
import {act, renderHook, RenderHookResult} from "@testing-library/react-hooks";
import useMemoizedFn from "./index";
import {useState} from "react";

const useCount = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(c => c + 1)
  }

  const memoizedFn = useMemoizedFn(() => count)

  return {addCount, memoizedFn}
}

let hook: RenderHookResult<[], ReturnType<typeof useCount>>

describe('useMemoizedFn', () => {
  it('should be defined', () => {
    expect(useMemoizedFn).toBeDefined()
  });

  it('should work', () => {
    hook = renderHook(() => useCount())
    const currentFn = hook.result.current.memoizedFn
    expect(hook.result.current.memoizedFn()).toBe(0)

    act(() => {
      hook.result.current.addCount()
    })
    expect(currentFn).toEqual(hook.result.current.memoizedFn)
    expect(hook.result.current.memoizedFn()).toBe(1)
  });

  it('should output error when fn is not a function', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderHook(() => useMemoizedFn(1 as any))
    expect(errSpy).toBeCalled()
    expect(errSpy).toBeCalledWith('useMemoizedFn expect parameter is a function, got number')
    //https://cn.vitest.dev/api/#mockreset
    errSpy.mockRestore()
  });

});
