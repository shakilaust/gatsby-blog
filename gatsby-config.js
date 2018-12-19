require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const SITE_CONFIG = {
  title: 'Meha Masum',
  shortName: 'Meha Masum',
}

module.exports = {
  siteMetadata: {
    title: SITE_CONFIG.title,
    titleTemplate: '%s · The Real Hero',
    titleAlt: SITE_CONFIG.title,
    shortName: SITE_CONFIG.shortName,

    blogTitle: "Meha Masum's Personal Blog",
    blogSlogan: 'Learning in public',

    author: 'Meha Masum',
    description: 'A starter blog demonstrating what Gatsby can do.',
    url: process.env.SITE_URL,
    siteUrl: process.env.SITE_URL,
    siteLanguage: 'en',
    logo: `${__dirname}/src/assets/favicon.png`,
    pathPrefix: '/',
    banner: `${__dirname}/src/assets/favicon.png`,
    twitter: '@mehamasum',
    fbAppId: process.env.FB_APP_ID,
  },
  pathPrefix: '/',
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
          `gatsby-remark-autolink-headers`,
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
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SITE_CONFIG.title,
        short_name: SITE_CONFIG.shortName,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`,
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
    `gatsby-plugin-sass`,
  ],
}
