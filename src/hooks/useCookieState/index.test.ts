import {describe, it, expect} from "vitest";
import {renderHook, act} from "@testing-library/react-hooks";
import useCookieState, {Options} from './index'
import Cookies from 'js-cookie';

describe('useCookieState', () => {
  it('should be defined', () => {
    expect(useCookieState).toBeDefined()
  });

  const setUp = (key: string, options: Options) => renderHook(() => {
    const [state, setState] = useCookieState(key, options)
    return {state, setState} as const
  })

  it('should work', () => {
    const CookieKey = 'test-key'
    const hook = setUp(CookieKey, {defaultValue: 'A'})
    expect(hook.result.current.state).toEqual('A')

    act(() => {
      hook.result.current.setState('B')
    })
    expect(hook.result.current.state).toEqual('B')

    const anotherHook = setUp(CookieKey, {defaultValue: 'A'})
    expect(anotherHook.result.current.state).toEqual('B')

    act(() => {
      anotherHook.result.current.setState('C')
    })
    expect(anotherHook.result.current.state).toEqual('C')
    expect(hook.result.current.state).toEqual('B')
  });

  it('should support undefined', () => {
    const CookieKey = 'test-boolean-key-with-undefined'
    const hook = setUp(CookieKey, {defaultValue: 'undefined'})
    expect(hook.result.current.state).toEqual('undefined')

    act(() => {
      hook.result.current.setState(undefined)
    })
    expect(hook.result.current.state).toBeUndefined()
    const anotherHook = setUp(CookieKey, {
      defaultValue: 'false',
    });
    expect(anotherHook.result.current.state).toEqual('false');
  });

  it('should support empty string', () => {
    const CookieKey = 'test-empty'
    Cookies.set(CookieKey, '')
    expect(Cookies.get(CookieKey)).toBe('');
    const hook = setUp(CookieKey, {defaultValue: 'hello'})
    expect(hook.result.current.state).toEqual('')
  });

  it('should support function updater', () => {
    const CookieKey = 'test-func-updater'
    const hook = setUp(CookieKey, {defaultValue: () => 'hello'})
    expect(hook.result.current.state).toEqual('hello')

    act(() => {
      hook.result.current.setState((prevState) => {
        return prevState + ' world'
      })
    })
    expect(hook.result.current.state).toEqual('hello world')
  });

});
