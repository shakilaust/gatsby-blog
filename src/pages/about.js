import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
const avatar = require('../assets/avatar.jpg')
import Styles from '../utils/styles'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    console.log(data)
    const projects = data.allProjectsJson.edges
    return (
      <div>
        <Header {...this.props.location} />
        <section
          style={{
            paddingTop: '1em',
            paddingBottom: '1em',
          }}
        >
          <Row style={Styles.row}>
            <Col sm={12}>I will say a lot hha..</Col>
          </Row>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Index

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        blogTitle
        blogSlogan
      }
    }

    allProjectsJson {
      edges {
        node {
          id
          name
          date
          url
          urlTooltip
          bio
          description
          thumbnail
          tags {
            type
            tag
          }
        }
      }
    }
  }
`
