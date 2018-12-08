import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Tag from '../components/Tag'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={blogTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        {posts.map(post => {
          const { node } = post
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 8),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {` • ${node.timeToRead} min read`}
              </small>
              <p
                style={{
                  marginTop: rhythm(1 / 4),
                }}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />
              {node.frontmatter.tags.map(tag => (
                <Tag tag={tag} key={tag} />
              ))}
            </div>
          )
        })}
        <Pagination
          previous={{
            url: previous,
            label: 'Previous',
          }}
          next={{
            url: next,
            label: 'Next',
          }}
        />
      </Layout>
    )
  }
}

export default BlogIndex

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        blogTitle
        blogSlogan
      }
    }

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
