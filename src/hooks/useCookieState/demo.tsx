import React from 'react'
import useCookieState from "./index";

const CookieStateDemo = () => {
  const [state, setState] = useCookieState('userName', {})
  console.log(state)
  console.log(setState)
  return <div>useCookieState</div>
}
