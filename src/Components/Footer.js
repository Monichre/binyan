import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import AppStore from '../Flux/Store/AppStore'
import {CONSTANTS} from '../constants'

export default class Footer extends Component {
  constructor() {
    super()
    this.state = {
      
    }
  }

  render() {
    const { data } = AppStore
    const { cities, socialMediaLinks } = data
    console.log(socialMediaLinks)

    return (
      <div className="Footer">
        <div className="footer_section">
          <p className="copyright">© 2018 <span>BINYAN</span> All Rights Reserved</p>
        </div>
        <div className="footer_section">
          <ul>
            {cities.map((city) => (
              <li><a href="">{city.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer_section">
          <ul className="social">
            {CONSTANTS.socialMedia(socialMediaLinks)}
          </ul>
        </div>
      </div>
    )
  }
}
