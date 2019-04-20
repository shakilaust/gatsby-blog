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
          <Link to="/blog">Read more articles</Link>
        </div>
      </div>
    )
  }
}

export default Bio
