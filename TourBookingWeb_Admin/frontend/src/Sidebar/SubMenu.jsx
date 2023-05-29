import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import './subMenu.css';


const SubMenu = ({item}) => {
    const [subnav, setSubnav] = useState(false)

    const [openMenu, setOpenMenu] = useState(false)

    const showSubnav = () => {
      setSubnav(!subnav)
      setOpenMenu(!openMenu)
    }

  return (
    <>
      <NavLink className={`sidebar_link ${(item.subNav && subnav) ? '' : ((item.subNav && !subnav) ? 'inactive' : '')}`} to={item.path} onClick={item.subNav ? showSubnav : null}>
        <div>
            {item.icon}
            <span className='sidebar_label'>{item.title}</span>
        </div>

        <div>
            {(item.subNav && subnav) ? item.iconClosed : (item.subNav ? item.iconOpened : null)}
        </div>
      </NavLink>

      {subnav && item.subNav.map((item, index) => {
        return (
            <NavLink className='dropdown_menu' key={index} to={item.path}>
                {item.icon}
                <span className='sidebar_label'>{item.title}</span>
            </NavLink>
        )
      })}
    </>
  )
}

export default SubMenu
