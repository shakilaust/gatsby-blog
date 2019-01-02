import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import '../../styles/index.scss'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: '#e6e6e6',
          paddingTop: '4em',
          paddingBottom: '4em',
        }}
      >
        <div className="layoutRow">
          <Col xs={12} md={6} className="footer-left-panel">
            <span
              style={{
                margin: 0,
                fontSize: '0.8em',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Made by <Link to="#"> meha</Link>{' '}
              <i
                className="fa fa-heart"
                style={{
                  color: 'red',
                }}
              />
            </span>
          </Col>
          <Col xs={12} md={6} className="footer-right-panel">
            <a href="https://github.com/mehamasum/gatsby-blog" target="_blank">
              <i
                className="fa fa-code-fork"
                style={{
                  marginRight: '0.5rem',
                }}
              />
              Fork me on Github
            </a>
          </Col>
        </div>
      </footer>
    )
  }
}

export default Footer
