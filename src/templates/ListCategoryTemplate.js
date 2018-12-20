import React from 'react'
import { graphql } from 'gatsby'
import BlogList from '../components/BlogList'
import Breadcrumb from '../components/Breadcrumb'

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
          <Breadcrumb
            links={[
              {
                url: '/',
                label: 'root',
              },
              {
                url: '/blog',
                label: 'blog',
              },
              {
                url: '#',
                label: `all posts in "${category}"`,
              },
            ]}
          />
          <h1>{heading}</h1>
        </React.Fragment>
      }
    />
  )
}

export default ListCategoryTemplate

export const pageQuery = graphql`
  query($category: String, $limit: Int!, $skip: Int!) {
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
            thumbnail
            spoiler
          }
        }
      }
    }
  }
`
