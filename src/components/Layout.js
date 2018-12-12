import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import Styles from '../utils/styles'
import SEO from '../components/seo/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Layout extends React.Component {
  render() {
    const { location, title, subTitle, children } = this.props
    const blogRootPath = `${__PATH_PREFIX__}/blog`

    return (
      <div>
        <SEO />
        <Header {...location} />
        <section
          style={{
            paddingTop: '1em',
            paddingBottom: '1em',
          }}
        >
          <Row style={Styles.row}>
            <Col sm={12}>{children}</Col>
          </Row>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Layout
