import React from 'react'
import { Link } from 'gatsby'
import '../styles/index.scss'

export default props => {
  const { links } = props

  return (
    <ul className="unorderedList badge">
      {links.slice(0, links.length - 1).map(link => (
        <li className="inlineListItem">
          <Link to={link.url}>{link.label}</Link>&nbsp;
          <i className="fa fa-angle-right" />
        </li>
      ))}
      <li className="inlineListItem">{links[links.length - 1].label}</li>
    </ul>
  )
}
