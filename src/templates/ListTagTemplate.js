import React from 'react'
import { graphql } from 'gatsby'
import BlogList from '../components/PostList/BlogList'

const ListTagTemplate = props => {
  const { tag } = props.pageContext
  const { totalCount } = props.data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <BlogList
      data={props.data}
      pageContext={props.pageContext}
      location={props.location}
      topContent={
        <React.Fragment>
          <h2>{tagHeader}</h2>
        </React.Fragment>
      }
    />
  )
}

export default ListTagTemplate

export const pageQuery = graphql`
  query($tag: String) {
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            thumbnail
            spoiler
          }
        }
      }
    }
  }
`
