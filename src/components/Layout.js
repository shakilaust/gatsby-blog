import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import SEO from '../components/seo/SEO'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const blogRootPath = `${__PATH_PREFIX__}/blog`
    let header

    const pattern = new RegExp(`^${blogRootPath}(\/)?$`)

    if (pattern.test(location.pathname)) {
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
            to={'/blog'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/blog'}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div>
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
        <div
          style={{
            position: 'relative',
            bottom: rhythm(1),
            textAlign: 'center',
          }}
        >
          <small>&copy; Meha Masum, 2018</small>
        </div>
      </div>
    )
  }
}

export default Layout
