import React from 'react'
import { graphql } from 'gatsby'
import '../styles/index.scss'
import BlogList from '../components/PostList/BlogList'

class BlogListTemplate extends React.Component {
  render() {
    return (
      <BlogList
        blogroot
        data={this.props.data}
        pageContext={this.props.pageContext}
        location={this.props.location}
        topContent={
          <React.Fragment>
            <h2>All posts</h2>
          </React.Fragment>
        }
      />
    )
  }
}

export default BlogListTemplate

export const blogListQuery = graphql`
  query blogListQuery {
    site {
      siteMetadata {
        title
        description
        blogTitle
        blogSlogan
      }
    }

    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
            category
            thumbnail
            spoiler
          }
        }
      }
    }
  }
`
