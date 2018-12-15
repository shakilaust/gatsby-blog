import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
const avatar = require('../assets/avatar.jpg')
import '../styles/index.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import ContactForm from '../components/widgets/ContactForm'

class Index extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout location={this.props.location}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus
          ex, tempus in vulputate sit amet, placerat eu lorem. Pellentesque
          vehicula venenatis fringilla. Praesent mollis nisi justo, in semper
          ipsum feugiat id. In volutpat massa ut rhoncus maximus. Proin id elit
          sit amet lacus fermentum pellentesque ut viverra arcu. Nulla blandit
          rutrum nisi vel dictum. Ut rutrum nunc eget mattis fringilla. Mauris
          scelerisque condimentum urna, eget hendrerit felis vehicula non. Proin
          aliquet et arcu ac scelerisque. Phasellus luctus interdum mauris eget
          malesuada. Praesent tristique, diam sit amet accumsan cursus, purus
          sem pulvinar lectus, in feugiat justo urna id neque. Aenean leo justo,
          sagittis a est vitae, tempor condimentum sapien. In sit amet mi
          vulputate, euismod tellus a, vestibulum justo. Cras feugiat, nisl ac
          rutrum pretium, ex velit tincidunt erat, eu vulputate nibh metus
          suscipit est. Phasellus tincidunt lectus quis eros gravida faucibus.
          Praesent erat odio, molestie ut aliquam ut, hendrerit quis risus.
          Vivamus convallis tincidunt sodales. Quisque scelerisque, mauris id
          ultrices aliquam, felis eros vestibulum dui, in congue augue nisi vel
          tellus. Sed nisi quam, efficitur a dictum in, eleifend id ex. Quisque
          a lectus sed metus dignissim cursus. Proin euismod enim nibh, ac
          varius dolor sagittis at. Aliquam vitae mollis urna. Aliquam mauris
          metus, mollis id nisl at, dictum varius enim. Duis placerat, diam
          sagittis lacinia tincidunt, neque odio pulvinar justo, sed semper sem
          libero et sem. Quisque odio lorem, vehicula suscipit mi et, aliquet
          bibendum felis. Etiam id maximus lectus. In felis mauris, dapibus
          condimentum tempor non, aliquet sit amet mi. Etiam fermentum in velit
          eget rhoncus. Morbi non auctor libero. Donec auctor tortor at odio
          accumsan iaculis. Nam tellus nulla, posuere quis nulla at, malesuada
          lacinia dolor. Nulla hendrerit volutpat lacus, sit amet pretium purus
          efficitur laoreet. Maecenas libero nulla, interdum sit amet mattis id,
          aliquam vel tellus. Nulla ultrices ullamcorper ante nec fermentum.
          Quisque tincidunt nunc pharetra nunc egestas, a porttitor dui
          vestibulum. Donec auctor egestas turpis at facilisis. Nullam ante
          arcu, malesuada vel congue ac, feugiat at ligula. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Sed libero enim,
          euismod vulputate nunc quis, ultrices congue risus. Nam at commodo
          purus. Mauris ac sodales odio. Integer metus purus, imperdiet ut mi
          ut, posuere tincidunt lorem. Sed nibh orci, vestibulum aliquam odio
          ac, fringilla maximus elit. Nam in turpis id lacus porttitor vehicula.
          Integer posuere eget ligula a aliquet. Nulla feugiat volutpat urna,
          nec lacinia ex gravida quis. Integer id convallis quam. Praesent vitae
          lacus erat. Etiam feugiat viverra tellus quis aliquam. Aenean maximus
          elementum purus, at venenatis eros facilisis at. Nunc auctor lacinia
          congue. Generated 5 paragraphs, 430 words, 2861 bytes of Lorem Ipsum
        </p>
        <ContactForm />
      </Layout>
    )
  }
}

export default Index

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        blogTitle
        blogSlogan
      }
    }
  }
`
