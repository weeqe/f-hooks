import {describe, expect, it} from "vitest";
import {renderHook, act} from "@testing-library/react-hooks";
import useSetState from "./index";


describe('useSetState', () => {
  it('should be defined', () => {
    expect(useSetState).toBeDefined()
  });

  const setUp = <T extends object>(initialValue: T) =>
    renderHook(() => {
      const [state, setState] = useSetState<T>(initialValue)
      return {state, setState}
    })

  it('should support initialValue', () => {
    const hook = setUp({hello: 'hello'})
    const a = hook.result.current
    expect(hook.result.current.state).toEqual({hello: 'hello'})
  });

  it('should support setState', () => {
    const hook = setUp<{
      hello: string,
      [key: string]: any
    }>({hello: 'hello'})
    act(() => {
      hook.result.current.setState({fpo: 'fpo'})
    })
    expect(hook.result.current.state).toEqual({hello: 'hello', fpo: 'fpo'})
  });

  it('should support function update', () => {
    const hook = setUp({hello: 'hello', count: 0})
    act(() => {
      hook.result.current.setState(prev => ({count:  prev.count + 1}))
    })
    expect(hook.result.current.state).toEqual({hello: 'hello', count: 1})
  });
});
