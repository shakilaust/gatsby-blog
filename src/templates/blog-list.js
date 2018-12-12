import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Tag from '../components/Tag'
import Layout from '../components/TwoColumnLayout'
import { Col, Row } from 'react-bootstrap'
import Pagination from '../components/Pagination'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges
    const { previous, next, current, total } = this.props.pageContext

    return (
      <Layout location={this.props.location} full>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {posts.map(post => {
          const { node } = post
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Row>
              <Col xs={9} md={10}>
                <div
                  key={node.fields.slug}
                  style={{
                    marginBottom: '1.5em',
                    background: 'white',
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>
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
                      marginTop: '0.25rem',
                      marginBottom: '0.25rem',
                    }}
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />
                  <div
                    style={{
                      marginTop: '1.5rem',
                    }}
                  >
                    <i
                      className="fa fa-tag fa-flip-horizontal"
                      style={{
                        marginRight: '0.5em',
                        color: 'grey',
                      }}
                    />
                    {node.frontmatter.tags.map(tag => (
                      <Tag tag={tag} key={tag} />
                    ))}
                  </div>
                </div>
              </Col>
              <Col xs={3} md={2}>
                <img
                  src="https://picsum.photos/400/400"
                  alt="Featured Image"
                  style={{
                    width: '100%',
                  }}
                />
              </Col>
            </Row>
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
          current={current}
          total={total}
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
