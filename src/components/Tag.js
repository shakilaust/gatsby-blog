import React from 'react'
import '../styles/index.scss'
import { Link } from 'gatsby'

class Tag extends React.Component {
  render() {
    return (
      <span className="badge tag">
        <Link
          to={this.props.url || `/blog/tags/${this.props.tag}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {this.props.tag}
        </Link>
      </span>
    )
  }
}

export default Tag
