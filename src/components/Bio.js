import React from 'react'

import profilePic from '../assets/avatar.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: '2.5rem',
        }}
      >
        <img
          src={profilePic}
          alt={`Meha Masum`}
          style={{
            marginRight: '1rem',
            marginBottom: 0,
            width: '60px',
            height: '60px',
            borderRadius: '5%',
          }}
        />
        <div>
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
            <a href="/" target="_blank">
              Contact
            </a>
          </span>
        </div>
      </div>
    )
  }
}

export default Bio
