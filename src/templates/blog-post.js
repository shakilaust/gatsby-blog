import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import Tag from '../components/Tag'
import Pagination from '../components/Pagination'

import Disqus from 'disqus-react'
import {
  FacebookProvider,
  Like,
  Share,
  Comments,
  CommentsCount,
} from 'react-facebook'

const _ = require('lodash')

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const blogTitle = this.props.data.site.siteMetadata.blogTitle
    const fbAppId = this.props.data.site.siteMetadata.fbAppId
    const siteDescription = post.excerpt
    const { previous, next, slug } = this.props.pageContext

    const disqusShortname = 'mehamasum'
    const disqusConfig = {
      url: `http://localhost:8000${slug}`,
      identifier: slug,
      title: post.frontmatter.title,
    }

    return (
      <Layout location={this.props.location} title={blogTitle}>
        <Helmet title={`${post.frontmatter.title} | ${blogTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
          }}
        >
          {post.frontmatter.date}
          {` • ${post.timeToRead} min read`}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.frontmatter.tags.map(tag => (
          <Tag tag={tag} key={tag} />
        ))}

        <div
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        >
          <FacebookProvider appId={fbAppId}>
            <Like href={disqusConfig.url} colorScheme="dark" share />
          </FacebookProvider>
        </div>

        <hr />

        <Bio />

        <Pagination
          next={
            next && {
              url: next.fields.slug,
              label: next.frontmatter.title,
            }
          }
          previous={
            previous && {
              url: previous.fields.slug,
              label: previous.frontmatter.title,
            }
          }
        />

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
      }
    }
  }
`
