const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const BlogListTemplate = path.resolve('./src/templates/BlogListTemplate.js')
const ListCategoryTemplate = path.resolve(
  './src/templates/ListCategoryTemplate.js'
)
const ListTagTemplate = path.resolve('./src/templates/ListTagTemplate.js')

const buildQuery = `
{
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 1000
  ) {
    edges {
      node {
        id
        excerpt
        fields {
          slug
        }
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          category
        }
      }
    }
  }
}
`

const generateListPages = (
  createPage,
  postsPerPage,
  total,
  path,
  template,
  queryKey,
  queryValue
) => {
  const numPages = Math.ceil(total / postsPerPage)
  const hasNext = index =>
    index < numPages - 1 ? `${path}/${index + 2}` : null
  const hasPrev = index =>
    index > 0 ? (index === 1 ? path : `${path}/${index}`) : null

  for (let i = 0; i < numPages; i++) {
    createPage({
      path: i === 0 ? path : `${path}/${i + 1}`,
      component: template,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        current: i + 1,
        total: numPages,
        previous: hasPrev(i),
        next: hasNext(i),
        [queryKey]: queryValue,
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/Post.js')
    resolve(
      graphql(buildQuery).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        let tagCount = {}
        let catCount = {}

        posts.forEach((post, index) => {
          post.node.frontmatter.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1
          })

          const cat = post.node.frontmatter.category
          catCount[cat] = (catCount[cat] || 0) + 1

          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previousPage: previous,
              nextPage: next,
            },
          })
        })

        // Blog list
        generateListPages(
          createPage,
          1,
          posts.length,
          `/blog`,
          BlogListTemplate
        )

        // Tag pages
        Object.keys(tagCount).forEach(tag => {
          generateListPages(
            createPage,
            3,
            tagCount[tag],
            `/blog/tags/${tag}`,
            ListTagTemplate,
            'tag',
            tag
          )
        })

        // Category pages
        Object.keys(catCount).forEach(cat => {
          generateListPages(
            createPage,
            1,
            catCount[cat],
            `/blog/categories/${cat}`,
            ListCategoryTemplate,
            'category',
            cat
          )
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
