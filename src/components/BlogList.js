import React from 'react'
import Helmet from 'react-helmet'
import TwoColumnLayout from '../components/TwoColumnLayout'
import Pagination from '../components/Pagination'
import PostSummary from '../components/PostSummary'
import '../styles/index.scss'

class BlogList extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges
    const { previous, next, current, total } = this.props.pageContext

    return (
      <TwoColumnLayout
        location={this.props.location}
        title={
          <h1
            className="portfolio-user-name"
            style={{
              fontFamily: 'monospace',
            }}
          >
            {'<Learning in public/>'}
          </h1>
        }
      >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
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
