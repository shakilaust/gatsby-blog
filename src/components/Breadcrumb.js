import React from 'react'
import { Link } from 'gatsby'
import '../styles/index.scss'

export default props => {
  const { links } = props

  return (
    <ul
      className="unorderedList"
      style={{
        fontFamily: 'monospace',
        padding: '0.5rem',
        color: 'rgba(0,0,0,.68)',
        background: 'rgba(0,0,0,.05)',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
        borderRadius: '.25em',
        display: 'inline',
        padding: '.2em .6em .3em',
      }}
    >
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
