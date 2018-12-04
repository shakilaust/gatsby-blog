const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }, 
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
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

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


        const postsPerPage = 1
        const numPages = Math.ceil(posts.length / postsPerPage)

        const hasNext = (index) => index<numPages-1?
                        (index===0? `/blog/2` : `/blog/${index+1+1}`) : null;
        const hasPrev = (index) => index>0?
                        (index===1? `/blog`: `/blog/${index+1-1}`): null;

        // 0th page -> /blog or /blog/1 
        createPage({
          path: `/blog`,
          component: path.resolve("./src/templates/blog-list.js"),
          context: {
            limit: postsPerPage,
            skip: 0,
            indx: 0,
            previous: hasPrev(0),
            next: hasNext(0),
          },
        })

        createPage({
          path: `/blog/1`,
          component: path.resolve("./src/templates/blog-list.js"),
          context: {
            limit: postsPerPage,
            skip: 0,
            indx: 0,
            previous: hasPrev(0),
            next: hasNext(0),
          },
        })
        
        // page 1 to last
        // blog/2 to blog/n+1
        for(let i = 1; i < numPages; i++) {
          createPage({
            path: `/blog/${i + 1}`,
            component: path.resolve("./src/templates/blog-list.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              indx: i,
              previous: hasPrev(i),
              next: hasNext(i),
            },
          })
        }


        // Tag pages:
        const tagTemplate = path.resolve('./src/templates/tags.js')
        let tags = []
        posts.forEach(post => {
          post.node.frontmatter.tags.forEach(tag => tags.push(tag))
        })
        tags = _.uniq(tags)
        tags.forEach(tag => {
          createPage({
            path: `/blog/tags/${tag}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          })
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
