import React from 'react'
import { Link } from 'gatsby'
import Styles from '../utils/styles'

const renderButton = (context, dir) => {
  if (!context || !context.url)
    return (
      <button className="btn" disabled>
        {context.label}
      </button>
    )
  return (
    <Link to={context.url} rel="prev">
      {dir === 'left' ? (
        <div>
          <i className={`fa fa-angle-${dir}`} />
          &nbsp;
          {context.label}
        </div>
      ) : (
        <div>
          {context.label}
          &nbsp;
          <i className={`fa fa-angle-${dir}`} />
        </div>
      )}
    </Link>
  )
}

export default props => {
  const { previous, next, current, total } = props
  if (current === 1 && total === 1) return null

  return (
    <ul
      style={{
        ...Styles.unlistedItem,
        textAlign: 'center',
      }}
    >
      <li style={Styles.inlineListItem}>{renderButton(previous, 'left')}</li>
      {current && total && (
        <li style={Styles.inlineListItem}>{`${current}/${total}`}</li>
      )}
      <li style={Styles.inlineListItem}>{renderButton(next, 'right')}</li>
    </ul>
  )
}
