import React from 'react'
import { Link, graphql } from 'gatsby'
import SharingIsCaring from '../assets/images/sharing.svg'
import Bio from '../components/Bio'
import Layout from '../components/layouts/StickyLeftLayout'
import Tag from '../components/Tag/Tag'
import { Row, Col } from 'react-bootstrap'
import PostSummary from '../components/PostSummary/PostSummary'
import Disqus from 'disqus-react'
import ShareWidget from '../components/Share/Share'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import SEO from '../components/seo/SEO'

const _ = require('lodash')

const postStyle = {
  padding: '1rem',
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    const { blogTitle, blogSlogan, author } = this.props.data.site.siteMetadata

    const fbAppId = this.props.data.site.siteMetadata.fbAppId
    const { previousPage, nextPage, slug } = this.props.pageContext

    const disqusShortname = 'mehamasum'
    const disqusConfig = {
      url: `${this.props.location.href}`,
      identifier: slug,
      title: post.frontmatter.title,
    }

    const GITHUB_USERNAME = 'mehamasum'
    const GITHUB_REPO_NAME = 'mehamasum.github.io'

    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/blog/src/pages${slug}index.md`

    return (
      <Layout
        location={this.props.location}
        sidebar={
          <div>
            <h4>Content</h4>
            <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
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

        <div>
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

        <div className="card card-content">
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
          <img
            src={SharingIsCaring}
            alt={'Sharing is caring!'}
            style={{
              height: '32px',
              float: 'left',
              marginRight: '0.5em',
            }}
          />
          <div style={{ float: 'left' }}>
            <ShareWidget url={disqusConfig.url} text={disqusConfig.title} />
          </div>
        </div>

        <div style={{ clear: 'both', marginTop: '7rem' }}>
          <hr />

          <Bio />
        </div>

        {nextPage || previousPage ? (
          <div>
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
          </div>
        ) : null}

        <div style={{ margin: '1rem 0' }}>
          <hr />
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>

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
