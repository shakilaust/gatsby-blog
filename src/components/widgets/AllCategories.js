import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

class Topics extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    let tagCount = {}
    posts.forEach(post => {
      const tag = post.node.frontmatter.category
      if (tagCount[tag]) tagCount[tag]++
      else tagCount[tag] = 1
    })

    return (
      <div>
        <h4>Posts by category</h4>
        <ul>
          {Object.keys(tagCount).map(key => (
            <li key={key}>
              <Link to={`/blog/categories/${key}`}>{`${key} (${
                tagCount[key]
              })`}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                category
              }
            }
          }
        }
      }
    `}
    render={data => <Topics data={data} {...props} />}
  />
)
