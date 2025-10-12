import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">傅冠豪 MD</Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            首頁
          </Link>
          <Link
            to="/md-renderer"
            className={`nav-link ${location.pathname === '/md-renderer' ? 'active' : ''}`}
          >
            論文渲染器
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
