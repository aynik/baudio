import React from 'react'
import Toggler from '../containers/Toggler'
import MenuButton from './MenuButton'
import FilterButton from './FilterButton'
import Logo from './Logo'
import Filter from './Filter'

const ToggleMenuButton = Toggler('menu')(MenuButton)
const ToggleFilterButton = Toggler('filter')(FilterButton)

export const Header = (props) => (
  <header>
    <ToggleMenuButton />
    <ToggleFilterButton />
    <Logo />
    <Filter />
  </header>
)

export default Header
