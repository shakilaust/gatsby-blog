import React from 'react'

export default class Style extends React.Component {
  render() {
    const { theme } = this.props
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `
          a {
            color: ${theme.primary.link.normal};
          }
          a:hover,
          a:focus {
            color: ${theme.secondary.link.hover};
            text-decoration: underline;
            text-decoration-color: inherit;
          }

          .badge {
            color: ${theme.badge.color};
            background: ${theme.badge.background};
          }
        `,
        }}
      />
    )
  }
}
