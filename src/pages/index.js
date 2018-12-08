import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Tag from '../components/Tag'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import { rhythm } from '../utils/typography'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    console.log(data)
    const projects = data.allProjectsJson.edges
    return (
      <Layout
        location={this.props.location}
        title={blogSlogan}
        subTitle={blogTitle}
      >
        <Link to={'/blog'}>Blog</Link>
        <div>
          {projects.map(({ node: project }) => {
            return <div key={project.slug}>{project.name}</div>
          })}
        </div>
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
