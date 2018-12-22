import React from 'react'
import '../../styles/index.scss'
import SEO from '../../components/seo/SEO'
import Header from './Header'
import Footer from './Footer'
import Section from './Section'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SEO />
        <Header {...this.props.location} />
        <Section>{this.props.children}</Section>
        <Footer />
      </div>
    )
  }
}

export default Layout
