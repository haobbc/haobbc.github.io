import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import MDRenderer from './pages/MDRenderer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<div className="container"><Home /></div>} />
            <Route path="/md-renderer" element={<MDRenderer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
