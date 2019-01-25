import React from 'react'

import { themes } from './theme'

export const ThemeContext = React.createContext({
  theme: themes.light,
  setTheme: newTheme => {
    console.log(newTheme)
  },
})

class Wrapper extends React.Component {
  handleDarkQueryChange = e => {
    if (this.preferredTheme) {
      return
    }
    this.setTheme(e.matches ? 'dark' : 'light')
  }

  setTheme = newTheme => {
    console.log('setTheme called with', newTheme)
    this.preferredTheme = newTheme
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {
      // Ignore.
    }
    this.setState({ theme: themes[newTheme] })
  }

  constructor(props) {
    super(props)
    try {
      this.preferredTheme = localStorage.getItem('theme')
      console.log(this.preferredTheme)
    } catch (err) {
      // Ignore.
    }
    this.darkQuery =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : { matches: false }
    this.state = {
      theme:
        themes[
          this.preferredTheme || (this.darkQuery.matches ? 'dark' : 'light')
        ],
      setTheme: this.setTheme,
    }
    console.log(this.state)
  }

  componentDidMount() {
    this.darkQuery.addListener(this.handleDarkQueryChange)
  }

  componentWillUnmount() {
    this.darkQuery.addListener(this.handleDarkQueryChange)
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ({ element }) => <Wrapper>{element}</Wrapper>
