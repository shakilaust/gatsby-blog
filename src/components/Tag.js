import React, { Component } from 'react'

class Tag extends React.Component {
  render() {
    return (
      <a
        style={{
          padding: '0.5rem',
          color: 'rgba(0,0,0,.68)',
          background: 'rgba(0,0,0,.05)',
          marginRight: '0.5rem',
          marginBottom: '0.5rem',
          borderRadius: '.25em',
          display: 'inline',
          lineHeight: 1,
          fontSize: '75%',
          fontWeight: 700,
          padding: '.2em .6em .3em',
          textAlign: 'center',
          verticalAlign: 'baseline',
          whiteSpace: 'nowrap',
        }}
        href={`/blog/tags/${this.props.tag}`}
      >
        {this.props.tag}
      </a>
    )
  }
}

export default Tag
