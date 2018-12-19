import React from 'react'
import { graphql } from 'gatsby'
import '../styles/index.scss'
import BlogList from '../components/BlogList'

class BlogListTemplate extends React.Component {
  render() {
    return (
      <BlogList
        data={this.props.data}
        pageContext={this.props.pageContext}
        location={this.props.location}
      />
    )
  }
}

export default BlogListTemplate

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
            category
          }
        }
      }
    }
  }
`
