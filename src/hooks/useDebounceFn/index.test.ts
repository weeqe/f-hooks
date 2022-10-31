import {expect, describe, it} from "vitest";
import {renderHook, act} from "@testing-library/react-hooks";
import useDebounceFn from "./index";
import {sleep} from "../utils";


let count = 0
const debounceFn = (num: number) => {
  count += num
}

describe('useDebounceFn', () => {
  it('run, cancel and flush should work', async () => {
    const hook = renderHook(() => useDebounceFn(debounceFn, {wait: 200}))

    await act(async () => {
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      expect(count).toBe(0)
      await sleep(300)
      expect(count).toBe(2)

      hook.result.current.run(4)
      expect(count).toBe(2)
      await sleep(300)
      expect(count).toBe(6)

      hook.result.current.run(4)
      expect(count).toBe(6)
      hook.result.current.cancel()
      expect(count).toBe(6)
      await sleep(300);
      expect(count).toBe(6)

      hook.result.current.run(1)
      hook.result.current.flush()
      expect(count).toBe(7)
      await sleep(300);
      expect(count).toBe(7);
    })
  });
});
