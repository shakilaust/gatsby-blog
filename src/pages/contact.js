import React from 'react'
import SEO from '../components/seo/SEO'
import Layout from '../components/layouts/TwoColumnLayout'
import '../styles/index.scss'

class Contact extends React.Component {
    render() {
        const {data} = this.props
        return (
            <Layout location={this.props.location}>
                <SEO
                    article={false}
                    pathname={this.props.location.pathname}
                />
                <form
                    className="form-wrapper"
                    action="https://formspree.io/mehamasum@gmail.com"
                    method="POST"
                >
                    <h4 style={{marginTop: 0}}>Contact me</h4>
                    <input type="email" name="email" id="email" placeholder="Your email"/>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        placeholder="Your message..."
                    />
                    <input type="submit" className="submit" value="Leave a message"/>
                </form>
            </Layout>
        )
    }
}

export default Contact

