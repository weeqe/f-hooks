import { describe, it, expect, vi} from "vitest";
import {renderHook} from "@testing-library/react-hooks";
import useUnmount from "./index";

describe('useUnmount', () => {
  it('should be defined', () => {
    expect(useUnmount).toBeDefined()
  });
  it('useUnmount should work', () => {
    const fn = vi.fn()
    const hook = renderHook(() => useUnmount(fn))
    expect(fn).toBeCalledTimes(0)
    hook.rerender()
    expect(fn).toBeCalledTimes(0)
    hook.unmount()
    expect(fn).toBeCalledTimes(1)
  });
});
