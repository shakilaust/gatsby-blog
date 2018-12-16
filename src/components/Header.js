import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
const avatar = require('../assets/avatar.jpg')
import '../styles/index.scss'
import classnames from 'classnames'

class Header extends React.Component {
  getClassNames(tab) {
    const path = this.props.pathname
    let classes = ['label']
    if (tab === 'project') {
      classes.push('label-project')
      if (path === '/') classes.push('label-active')
    } else if (tab === 'about') {
      classes.push('label-about')
      const pattern = new RegExp(`^\/about(\/)?$`)
      if (pattern.test(path)) classes.push('label-active')
    } else if (tab === 'blog') {
      classes.push('label-blog')
      const pattern = new RegExp(`^\/blog(\/)?.*$`)
      if (pattern.test(path)) classes.push('label-active')
    }
    return classnames(classes)
  }

  render() {
    return (
      <header>
        <div className="portfolio-cover" />
        <div className="layoutRow">
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
                {this.props.title || (
                  <h1 className="portfolio-user-name">
                    Mehedi Hasan Masum <small>(@mehamasum)</small>
                  </h1>
                )}
                <nav>
                  <Link to="/">
                    <div className={this.getClassNames('project')}>
                      Projects
                    </div>
                  </Link>

                  <Link to="/about">
                    <div className={this.getClassNames('about')}>About</div>
                  </Link>

                  <Link to="/blog">
                    <div className={this.getClassNames('blog')}>Blog</div>
                  </Link>
                </nav>
              </div>
            </div>
          </Col>
        </div>
      </header>
    )
  }
}

export default Header
