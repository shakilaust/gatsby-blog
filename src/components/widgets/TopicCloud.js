import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

class Topics extends React.Component {
  render() {
    console.log(this.props)
    const posts = this.props.data.allMarkdownRemark.edges

    let tagCount = {}
    posts.forEach(post => {
      post.node.frontmatter.tags.forEach(tag => {
        if (tagCount[tag]) tagCount[tag]++
        else tagCount[tag] = 1
      })
    })

    return (
      <div>
        <h4>Topics</h4>
        <ul>
          {Object.keys(tagCount).map(key => (
            <li key={key}>
              <Link to={`/blog/tags/${key}`}>{`${key} (${
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
              }
            }
          }
        }
      }
    `}
    render={data => <Topics data={data} {...props} />}
  />
)
