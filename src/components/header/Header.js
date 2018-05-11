import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppStore from '../../Flux/Store/AppStore'
import './_header.scss'

export default class GeneralHeader extends Component {
  render() {
    const { siteNav } = AppStore.data
    const navStyles = {
      display: ' flex',
      margin: ' 0',
      justifyContent: ' space-evenly',
      padding: ' 20px 0 20px 20px'
    }
 
    const GeneralLogo = (
      <li className="logo_item" style={{ flexBasis: '15%' }}>
        <a href="/" className="logo">
          <img src="/img/logo.png" style={{ display: 'block', margin: 'auto' }} />
        </a>
      </li>
    )
    const middle = (item) => Math.floor(item.length / 2)
    const splitSpan = (item, i) => {
      const formatLink = item.split('')
      const span1 = formatLink.slice(0, middle(formatLink)).join('')
      const span2 = formatLink.slice(middle(formatLink), formatLink.length).join('')

      return (
        <li>
          <Link key={`${item} + '-'${i}`} to={`/${item}`} className="link link--ilin">
            <span>{span1}</span><span>{span2}</span>
          </Link>
        </li>
      )
    }

    let GeneralNav = siteNav.map((item, i) => splitSpan(item, i))

    GeneralNav.splice(middle(GeneralNav), 0, GeneralLogo)

    return (
      <header className="header general_header">
        <ul style={navStyles}>{GeneralNav}</ul>
      </header>
    )
  }
}
