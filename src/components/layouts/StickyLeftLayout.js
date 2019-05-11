import React from 'react'
import { Row, Col } from 'react-bootstrap'
import SEO from '../../components/seo/SEO'
import Footer from '../layouts/Footer'
import '../../styles/index.scss'
import '../../styles/post.scss'
import { Link } from 'gatsby'
import { ThemeContext } from '../ThemeContextWrapper'
import CodeStyle from '../styles/Code'
import GlobalStyle from '../styles/Global'
import Switch from 'react-switch'
import Emoji from '../../components/Emoji'
import Navbar from '../../components/layouts/Navbar'

class Layout extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <React.Fragment>
            <SEO />
            <GlobalStyle theme={theme} />
            <CodeStyle theme={theme} />
            <Navbar location={this.props.location} />

            <div
              className="indexRoot"
              style={{
                background: theme.primary.background,
                color: theme.primary.text.normal,
                transition: 'color 0.5s ease-out, background 0.5s ease-out',
              }}
            >
              <div>
                <Row>
                  <Col xs={12} md={3} mdOffset={1} className="stickySidebar">
                    <div style={{ display: 'none' }}>
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
                    </div>
                    {this.props.hideIntro ? null : (
                      <React.Fragment>
                        <h1
                          style={{
                            fontSize: '2.5em',
                          }}
                        >
                          <Link to="/blog" style={{ color: 'inherit' }}>
                            {'<Learning in'}
                            <br />
                            {'public/>'}
                          </Link>
                        </h1>
                        <h3>
                          Personal Blog by <Link to="/">Meha Masum</Link>
                        </h3>

                        <hr />
                      </React.Fragment>
                    )}

                    {this.props.sidebar}
                  </Col>

                  <Col xs={12} md={7}>
                    {this.props.children}
                  </Col>
                </Row>
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

export default Layout
