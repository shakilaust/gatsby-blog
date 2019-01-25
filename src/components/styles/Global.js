import React from 'react'

export default class Style extends React.Component {
  render() {
    const { theme } = this.props
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `
          a {
            color: ${theme.primary.text.link};
          }
          a:hover,
          a:focus {
            color: ${theme.secondary.text.link};
            text-decoration: underline;
            text-decoration-color: inherit;
          }
        `,
        }}
      />
    )
  }
}
