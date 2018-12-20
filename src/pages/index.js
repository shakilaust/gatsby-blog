import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo/SEO'
import Layout from '../components/TwoColumnLayout'
import Projects from '../components/Projects'

import '../assets/bootstrap.min.css'
import '../assets/site.css'
import '../styles/index.scss'

class Index extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout location={this.props.location}>
        <SEO
          article={false}
          title={`Meha Masum's software portfoilo`}
          desc={`Mehedi Hasan Masum's profile, software portfoilo and personal blog`}
          pathname={this.props.location.pathname}
        />
        <Projects data={data} hash={this.props.location.hash} />
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
          hash
          name
          kid
          year
          url {
            title
            url
          }
          description
          thumbnail
          winner {
            platform
            title
          }
          tags
        }
      }
    }
  }
`
