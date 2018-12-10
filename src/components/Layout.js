import React from 'react'
import { Link } from 'gatsby'

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
            marginTop: 0,
            marginBottom: '1.5rem',
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
            marginBottom: '0.5rem',
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
            maxWidth: '75rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
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
              marginTop: '1.5rem',
            }}
          >
            {children}
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            bottom: '1rem',
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
