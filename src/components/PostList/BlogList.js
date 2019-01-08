import React from 'react'
import SEO from '../seo/SEO'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import Pagination from '../Pagination/Pagination'
import PostSummary from '../PostSummary/PostSummary'
import '../../styles/index.scss'

class BlogList extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan, author } = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges
    const { previous, next, current, total } = this.props.pageContext

    return (
      <TwoColumnLayout
        location={this.props.location}
        title={
          <div
            style={{
              fontFamily: 'monospace',
            }}
          >
            {'<Learning in public/>'}
          </div>
        }
      >
        <SEO
          article={false}
          title={`${blogTitle} - ${blogSlogan}`}
          desc={`${blogSlogan}`}
          pathname={this.props.location.pathname}
        />

        <div>{this.props.topContent ? this.props.topContent : null}</div>

        <div>
          {posts.map(post => {
            return (
              <div
                key={post.node.id}
                style={{
                  marginBottom: '1em',
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

export default BlogList
