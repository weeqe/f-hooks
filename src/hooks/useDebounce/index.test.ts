import {describe, expect, it} from "vitest";
import {act, renderHook} from "@testing-library/react-hooks";
import useDebounce from "./index";
import {sleep} from "../utils";

describe('useDebounce', () => {


  it('should work', async () => {
    let mountedState = 0;
    const {result, rerender} = renderHook(() => useDebounce(mountedState, {wait: 200}))

    await act(async () => {
      mountedState = 1;
      rerender();
      await sleep(50);
      expect(result.current).toEqual(0);

      mountedState = 2;
      rerender();
      await sleep(100);
      expect(result.current).toEqual(0);

      mountedState = 3;
      rerender();
      await sleep(150);
      expect(result.current).toEqual(0);

      mountedState = 4;
      rerender();
      await sleep(250);
      expect(result.current).toEqual(4);
    })
  });
});
