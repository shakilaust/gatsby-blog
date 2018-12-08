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
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '5%',
          }}
        />
        <p>
          Written by <strong>Meha Masum</strong> who lives and works in San
          Francisco building useful things.{' '}
          <a href="https://twitter.com/mehamasum">
            You should follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
