import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from "./../../Context/AuthContext"
import { Button, Select } from 'antd'

const Header = () => {

  const { i18n } = useTranslation()
  const { setToken } = useContext(AuthContext)

  const handleChangeLanguage = e => {
    i18n.changeLanguage(e)
  }

  function handleLogOut(){
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <header style={{display: "flex", justifyContent: "space-between"}}>
        <h1>Header</h1>
        <Button onClick={handleLogOut}>log out</Button>
        <Select defaultValue={localStorage.getItem("i18nextLng")} onChange={handleChangeLanguage}>
          <option value="en">en</option>
          <option value="ru">ru</option>
          <option value="uz">uz</option>
        </Select>
    </header>
  )
}

export default Header