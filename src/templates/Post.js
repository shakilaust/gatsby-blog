import React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/layouts/StickyLeftLayout'
import Tag from '../components/Tag/Tag'
import { Row, Col } from 'react-bootstrap'
import PostSummary from '../components/PostSummary/PostSummary'
import ShareWidget from '../components/Share/Share'
import SEO from '../components/seo/SEO'
import Navbar from '../components/layouts/Navbar'

const _ = require('lodash')

const postStyle = {
  padding: '1rem 0',
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { blogTitle, blogSlogan, author } = this.props.data.site.siteMetadata
    const { previousPage, nextPage, slug } = this.props.pageContext

    const pageConfig = {
      url: `${this.props.location.href}`,
      identifier: slug,
      title: post.frontmatter.title,
    }

    return (
      <Layout
        location={this.props.location}
        hideIntro
        sidebar={
          <div>
            <h4>Content</h4>
            <div
              className="postTOC"
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            />
          </div>
        }
      >
        <SEO
          article={true}
          title={`${post.frontmatter.title} - ${author} - ${blogTitle}`}
          desc={`${post.frontmatter.spoiler}`}
          pathname={this.props.location.pathname}
          banner={post.frontmatter.thumbnail}
        />

        <div>
          <div>
            <Link to="/blog">
              <i className="fa fa-angle-left" /> All Posts
            </Link>
          </div>

          <h1
            style={{
              marginBottom: '0',
            }}
          >
            {post.frontmatter.title}
          </h1>
          <div
            style={{
              display: 'block',
              margin: '1em 0 2em',
            }}
          >
            {post.frontmatter.date} in{' '}
            <Link to={`/blog/categories/${post.frontmatter.category}`}>
              {post.frontmatter.category}
            </Link>
            {` • ${post.timeToRead} min read`}
          </div>
        </div>

        <div style={{ fontSize: '1.2em' }}>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <div
          style={{
            margin: '2rem 0',
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

        <div>
          <div style={{ float: 'left' }}>
            <ShareWidget url={pageConfig.url} text={pageConfig.title} />
          </div>
        </div>

        <div style={{ clear: 'both', marginTop: '7rem' }}>
          <hr />

          <Bio />
        </div>

        {nextPage || previousPage ? (
          <div>
            <hr />

            <h4>Read more posts...</h4>
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
          </div>
        ) : null}

        <div />
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
        siteUrl: url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      timeToRead
      excerpt
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
        thumbnail
        spoiler
      }
    }
  }
`
