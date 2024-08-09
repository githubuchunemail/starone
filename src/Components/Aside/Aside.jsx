import React from 'react'
import "./Aside.scss"
import Logo from "./../../Assets/Img/logo.png"
import { NavLink } from "react-router-dom"
import { useTranslation } from 'react-i18next'

const Aside = () => {

  const { t } = useTranslation()

  return (
    <aside>
      <ul className='logo'>
        <li>
          <NavLink to="/"> <img src={Logo} alt="" /> </NavLink>
        </li>
      </ul>

      <ul className='list'>
        <li>
          <NavLink to="/"> <i className="fa-solid fa-house"></i>  {t("dashboard")}  </NavLink>
        </li>

        <li>
          <NavLink to="/addProducts"> <i className="fa-solid fa-square-plus"></i>  {t("add_product")}  </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default Aside