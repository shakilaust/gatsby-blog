import React from 'react'
import '../styles/index.scss'

class Tag extends React.Component {
  render() {
    return (
      <a className="badge tag" href={`/blog/tags/${this.props.tag}`}>
        {this.props.tag}
      </a>
    )
  }
}

export default Tag
