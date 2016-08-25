import React from 'react'
import Toggler from '../containers/Toggler'
import Filter from '../containers/Filter'
import IconButton from './IconButton'
import Logo from './Logo'

const TogglerIconButton = Toggler(IconButton)

export const Header = (props) => (
  <header>
    <TogglerIconButton value='menu' />
    <TogglerIconButton value='filter' />
    <Logo />
    <Filter />
  </header>
)

export default Header
