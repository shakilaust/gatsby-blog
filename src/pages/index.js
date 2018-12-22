import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo/SEO'
import Layout from '../components/layouts/TwoColumnLayout'
import Projects from '../components/Projects/Projects'
import '../styles/index.scss'

class Index extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout location={this.props.location}>
        <SEO
          article={false}
          title={`Meha Masum's software portfolio`}
          desc={`Mehedi Hasan Masum's profile, software portfolio and personal blog`}
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
