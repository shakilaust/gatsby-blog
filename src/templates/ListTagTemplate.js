import React from 'react'
import { graphql } from 'gatsby'
import Breadcrumb from '../components/Breadcrumb'
import BlogList from '../components/BlogList'

const ListTagTemplate = props => {
  console.log(props)
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
                label: `tagged with "${tag}"`,
              },
            ]}
          />
          <h1>{tagHeader}</h1>
        </React.Fragment>
      }
    />
  )
}

export default ListTagTemplate

export const pageQuery = graphql`
  query($tag: String, $limit: Int!, $skip: Int!) {
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
