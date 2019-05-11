console.log(`
Copyright: 2019

███╗   ███╗███████╗██╗  ██╗ █████╗             
████╗ ████║██╔════╝██║  ██║██╔══██╗            
██╔████╔██║█████╗  ███████║███████║            
██║╚██╔╝██║██╔══╝  ██╔══██║██╔══██║            
██║ ╚═╝ ██║███████╗██║  ██║██║  ██║            
╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝            
`)

import './src/assets/css/bootstrap.min.css'
import './src/assets/css/site.css'
import React from 'react'
import Wrapper from './src/components/ThemeContextWrapper'

const App = props => <Wrapper>{props.element}</Wrapper>

export const wrapRootElement = App
