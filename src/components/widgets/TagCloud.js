import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { TagCloud } from 'react-tagcloud'

class Topics extends React.Component {
  render() {
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
        <h4>Posts by topics</h4>

        <TagCloud
          minSize={12}
          maxSize={35}
          tags={Object.keys(tagCount).map((key, index) => ({
            value: key,
            count: tagCount[key],
            url: `/blog/tags/${key}`,
            key: index,
          }))}
          renderer={(tag, size, color) => {
            const fontSize = size + 'px'
            const key = tag.key || tag.value
            const style = {
              ...{
                margin: '0px 3px',
                verticalAlign: 'middle',
                display: 'inline-block',
              },
              ...{ color, fontSize },
            }
            return (
              <span key={key} className="tag-cloud-tag" style={style}>
                <Link to={tag.url}>{tag.value}</Link>
              </span>
            )
          }}
        />
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
