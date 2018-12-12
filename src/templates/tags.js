import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import Breadcrumb from '../components/Breadcrumb'

const Tags = props => {
  const { pageContext, data } = props
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  const { previous, next, current, total } = pageContext

  const { blogTitle, blogSlogan } = data.site.siteMetadata

  return (
    <Layout location={props.location}>
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
      <ul
        style={{
          margin: '1rem',
        }}
      >
        {edges.map(({ node }) => {
          const slug = node.fields.slug
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>

      <Pagination
        previous={{
          url: previous,
          label: 'Previous',
        }}
        next={{
          url: next,
          label: 'Next',
        }}
        current={current}
        total={total}
      />
    </Layout>
  )
}

export default Tags

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
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
