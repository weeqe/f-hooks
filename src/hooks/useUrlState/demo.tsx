import React from 'react';
import useUrlState from './index';

export default () => {
    const [state, setState] = useUrlState({ count: '1' });
    console.log('update', state);
    return (
        <>
            <button
                style={{ marginRight: 8 }}
                type="button"
                onClick={() => setState({ count: Number(state.count || 0) + 1 })}
            >
                add
            </button>
            <button type="button" onClick={() => setState({ count: undefined })}>
                clear
            </button>
            <div>state: {state?.count}</div>
        </>
    );
};