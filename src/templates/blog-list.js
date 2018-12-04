import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Tag from '../components/Tag'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges
    const { previous, next, indx} = this.props.pageContext
    console.log({ previous, next, indx })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        <small>
          {`${data.allMarkdownRemark.totalCount} posts`}
        </small>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          console.log(node.frontmatter.tags)
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
              {node.frontmatter.tags.map(tag=>(
                <Tag tag={tag} key={tag}/>
                ))}
            </div>
          )
        })}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {
              previous &&
              <Link to={previous} rel="prev">
                ← previous
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next} rel="next">
                next →
              </Link>
            }
          </li>
        </ul>
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