import React from 'react'
import Toggler from '../containers/Toggler'
import Modifiers from './Modifiers'
import IconButton from './IconButton'
import Logo from './Logo'

const TogglerIconButton = Toggler(IconButton)

export const Header = (props) => (
  <header>
    <TogglerIconButton value='funds' />
    <TogglerIconButton value='filter' />
    <TogglerIconButton value='add' />
    <Logo />
    <Modifiers />
  </header>
)

export default Header
