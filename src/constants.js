import React from 'react'
import Axios from 'axios'
import moment from 'moment'

const Instagram = url => (
  <li>
    <a href={url}>
      <i className="fab fa-instagram" />
    </a>
  </li>
)
const Facebook = url => (
  <li>
    <a href={url}>
      <i className="fab fa-facebook-f" />
    </a>
  </li>
)
const Twitter = url => (
  <li>
    <a href={url}>
      <i className="fab fa-twitter" />
    </a>
  </li>
)

const socialMap = social => {
  if (social.name === 'Instagram') {
    return Instagram(social.url)
  } else if (social.name === 'Facebook') {
    return Facebook(social.url)
  } else if (social.name === 'Twitter') {
    return Twitter(social.url)
  }
}

const formatComplianceReport = (report) => {
  // Do Something
}

const URLS = {
  ada:
    'https://hooks.slack.com/services/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'
}

export const CONSTANTS = {
  socialMedia: socialLinks => socialLinks.map(social => socialMap(social)),
  complianceReport: data => {
    console.log(data)

    const {
      inapplicable,
      incomplete,
      passes,
      timestamp,
      violations,
      url
    } = data
    const report = {
      incomplete: incomplete,
      passes: passes,
      time: moment(timestamp).format('MMMM Do YYYY'),
      violations: violations,
      website: url
    }
    const options = {
      text: 'New Accessibility Report: ' + JSON.stringify(report)
    }

    return Axios.post(URLS.ada, JSON.stringify(options))
      .then(res => {
        console.log(res)
        return res
      })
      .catch(err => {
        console.log(err)
      })
  }
}
