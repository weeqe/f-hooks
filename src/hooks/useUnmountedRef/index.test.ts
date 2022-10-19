import {describe, expect, it} from "vitest";
import { renderHook} from "@testing-library/react-hooks";
import useUnmountedRef from "./index";

describe('useUnmount', () => {
  it('should be defined', () => {
    expect(useUnmountedRef).toBeDefined()
  });
  it('should work', () => {
    const hook = renderHook(() => useUnmountedRef())
    hook.rerender()
    expect(hook.result.current.current).toBeFalsy()
    hook.unmount()
    expect(hook.result.current.current).toBeTruthy()
  });
});
