import React from 'react'
import { graphql } from 'gatsby'
import BlogList from '../components/PostList/BlogList'

const ListCategoryTemplate = props => {
  const { category } = props.pageContext
  const { totalCount } = props.data.allMarkdownRemark
  const heading = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } in "${category}"`

  return (
    <BlogList
      data={props.data}
      pageContext={props.pageContext}
      location={props.location}
      topContent={
        <React.Fragment>
          <h2>{heading}</h2>
        </React.Fragment>
      }
    />
  )
}

export default ListCategoryTemplate

export const pageQuery = graphql`
  query($category: String) {
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
      filter: { frontmatter: { category: { eq: $category } } }
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
