import {describe, it, expect} from "vitest";
import {act, renderHook} from "@testing-library/react-hooks";
import useToggle from "./index";

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined()
  });


  it('support definedValue', () => {
    const hook = renderHook(() => useToggle())
    expect(hook.result.current[0]).toBeFalsy()
  });

  it('test on methods', () => {
    const hook = renderHook(() => useToggle('Hello'))
    expect(hook.result.current[0]).toBe('Hello')

    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toBeFalsy()

    act(() => {
      hook.result.current[1].setLeft()
    })
    expect(hook.result.current[0]).toBe('Hello')

    act(() => {
      hook.result.current[1].setRight()
    })
    expect(hook.result.current[0]).toBeFalsy()
  });

  it('test on optional', () => {
    const hook = renderHook(() => useToggle('hello', 'world'))
    expect(hook.result.current[0]).toBe('hello')

    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toBe('world')

    act(() => {
      hook.result.current[1].setLeft()
    })
    expect(hook.result.current[0]).toBe('hello')

    act(() => {
      hook.result.current[1].setRight()
    })
    expect(hook.result.current[0]).toBe('world')

    act(() => {
      hook.result.current[1].set('hi')
    })
    expect(hook.result.current[0]).toBe('hi')

  });
});
