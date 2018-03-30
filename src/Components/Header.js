import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Headroom from 'react-headroom'
import AppStore from '../Flux/Store/AppStore'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { siteNav } = AppStore.data
    const Logo = (
      <li className="logo_item">
        <a href="/" className="logo">
          <img src="/img/logo.png" />
        </a>
      </li>
    )
    let nav = siteNav.map((item, i) => (
      <li>
        <Link key={`${item} + '-'${i}`} to={`${item}`}>
          {item}
        </Link>
      </li>
    ))
    const middle = Math.floor(nav.length / 2)
    nav.splice(middle, 0, Logo)

    return (
      <Headroom>
        <ul className="nav">{nav}</ul>
      </Headroom>
    )
  }
}
