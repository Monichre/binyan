import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import AppStore from '../Flux/Store/AppStore'

export default class Footer extends Component {
  constructor() {
    super()
    this.state = {
      email: ''
    }
  }
  handleEmail = e => {
    this.setState({
      email: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    alert('Email submitted')
  }
  render() {
    const { data } = AppStore

    return (
      <div className="Footer">
        <div className="footer_section" />
        <div className="footer_section" />
        <div className="footer_section">
          <h2>Follow Us</h2>
          <ul>
            <li>
              <a href="">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_section">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleEmail}
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    )
  }
}
