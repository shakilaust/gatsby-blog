import React from 'react'
import { Link } from 'gatsby'
import Styles from '../utils/styles'

export default props => {
  const { links } = props

  return (
    <ul
      style={{
        ...Styles.unlistedItem,
        fontFamily: 'monospace',
      }}
    >
      {links.slice(0, links.length - 1).map(link => (
        <li style={Styles.inlineListItem}>
          <Link to={link.url}>{link.label}</Link>&nbsp;
          <i className="fa fa-angle-right" />
        </li>
      ))}
      <li style={Styles.inlineListItem}>{links[links.length - 1].label}</li>
    </ul>
  )
}
