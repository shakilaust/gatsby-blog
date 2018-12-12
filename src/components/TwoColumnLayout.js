import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import Styles from '../utils/styles'
import SEO from '../components/seo/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
const avatar = require('../assets/avatar.jpg')

class Layout extends React.Component {
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
        <SEO />
        <header>
          {this.props.full ? (
            <div>
              <div className="portfolio-cover" />
              <Row style={Styles.row}>
                <Col xs={12}>
                  <div className="portfolio-user">
                    <div className="portfolio-user-photo">
                      <img
                        alt="Mehedi Hasan Masum's avatar"
                        className="user-photo"
                        src={avatar}
                      />
                    </div>

                    <div className="portfolio-user-info">
                      <h1
                        className="portfolio-user-name"
                        style={{
                          fontFamily: 'monospace',
                        }}
                      >
                        Learning in public
                      </h1>
                      <div className="blog-label">
                        <Link to="/">Meha Masum</Link>'s Personal Blog
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <div
                style={{
                  color: 'white',
                  backgroundColor: '#e5ae2d',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Row>
                  <Col xs={12} md={8} mdOffset={1}>
                    <div>
                      <div>
                        <h1
                          style={{
                            marginBottom: '0.2em',
                            fontFamily: 'monospace',
                          }}
                        >
                          Learning in public
                        </h1>
                        <div
                          style={{
                            padding: '0 0 1.3em 0',
                            color: '#7b5700',
                          }}
                        >
                          Meha Masum's Personal blog
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </header>
        <section
          style={{
            paddingTop: '1em',
            paddingBottom: '1em',
          }}
        >
          <Row>
            <Col xs={12} md={8} mdOffset={1}>
              {this.props.children}
            </Col>
            <Col md={2}>
              <div>
                <label
                  for="search"
                  style={{ display: 'inline-block', marginBottom: '0.5rem' }}
                >
                  Search
                </label>
                <input
                  placeholder="Type and hit enter..."
                  type="text"
                  name="search"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '.375rem .75rem',
                    color: '#495057',
                    backgroundColor: '#fff',
                    backgroundClip: 'padding-box',
                    border: '1px solid #ced4da',
                    borderRadius: '.25rem',
                  }}
                />
              </div>
              <div>
                <h4>All tags</h4>
                <ul>
                  {Object.keys(tagCount).map(key => (
                    <li>
                      <Link to={`/blog/tags/${key}`}>{`${key} (${
                        tagCount[key]
                      })`}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Pinned Post</h4>
              </div>
            </Col>
          </Row>
        </section>
        <Footer />
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
    render={data => <Layout data={data} {...props} />}
  />
)
