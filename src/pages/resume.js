import React from 'react'
import SEO from '../components/seo/SEO'
import { StaticQuery, graphql } from 'gatsby'

export default class Resume extends React.Component {
  colorful(url) {
    if (url.indexOf('?color=true') != -1) return true
    return false
  }
  render() {
    const { location } = this.props
    let pdfUrl =
      'https://mehamasum.github.io/docs/Resume_Mehedi-Hasan-Masum_CSEDU'
    if (this.colorful(location.search)) pdfUrl += '_'
    pdfUrl += '.pdf'

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
