import {describe, expect, it} from "vitest";
import {act, renderHook} from "@testing-library/react-hooks";
import useBoolean from "./index";

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined()
  });

  it('test definedValue', () => {
    const hook = renderHook(() => useBoolean())
    expect(hook.result.current[0]).toBeFalsy()
  });

  it('test methods', () => {
    const hook = renderHook(() => useBoolean(true))
    expect(hook.result.current[0]).toBeTruthy()

    act(() => {
      hook.result.current[1].set(false)
    })
    expect(hook.result.current[0]).toBeFalsy()

    act(() => {
      hook.result.current[1].set(true)
    })
    expect(hook.result.current[0]).toBeTruthy()

    act(() => {
      hook.result.current[1].setFalse()
    })
    expect(hook.result.current[0]).toBeFalsy()

    act(() => {
      hook.result.current[1].setTrue()
    })
    expect(hook.result.current[0]).toBeTruthy()

    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toBeFalsy()

    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toBeTruthy()
  });
});
