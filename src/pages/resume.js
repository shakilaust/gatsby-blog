import React from 'react'
import SEO from '../components/seo/SEO'
import { StaticQuery, graphql } from 'gatsby'
import Navbar from '../components/layouts/Navbar'

export default class Resume extends React.Component {
  render() {
    const { location } = this.props
    let pdfUrl =
      'https://mehamasum.github.io/docs/Resume_Mehedi-Hasan-Masum_CSEDU.pdf'

    return (
      <StaticQuery
        query={query}
        render={props => {
          const {
            site: {
              siteMetadata: { siteUrl },
            },
          } = props

          return (
            <React.Fragment>
              <SEO
                article={false}
                title={`Meha Masum's Resume`}
                desc={`Mehedi Hasan Masum's Resume | PDF Download`}
                pathname={this.props.location.pathname}
              />

              <Navbar location={this.props.location} />

              <iframe
                src={`https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`}
                frameBorder="0"
                style={{
                  position: 'absolute',
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%',
                }}
              />
            </React.Fragment>
          )
        }}
      />
    )
  }
}

const query = graphql`
  query Resume {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
