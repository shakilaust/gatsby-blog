import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/TwoColumnLayout'
import Tag from '../components/Tag'
import Pagination from '../components/Pagination'
import { Row, Col } from 'react-bootstrap'
import PostSummary from '../components/PostSummary'
import Disqus from 'disqus-react'
import {
  FacebookProvider,
  Like,
  Share,
  Comments,
  CommentsCount,
} from 'react-facebook'
import ShareWidget from '../components/Share'
import Breadcrumb from '../components/Breadcrumb'

const _ = require('lodash')

const postStyle = {
  padding: '1rem',
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    const { blogTitle, blogSlogan } = this.props.data.site.siteMetadata

    const fbAppId = this.props.data.site.siteMetadata.fbAppId
    const siteDescription = post.excerpt
    const { previousPage, nextPage, slug } = this.props.pageContext

    const disqusShortname = 'mehamasum'
    const disqusConfig = {
      url: window.location.href,
      identifier: slug,
      title: post.frontmatter.title,
    }

    const GITHUB_USERNAME = 'mehamasum'
    const GITHUB_REPO_NAME = 'mehamasum.github.io'

    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/blog/src/pages${slug}index.md`

    return (
      <Layout
        location={this.props.location}
        header={
          <div
            style={{
              color: 'white',
              backgroundColor: '#364657',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2em 0',
            }}
          >
            <Row>
              <Col xs={12} md={8} mdOffset={1}>
                <div>
                  <div>
                    <h1
                      style={{
                        marginBottom: '0.2em',
                        fontFamily: 'monospace',
                      }}
                    >
                      <Link
                        to="/blog"
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                        }}
                      >
                        {'<Learning in public/>'}
                      </Link>
                    </h1>

                    <div
                      style={{
                        padding: '0 0 1.3em 0',
                      }}
                    >
                      Meha Masum's Personal blog
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        }
      >
        <Helmet title={`${post.frontmatter.title} | ${blogTitle}`} />

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
              label: 'post',
            },
          ]}
        />

        <div className="card card-content">
          <h1>{post.frontmatter.title}</h1>
          <div
            style={{
              display: 'block',
            }}
          >
            {post.frontmatter.date} in{' '}
            <Link to={`/blog/categories/${post.frontmatter.category}`}>
              {post.frontmatter.category}
            </Link>
            {` • ${post.timeToRead} min read`}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <div
          style={{
            margin: '2em 0',
          }}
        >
          <i
            className="fa fa-tag fa-flip-horizontal"
            style={{
              marginRight: '0.5em',
              color: 'grey',
            }}
          />
          {post.frontmatter.tags.map(tag => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>

        <div
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <FacebookProvider appId={fbAppId}>
            <Like href={disqusConfig.url} colorScheme="dark" />
          </FacebookProvider>

          <div style={{ margin: '1rem 0' }}>
            <ShareWidget url={disqusConfig.url} text={disqusConfig.title} />
          </div>
        </div>

        <hr />

        <Bio />

        <hr />
        <h4>Read more stories...</h4>

        <Row>
          {nextPage && (
            <Col xs={12} lg={6} style={postStyle}>
              <PostSummary post={nextPage} />
            </Col>
          )}
          {previousPage && (
            <Col xs={12} lg={6} style={postStyle}>
              <PostSummary post={previousPage} />
            </Col>
          )}
        </Row>

        <hr />

        <div>
          <FacebookProvider appId={fbAppId}>
            <Comments href={disqusConfig.url} />
          </FacebookProvider>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        fbAppId
        blogTitle
        blogSlogan
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      timeToRead
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
      }
    }
  }
`
