module.exports = {
  siteMetadata: {
    title: 'Meha Masum Resume Website',
    titleTemplate: '%s · The Real Hero',
    titleAlt: 'Meha Masum Resume Website',
    shortName: 'Meha Masum Resume',

    blogTitle: "Meha Masum's Tech Blog",
    blogSlogan: 'Learning in public',

    author: 'Meha Masum',
    description: 'A starter blog demonstrating what Gatsby can do.',
    url: 'http://localhost:8000',
    siteUrl: 'http://localhost:8000',
    siteLanguage: 'en',
    logo: `${__dirname}/src/assets/gatsby-icon.png`,
    pathPrefix: '/',
    banner: `${__dirname}/src/assets/gatsby-icon.png`,
    twitter: '@mehamasum',
    fbAppId: '491095678046627',
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
