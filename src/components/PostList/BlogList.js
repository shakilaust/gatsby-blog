import React from 'react'
import SEO from '../seo/SEO'
import Pagination from '../Pagination/Pagination'
import PostSummary from '../PostSummary/PostSummary'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'gatsby'
import RSS from '../../components/widgets/RSS'
import TagCloud from '../widgets/TagCloud'
import { ThemeContext } from '../ThemeContextWrapper'
import Switch from 'react-switch'
import GlobalStyle from '../styles/Global'
import '../../styles/index.scss'
import AllCategories from '../widgets/AllCategories'
import Footer from '../layouts/Footer'
import Emoji from '../Emoji'

class BlogList extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan, author } = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges
    const { previous, next, current, total } = this.props.pageContext

    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <React.Fragment>
            <SEO
              article={false}
              title={`${blogTitle} - ${blogSlogan}`}
              desc={`${blogSlogan}`}
              pathname={this.props.location.pathname}
            />

            <GlobalStyle theme={theme} />

            <div>
              <div
                className="indexRoot"
                style={{
                  background: theme.primary.background,
                  color: theme.primary.text.normal,
                  transition: 'color 0.5s ease-out, background 0.5s ease-out',
                }}
              >
                <div className="container">
                  <Row>
                    <Col xs={12} md={3} mdOffset={1}>
                      <Switch
                        onColor="#222"
                        checked={theme.id === 'dark'}
                        onChange={e => {
                          setTheme(e ? 'dark' : 'light')
                        }}
                        uncheckedIcon={
                          <Emoji
                            symbol="☀️"
                            style={{ lineHeight: '28px', marginLeft: '7px' }}
                          />
                        }
                        checkedIcon={
                          <Emoji
                            symbol="🌙"
                            style={{ lineHeight: '28px', marginLeft: '7px' }}
                          />
                        }
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      />
                      <h1
                        style={{
                          fontSize: '2.5em',
                        }}
                      >
                        {' '}
                        {this.props.blogroot ? (
                          <div>
                            {'<Learning in'}
                            <br />
                            {'public/>'}
                          </div>
                        ) : (
                          <Link to="/blog" style={{ color: 'inherit' }}>
                            {'<Learning in'}
                            <br />
                            {'public/>'}
                          </Link>
                        )}
                      </h1>
                      <h3>
                        Personal Blog by <Link to="/">Meha Masum</Link>
                      </h3>

                      <hr />

                      <AllCategories />
                      <hr />

                      <TagCloud />
                      <hr />

                      <RSS />
                      <hr />
                    </Col>
                    <Col xs={12} md={7}>
                      <section style={{ margin: '2em 0' }}>
                        {this.props.topContent ? this.props.topContent : null}
                        {this.props.topContent ? <hr /> : null}
                        {posts.map(post => {
                          return (
                            <article
                              key={post.node.id}
                              style={{
                                marginBottom: '1em',
                              }}
                            >
                              <PostSummary post={post.node} />
                            </article>
                          )
                        })}
                        <Pagination
                          previous={{
                            url: previous,
                            label: 'Previous',
                          }}
                          next={{
                            url: next,
                            label: 'Next',
                          }}
                          current={current}
                          total={total}
                        />
                      </section>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <Footer
              style={{
                background: theme.primary.background,
                color: theme.primary.text.normal,
              }}
            />
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default BlogList
