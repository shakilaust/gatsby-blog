import React from 'react'
import { Row, Col } from 'react-bootstrap'
import SEO from '../../components/seo/SEO'
import Footer from '../layouts/Footer'
import '../../styles/index.scss'
import '../../styles/post.scss'
import { Link } from 'gatsby'
import { ThemeContext } from '../ThemeContextWrapper'
import Toggle from '../Toogle'
import CodeStyle from '../styles/Code'
import GlobalStyle from '../styles/Global'

class Layout extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <React.Fragment>
            <SEO />
            <GlobalStyle theme={theme} />
            <CodeStyle theme={theme} />

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
                  <Col xs={12} md={3} mdOffset={1} className="stickySidebar">
                    <Toggle
                      checked={theme.id === 'dark'}
                      onChange={e => {
                        setTheme(e.target.checked ? 'dark' : 'light')
                      }}
                    />
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
