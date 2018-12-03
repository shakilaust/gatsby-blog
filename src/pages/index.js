import React from 'react'
import { Link, graphql } from 'gatsby'

class SiteIndex extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>Hello world</div>
        <Link to='/blog'>Blog</Link>
      </React.Fragment>
    )
  }
}

export default SiteIndex
