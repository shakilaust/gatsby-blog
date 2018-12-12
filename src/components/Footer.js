import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
import Styles from '../utils/styles'

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
        <Row style={Styles.row}>
          <Col xs={12} md={6} className="footer-left-panel">
            <span
              style={{
                margin: 0,
              }}
            >
              Made by <Link to="#"> meha</Link>{' '}
              <i
                className="fa fa-heart"
                style={{
                  color: 'red',
                }}
              />
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a
                href="https://github.com/mehamasum/mehamasum.github.io"
                target="_blank"
              >
                Open Source
                <i
                  className="fa fa-code-fork"
                  style={{
                    marginLeft: '0.5rem',
                  }}
                />
              </a>
            </span>
          </Col>
          <Col xs={12} md={6} className="footer-right-panel">
            <ul style={Styles.unlistedItem}>
              <li style={Styles.inlineListItem}>Contacts</li>
              <li style={Styles.inlineListItem}>
                <a href="#">
                  <i
                    className="fa fa-github"
                    style={{
                      marginRight: '0.5rem',
                    }}
                  />
                  Github
                </a>
              </li>
              <li style={Styles.inlineListItem}>
                <a href="#">
                  <i
                    className="fa fa-twitter"
                    style={{
                      marginRight: '0.5rem',
                    }}
                  />
                  Twitter
                </a>
              </li>
              <li style={Styles.inlineListItem}>
                <a href="#">
                  <i
                    className="fa fa-linkedin"
                    style={{
                      marginRight: '0.5rem',
                    }}
                  />
                  LinkedIn
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    )
  }
}

export default Footer
