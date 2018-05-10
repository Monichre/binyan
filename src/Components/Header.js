import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppStore from '../Flux/Store/AppStore'

export default class GeneralHeader extends Component {
  render() {
    const { siteNav } = AppStore.data
    const navStyles = {
      display: ' flex',
      margin: ' 0',
      justifyContent: ' space-evenly',
      padding: ' 20px 0'
    }
    const generalLiStyle = {
      color: ' black',
      letterSpacing: ' 3px',
      fontSize: ' 0.8rem',
      paddingTop: ' 10px',
      textTransform: ' uppercase'
    }
    const GeneralLogo = (
      <li className="logo_item" style={{ flexBasis: '40%' }}>
        <a href="/" className="logo">
          <img
            src="/img/logo.png"
            style={{ display: 'block', margin: 'auto' }}
          />
        </a>
      </li>
    )
    let GeneralNav = siteNav.map((item, i) => (
      <li style={generalLiStyle}>
        <Link key={`${item} + '-'${i}`} to={`/${item}`}>
          {item}
        </Link>
      </li>
    ))
    const middle = Math.floor(siteNav.length / 2)
    GeneralNav.splice(middle, 0, GeneralLogo)
    
    return (
      <header className="header general_header">
        <ul style={navStyles}>{GeneralNav}</ul>
      </header>
    )
  }
}
