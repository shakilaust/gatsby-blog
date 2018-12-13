import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
const avatar = require('../assets/avatar.jpg')
import Styles from '../utils/styles'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Search extends React.Component {
  render() {
    return (
      <div style={Styles.root}>
        <Header {...this.props.location} />
        <section
          style={{
            paddingTop: '1em',
            paddingBottom: '13em',
          }}
        >
          <Row style={Styles.row}>
            <Col sm={12}>
              <div>
                <h1>
                  Like the mythical unicorn, our serch page does not exist
                  (yet).
                </h1>
              </div>
            </Col>
          </Row>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Search
