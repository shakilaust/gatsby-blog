import React from 'react'
import Tag from '../components/Tag'
import { Col, Row } from 'react-bootstrap'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

class Summary extends React.Component {
  render() {
    const { post } = this.props
    const title = post.frontmatter.title || post.fields.slug
    return (
      <div className="extremePostPreview">
        <div
          className="u-flex1"
          style={{
            marginRight: '16px',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.1rem' }}>
            <Link style={{ boxShadow: 'none' }} to={post.fields.slug}>
              {title}
            </Link>
          </h3>
          <small>
            {post.frontmatter.date}
            {` • ${post.timeToRead} min read`}
          </small>
          <p
            style={{
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            }}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div
            style={{
              marginTop: '0.5rem',
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
        </div>
        <div className="extremePostPreview-image u-flex0">
          <div
            className="u-backgroundCover u-sizeFull"
            style={{
              backgroundImage: `url(https://picsum.photos/400/400)`,
            }}
          />
        </div>
      </div>
    )
  }
}

export default Summary
