import React from 'react'

import profilePic from '../assets/avatar.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Meha Masum`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: '72px',
            height: '72px',
            borderRadius: '5%',
          }}
        />
        <p>
          Personal blog by{' '}
          <strong>
            <a href="/">Mehedi Hasan Masum</a>
            {'. '}
          </strong>
          <br />
          I explain things with words and code.
          <br />
          <span
            style={{
              fontSize: '80%',
            }}
          >
            <a href="https://github.com/mehamasum" target="_blank">
              Github
            </a>
            {' • '}
            <a href="https://linkedin.com/id/mehamasum" target="_blank">
              LinkedIn
            </a>
            {' • '}
            <a href="https://twitter.com/mehamasum" target="_blank">
              Twitter
            </a>
          </span>
          <br />
        </p>
      </div>
    )
  }
}

export default Bio
