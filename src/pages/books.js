import React from 'react'
import SEO from '../components/seo/SEO'
import Navbar from '../components/layouts/Navbar'

export default class Resume extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SEO
          article={false}
          title={`Meha Masum's Books`}
          desc={`Mehedi Hasan Masum's Books`}
          pathname={this.props.location.pathname}
        />
        <Navbar location={this.props.location} />
        <div className="indexRoot">
          <div className="container">Still coming along</div>
        </div>
      </React.Fragment>
    )
  }
}
