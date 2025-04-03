import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 import AppRouter from './components/core/Approuter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppRouter>
       <div className="app">
        <h1>Hello, Vite!</h1>
        <p>
          <img src={reactLogo} alt="React logo" />
          <img src={viteLogo} alt="Vite logo" />
        </p>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </AppRouter>
  )
}

export default App
