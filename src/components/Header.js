import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
const avatar = require('../assets/avatar.jpg')
import Styles from '../utils/styles'

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="portfolio-cover" />
        <Row style={Styles.row}>
          <Col xs={12}>
            <div className="portfolio-user">
              <div className="portfolio-user-photo">
                <img
                  alt="Mehedi Hasan Masum's avatar"
                  className="user-photo"
                  src={avatar}
                />
              </div>

              <div className="portfolio-user-info">
                <h1 className="portfolio-user-name">
                  Mehedi Hasan Masum <small>(@mehamasum)</small>
                </h1>
                <nav>
                  <Link to="/">
                    <div className="label label-active label-project">
                      Projects
                    </div>
                  </Link>

                  <Link to="/about">
                    <div className="label label-about">About</div>
                  </Link>

                  <Link to="/blog">
                    <div className="label label-blog">Blog</div>
                  </Link>
                </nav>
              </div>
            </div>
          </Col>
        </Row>
      </header>
    )
  }
}

export default Header
