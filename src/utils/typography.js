import Typography from 'typography'
import theme from 'typography-theme-wordpress-2014'

theme.overrideThemeStyles = () => ({
  a: {
    color: '#4078c0',
    textDecoration: 'none',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  blockquote: {
    background: '#f9f9f9',
    borderLeft: '10px solid #ccc',
    padding: '0.5em 10px',
    fontStyle: 'normal',
    fontSize: '1rem',
  },
  'blockquote p': {
    display: 'inline',
  },
})

delete theme.googleFonts

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
