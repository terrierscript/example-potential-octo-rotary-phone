import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import produce from "immer"

const useBigArray = (len) => {
  const start = new Date().getTime()
  const [state, setState] = useState(Array(len).fill(0))
  const [lastTime, setLastTime] = useState(start)
  const [lastDiff, setLastDiff] = useState(0)
  useEffect(() => {
    const loop = () => {
      const time = new Date().getTime()
      setLastTime((lastTime) => {
        setLastDiff(time - lastTime)
        return time
      })
      const rnd = Math.floor(Math.random() * len)
      setState((s) => {
        return produce(s, (s) => {
          s[rnd] = s[rnd] ? 0 : 1
        })
      })
      requestAnimationFrame(loop)
    }
    loop()
  }, [])
  return { state, lastTime, lastDiff }
}

const useBigObject = (len) => {
  const start = new Date().getTime()
  const [state, setState] = useState({ ...Array(len).fill(0) })
  const [lastTime, setLastTime] = useState(start)
  const [lastDiff, setLastDiff] = useState(0)
  useEffect(() => {
    const loop = () => {
      const time = new Date().getTime()
      setLastTime((lastTime) => {
        setLastDiff(time - lastTime)
        return time
      })
      const rnd = Math.floor(Math.random() * len)
      setState((s) => {
        return {
          ...s,
          [rnd]: s[rnd] ? 0 : 1
        }
      })
      requestAnimationFrame(loop)
    }
    loop()
  }, [])
  return { state, lastTime, lastDiff }
}

const App = () => {
  const { state, lastTime, lastDiff } = useBigArray(10000)
  // const { state, lastTime, lastDiff } = useBigObject(1000)
  // console.log(state)
  // console.log(state.entries())
  return (
    <div>
      <div>{lastTime}</div>
      <div>{lastDiff}</div>
      {/* <div>{state.join("")}</div> */}
      {/* {state.map((s, i) => (
        <span key={i}>{s}</span>
      ))} */}
      {/* {Object.entries(state).map(([i, s]) => (
        <span key={i}>{s}</span>
      ))} */}
      {/* <pre>{state.join("")}</pre> */}
    </div>
  )
}

render(<App />, document.querySelector("#container"))
