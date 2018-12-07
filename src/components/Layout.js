import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import SEO from '../components/seo/SEO'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const blogRootPath = `${__PATH_PREFIX__}/blog`
    let header

    if (location.pathname.replace(/\/$/, '') === blogRootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <SEO />
        {header}
        {children}
      </div>
    )
  }
}

export default Layout
