import React from 'react'
import '../styles/index.scss'
import { Link } from 'gatsby'

class Tag extends React.Component {
  render() {
    return (
      <span className="badge tag">
        {this.props.external ? (
          <a
            href={this.props.url}
            target="_blank"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {this.props.tag}
          </a>
        ) : (
          <Link
            to={this.props.url || `/blog/tags/${this.props.tag}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {this.props.tag}
          </Link>
        )}
      </span>
    )
  }
}

export default Tag
