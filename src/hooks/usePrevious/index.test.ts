import {describe, expect, it} from "vitest";
import {renderHook} from "@testing-library/react-hooks";
import usePrevious, {ShouldUpdateFn} from "./index";

describe('usePrevious', () => {

    function setup<T>(initialValue?: T, shouldUpdate?: ShouldUpdateFn<T>) {
        return renderHook(({val, fn}) => usePrevious(val as T, fn), {
            initialProps: {
                val: initialValue || 0,
                fn: shouldUpdate
            } as { val: T, fn?: ShouldUpdateFn<T> }
        })
    }

    it('should return undefined on init', () => {
        expect(setup().result.current).toBeUndefined()
    })

    it('should update previous value only after render with different value', () => {
        const hook = setup(0, () => true)

        expect(hook.result.current).toBeUndefined()

        hook.rerender({val: 1})
        expect(hook.result.current).toBe(0)

        hook.rerender({val: 2})
        expect(hook.result.current).toBe(1)

        hook.rerender({val: 3})
        expect(hook.result.current).toBe(2)
    })

    it('should work with undefined value', () => {
        const hook = renderHook(({value}) => usePrevious(value), {
            initialProps: {
                value: undefined as undefined | number
            }
        })
        expect(hook.result.current).toBeUndefined()

        hook.rerender({value: 1})
        expect(hook.result.current).toBeUndefined()

        hook.rerender({value: 2})
        expect(hook.result.current).toBe(1)
    })

    it('should receive a predicate as a second parameter that will compare prev and current', () => {
        const obj1 = { label: 'John', value: 'john' };
        const obj2 = { label: 'Jonny', value: 'john' };
        const obj3 = { label: 'Kate', value: 'kate' };
        type Obj = { label: string; value: string };
        const predicate = (a: Obj | undefined, b: Obj) => (a ? a.value !== b.value : true);

        const hook = setup(obj1 as Obj, predicate);

        expect(hook.result.current).toBeUndefined();

        hook.rerender({ val: obj2, fn: predicate });

        expect(hook.result.current).toBeUndefined();

        hook.rerender({ val: obj3, fn: predicate });

        expect(hook.result.current).toBe(obj1);
    });

})