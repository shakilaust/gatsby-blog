import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Tag from '../components/Tag'
import TwoColumnLayout from '../components/TwoColumnLayout'
import { Col, Row } from 'react-bootstrap'
import Pagination from '../components/Pagination'
import PostSummary from '../components/PostSummary'
import '../styles/index.scss'
const avatar = require('../assets/avatar.jpg')

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges
    const { previous, next, current, total } = this.props.pageContext

    return (
      <TwoColumnLayout
        location={this.props.location}
        header={
          <div>
            <div className="portfolio-cover" />
            <div className="layoutRow">
              <Col xs={12}>
                <div className="portfolio-user">
                  <div className="portfolio-user-photo">
                    <img
                      alt="Mehedi Hasan Masum's avatar"
                      className="user-photo"
                      src={avatar}
                    />
                  </div>

                  <div className="portfolio-user-info">
                    <h1
                      className="portfolio-user-name"
                      style={{
                        fontFamily: 'monospace',
                      }}
                    >
                      {'<Learning in public/>'}
                    </h1>
                    <div className="blog-label">
                      <Link to="/">Meha Masum</Link>'s Personal Blog
                    </div>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        }
      >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <div>
          {posts.map(post => {
            return (
              <div
                key={post.node.id}
                style={{
                  marginBottom: '2.5em',
                }}
              >
                <PostSummary post={post.node} />
              </div>
            )
          })}
        </div>

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
      </TwoColumnLayout>
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
