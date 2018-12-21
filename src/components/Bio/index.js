import React from 'react'

import profilePic from '../../assets/images/avatar.jpg'

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
            <a
              className="twitter-follow-button"
              href="https://twitter.com/mehamasum"
              target="_blank"
              data-show-count="false"
            >
              <i
                className="fa fa-twitter"
                style={{
                  color: '#1da1f2',
                  marginRight: '0.25em',
                }}
              />
              @mehamasum
            </a>
          </span>
        </div>
      </div>
    )
  }
}

export default Bio
