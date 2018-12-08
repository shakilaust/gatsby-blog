const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
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
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        const postsPerPage = 2
        const numPages = Math.ceil(posts.length / postsPerPage)

        const hasNext = index =>
          index < numPages - 1 ? `/blog/${index + 2}` : null
        const hasPrev = index =>
          index > 0 ? (index === 1 ? `/blog` : `/blog/${index}`) : null

        // 0th page -> /blog
        createPage({
          path: `/blog`,
          component: path.resolve('./src/templates/blog-list.js'),
          context: {
            limit: postsPerPage,
            skip: 0,
            previous: hasPrev(0),
            next: hasNext(0),
          },
        })

        // page 0 to last
        // blog/1 to blog/n+1
        for (let i = 0; i < numPages; i++) {
          createPage({
            path: `/blog/${i + 1}`,
            component: path.resolve('./src/templates/blog-list.js'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              previous: hasPrev(i),
              next: hasNext(i),
            },
          })
        }

        // Tag pages:
        const tagTemplate = path.resolve('./src/templates/tags.js')
        let tagCount = {}
        posts.forEach(post => {
          post.node.frontmatter.tags.forEach(tag => {
            if (tagCount[tag]) tagCount[tag]++
            else tagCount[tag] = 1
          })
        })
        Object.keys(tagCount).forEach(tag => {
          const postsPerPage = 10
          const numPages = Math.ceil(tagCount[tag] / postsPerPage)
          const hasNext = index =>
            index < numPages - 1 ? `/blog/tags/${tag}/${index + 2}` : null
          const hasPrev = index =>
            index > 0
              ? index === 1
                ? `/blog/tags/${tag}`
                : `/blog/tags/${tag}/${index}`
              : null

          createPage({
            path: `/blog/tags/${tag}`,
            component: tagTemplate,
            context: {
              tag,
              limit: postsPerPage,
              skip: 0,
              previous: hasPrev(0),
              next: hasNext(0),
            },
          })

          for (let i = 0; i < numPages; i++) {
            createPage({
              path: `/blog/tags/${tag}/${i + 1}`,
              component: tagTemplate,
              context: {
                tag,
                limit: postsPerPage,
                skip: i * postsPerPage,
                previous: hasPrev(i),
                next: hasNext(i),
              },
            })
          }
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
