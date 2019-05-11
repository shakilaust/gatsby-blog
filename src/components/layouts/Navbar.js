import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import '../../styles/navbar.scss'

const links = [
  {
    to: '/',
    title: 'About',
    icon: 'fa-info-circle',
  },
  {
    to: '/blog',
    title: 'Blog',
    icon: 'fa-rss',
  },
  {
    to: '/books',
    title: 'Books',
    icon: 'fa-book',
  },
  {
    to: '/resume',
    title: 'Resume',
    icon: 'fa-print',
  },
]

class Navbar extends React.Component {
  render() {
    console.log(this.props)
    const { location } = this.props
    return (
      <header className="header">
        <div className="container">
          <div className="nav-links">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                title={link.title}
                className={
                  location && location.pathname === link.to ? 'active' : null
                }
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </header>
    )
  }
}

export default Navbar
