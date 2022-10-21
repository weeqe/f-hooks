import React, {memo, useCallback, useState} from 'react'
import useMemoizedFn from "./index";

const MemoizedFnDemo = () => {
  const [num, setNum] = useState(0);

  const childClick = useMemoizedFn(
    () => {
      console.log('num', num)
    });

  // const childClick = useCallback(
  //   () => {
  //     console.log('num', num)
  //   }, [num]);


  return <div>
    <span>num: {num}</span>
    <button onClick={() => setNum(num + 1)}>click</button>
    <Child childClick={childClick}/>
  </div>
}

const Child = memo(({childClick}: { childClick: any }) => {
  console.log('childRender')
  return <div onClick={childClick}>child</div>
})

export default MemoizedFnDemo
