import React from 'react'
import Tag from '../components/Tag'
import { Link } from 'gatsby'
import '../styles/post.scss'

class Summary extends React.Component {
  render() {
    const { post } = this.props
    const title = post.frontmatter.title || post.fields.slug
    return (
      <div className="card postPreview">
        <div className="card-content flex1">
          <h3 className="postPreviewHeading">
            <Link to={post.fields.slug}>{title}</Link>
          </h3>

          <small>
            {post.frontmatter.date} in{' '}
            <Link to={`/blog/categories/${post.frontmatter.category}`}>
              {post.frontmatter.category}
            </Link>
            {` • ${post.timeToRead} min read`}
          </small>

          <p
            className="postPreviewExcerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />

          <div>
            <i className="fa fa-tag fa-flip-horizontal" />
            {post.frontmatter.tags.map(tag => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </div>
        <div className="postPreviewThumbnail flex0">
          <Link to={post.fields.slug}>
            <div
              className="backgroundCover sizeFull"
              style={{
                backgroundImage: `url(https://picsum.photos/400/400)`,
              }}
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default Summary
