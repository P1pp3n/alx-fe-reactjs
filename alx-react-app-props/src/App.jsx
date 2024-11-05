import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'
import { UserContext } from './components/UserContext';

function App() {
  const [count, setCount] = useState(0);
  const  [name,setName]=useState('');
  const userName = "Alicia";

  return (
    
    <>
      <div>
        <WelcomeMessage />
        <Header />
        <MainContent />
        <Footer />
        <UserContext.Provider  value={userName}>
          <UserProfile name="Alice" age="23" bio="Software Engineer"/>
        </UserContext.Provider>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        
        <input type='text' onChange={e => setName(e.target.value)}/>
        <h1>{name} has clicked {count} times!!!</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          Click me.
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
