import { Toaster } from 'react-hot-toast';
import './App.css';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';

function App() {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        gap: '20px',
      }}
    >
      <Navbar />
      <Hero />
      <Toaster />
    </div>
  )
}

export default App
