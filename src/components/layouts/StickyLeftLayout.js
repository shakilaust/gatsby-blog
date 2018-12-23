import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../../styles/index.scss'
import SEO from '../../components/seo/SEO'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import ContactForm from '../../components/widgets/ContactForm'
import AboutBlog from '../../components/widgets/AboutBlog'
import TagCloud from '../widgets/TagCloud'
import SocialLinks from '../widgets/SocialLinks'
import '../../styles/index.scss'
import './style.scss'
import AllCategories from '../widgets/AllCategories'
import { Link } from 'gatsby'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SEO />
        <header className="fixedHeader">
          <div
            style={{
              color: 'white',
              backgroundColor: '#364657',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Row>
              <Col xs={12} md={10} mdOffset={1}>
                <div>
                  <div className="title">
                    <Link
                      to="/blog"
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      {'<Learning in public/>'}
                    </Link>
                  </div>

                  <div className="links">
                    <Link
                      to="/"
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      <i className="fa fa-home" />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </header>

        <section className="midSection" style={{ marginTop: '54px' }}>
          <Row>
            <Col
              xs={12}
              mdOffset={1}
              md={3}
              className="layoutColumn stickySidebar"
            >
              {this.props.sidebar}
            </Col>

            <Col xs={12} md={7} className="layoutColumn">
              {this.props.children}
            </Col>
          </Row>
        </section>

        <Footer />
      </div>
    )
  }
}

export default Layout
