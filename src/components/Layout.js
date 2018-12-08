import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import SEO from '../components/seo/SEO'

class Layout extends React.Component {
  render() {
    const { location, title, subTitle, children } = this.props
    const blogRootPath = `${__PATH_PREFIX__}/blog`
    let header

    const pattern = new RegExp(`^${blogRootPath}(\/)?$`)

    if (pattern.test(location.pathname)) {
      header = (
        <h2
          style={{
            ...scale(1.5),
            marginTop: 0,
            marginBottom: rhythm(1 / 2),
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
        </h2>
      )
    } else {
      header = (
        <h3
          style={{
            marginBottom: rhythm(1 / 2),
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
            paddingTop: rhythm(1.5),
            paddingBottom: rhythm(1.5),
          }}
        >
          <SEO />
          {header}
          <h4
            style={{
              marginTop: 0,
              color: 'grey',
            }}
          >
            {subTitle}
          </h4>
          <div
            style={{
              marginTop: rhythm(2),
            }}
          >
            {children}
          </div>
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
