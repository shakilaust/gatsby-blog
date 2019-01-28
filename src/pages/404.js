import React from 'react'
import Layout from '../components/layouts/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>Not Found</h1>
        <pre
          style={{ lineHeight: 1.25, whiteSpace: 'pre' }}
          dangerouslySetInnerHTML={{
            __html: String.raw`
              \          SORRY            /
               \                         /
                \    This page does     /
                  ]   not exist yet.    [    ,'|
                  ]                     [   /  |
                  ]___               ___[ ,'   |
                  ]  ]\             /[  [ |:   |
                  ]  ] \           / [  [ |:   |
                  ]  ]  ]         [  [  [ |:   |
                  ]  ]  ]__     __[  [  [ |:   |
                  ]  ]  ] ]\ _ /[ [  [  [ |:   |
                  ]  ]  ] ] (#) [ [  [  [ :===='
                  ]  ]  ]_].nHn.[_[  [  [
                  ]  ]  ]  HHHHH. [  [  [
                  ]  ] /   'HH("N  \ [  [
                  ]__]/     HHH  "  \[__[
                  ]         NNN         [
                  ]         N/"         [
                  ]         N H         [
                /          N            \
               /           q,            \
              /                           \
        `,
          }}
        />
      </Layout>
    )
  }
}

export default NotFoundPage
