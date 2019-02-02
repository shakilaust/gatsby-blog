import React from 'react'
import { Link } from 'gatsby'
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
          Software engineer based in Dhaka
          <br />
          <span
            style={{
              fontSize: '80%',
            }}
          >
            <a href="https://twitter.com/mehamasum" target="_blank">
              <i
                className="fa fa-twitter"
                style={{
                  color: '#1da1f2',
                  marginRight: '0.25em',
                }}
              />
              @mehamasum
            </a>
            {' | '}
            <Link
              to="/contact"
              style={{
                marginLeft: '0.25em',
              }}
            >
              <i
                className="fa fa-envelope-o"
                style={{
                  marginRight: '0.25em',
                }}
              />
              Message
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

export default Bio
