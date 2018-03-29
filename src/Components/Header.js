import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppStore from '../Flux/Store/AppStore'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { siteNav } = AppStore.data
    const Logo = (
      <li className="logo">
        <a href="/">
          <img src="/img/logo1.jpg" />
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
      <div className="Header">
        <ul className="nav">{nav}</ul>
      </div>
    )
  }
}
