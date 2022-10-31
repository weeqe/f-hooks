import {describe, it, expect, vi, SpyInstance, beforeAll} from "vitest";
import {act, renderHook} from "@testing-library/react-hooks";
import useLocalStorageState, {Options} from "./index";
import useSetState from "../useSetState";

const setUp = <T extends object>(initialValue: T) =>
  renderHook(() => {
    const [state, setState] = useSetState<T>(initialValue)
    return {state, setState}
  })

class TestStorage implements Storage {
  [name: string]: any;

  length: number = 0;

  _values = new Map<string, string>();

  clear(): void {
    this._values.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this._values.get(key) || null;
  }

  key(index: number): string | null {
    if (index >= this._values.size) {
      return null;
    }

    return Array.from(this._values.keys())[index];
  }

  removeItem(key: string): void {
    if (this._values.delete(key)) {
      this.length -= 1;
    }
  }

  setItem(key: string, value: string): void {
    if (!this._values.has(key)) {
      this.length += 1;
    }

    this._values.set(key, value);
  }
}


describe('useLocalStorage', () => {

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", { value: TestStorage });
  })

  const setUp = <T extends any>(key: string, options?: Options<T>) => renderHook(() => {
    const [state, setState] = useLocalStorageState(key, options)
    return {state, setState}
  })

  it('should work', () => {
    const hook = setUp('test')
    expect(hook.result.current.state).toBeUndefined()
    act(() => {
      hook.result.current.setState('hello')
    })
    expect(hook.result.current.state).toEqual('hello')

    act(() => {
      setUp('test')
    })
    expect(hook.result.current.state).toEqual('hello')
  });

  it('should support localStorage', () => {
    // const spy1 = vi.spyOn(global.localStorage, 'getItem').mockReturnValue('hello1sss')
    // window.localStorage.setItem('test1', 'world')
    // Storage.prototype.getItem = vi.fn(() => 'bla');
    // const spy2 = vi.spyOn(Storage.prototype, 'setItem')
    // const hook = setUp('test1')
    // expect(hook.result.current.state).toEqual('world')
    // expect(spy1).toHaveBeenCalledTimes(0)
    // act(() => {
    //   hook.result.current.setState('world')
    // })
    //
    // console.log('hddd', spy2)
    //
    // expect(spy2).toHaveBeenCalledTimes(1)
  });
});
