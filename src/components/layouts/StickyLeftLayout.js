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
  constructor(props) {
    super(props)
    this.state = {
      darkTheme: false,
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <React.Fragment>
            <SEO />
            <GlobalStyle theme={theme} />
            <CodeStyle theme={theme} />
            <div className="fixedHeader">
              <div className="nav">
                <div className="nav-header">
                  <div className="nav-title">
                    <Link to="/">{'<Learning in public />'}</Link>
                  </div>
                </div>
                <div className="nav-btn">
                  <label htmlFor="nav-check">
                    <i className="fa fa-bars" />
                  </label>
                </div>
                <input type="checkbox" id="nav-check" />
                <div className="nav-links">
                  <Link to="/">Projects</Link>
                  <Link to="/about">About Me</Link>
                  <Link to="/blog">Blog</Link>
                </div>
              </div>
            </div>

            <section
              className="midSection"
              style={{
                marginTop: '54px',
                background: theme.primary.background,
                color: theme.primary.text.normal,
                transition: 'color 0.5s ease-out, background 0.5s ease-out',
              }}
            >
              <Row>
                <Col
                  xs={12}
                  mdOffset={1}
                  md={3}
                  className="layoutColumn stickySidebar"
                >
                  {this.props.sidebar}
                </Col>

                <Col xs={12} md={7} className="layoutColumn">
                  <Toggle
                    checked={theme.id === 'dark'}
                    onChange={e => {
                      setTheme(e.target.checked ? 'dark' : 'light')
                    }}
                  />
                  {this.props.children}
                </Col>
              </Row>
            </section>

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
