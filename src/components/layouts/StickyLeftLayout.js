import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../../styles/index.scss'
import SEO from '../../components/seo/SEO'
import Footer from '../layouts/Footer'
import '../../styles/index.scss'
import './style.scss'
import { Link } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

const Header = styled.div`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
`

const theme = {
  fg: 'white',
  bg: '#364657',
}

const darkTheme = {
  fg: '#364657',
  bg: 'white',
}

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkTheme: false,
    }
  }

  setTheme = e => {
    this.setState({
      darkTheme: !this.state.darkTheme,
    })
  }

  render() {
    return (
      <ThemeProvider theme={this.state.darkTheme ? darkTheme : theme}>
        <React.Fragment>
          <SEO />
          <Header className="fixedHeader">
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
                <button onClick={this.setTheme}>Dark Theme</button>
                <Link to="/">Projects</Link>
                <Link to="/about">About Me</Link>
                <Link to="/blog">Blog</Link>
              </div>
            </div>
          </Header>

          <section className="midSection" style={{ marginTop: '54px' }}>
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
                {this.props.children}
              </Col>
            </Row>
          </section>

          <Footer />
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

export default Layout
