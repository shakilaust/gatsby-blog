import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import '../styles/index.scss'
import SEO from '../components/seo/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/widgets/ContactForm'
import AboutBlog from '../components/widgets/AboutBlog'
import TagCloud from './widgets/TagCloud'
import SocialLinks from './widgets/SocialLinks'
import '../styles/index.scss'
import AllCategories from './widgets/AllCategories'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SEO />
        {this.props.header ? (
          <header>{this.props.header}</header>
        ) : (
          <Header
            title={this.props.title}
            pathname={this.props.location.pathname}
          />
        )}
        <section className="midSection">
          <Row>
            <Col xs={12} md={7} mdOffset={1} className="layoutColumn">
              {this.props.children}
            </Col>
            <Col xs={12} md={3} className="layoutColumn">
              <AboutBlog />
              <hr />

              <AllCategories />
              <hr />

              <TagCloud />
              <hr />

              <SocialLinks />
              <hr />

              <ContactForm />
            </Col>
          </Row>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Layout
