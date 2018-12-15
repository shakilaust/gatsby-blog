import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
import '../styles/index.scss'
import Layout from '../components/Layout'
import Projects from '../components/Projects'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    console.log(data)
    return (
      <Layout location={this.props.location}>
        <Projects data={data} />
      </Layout>
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
          kid
          year
          url {
            title
            url
          }
          description
          thumbnail
          winner
          tags
        }
      }
    }
  }
`
