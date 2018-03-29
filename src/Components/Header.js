import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AppStore from '../Flux/Store/AppStore'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const {data} = AppStore
    // const {siteNav} = data
    // const nav = siteNav.map((item, i) => (
    //   <li>
    //     <Link key={`${item} + '-'${i}`} to={`${item}`}>
    //       {item}
    //     </Link>
    //   </li>
    // ))
    return (
      <div className="site-header">
        Header
        {/* <div className="site-logo">
          <img src="/img/logo.png" />
        </div>
        <ul className="site-nav">{nav}</ul> */}
      </div>
    )
  }
}
