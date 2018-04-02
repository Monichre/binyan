import React from 'react'

const Instagram = (url) => <li><a href={url}><i className="fab fa-instagram" /></a></li>
const Facebook = (url) => <li><a href={url}><i className="fab fa-facebook-f" /></a></li>
const Twitter = (url) => <li><a href={url}><i className="fab fa-twitter" /></a></li>

const socialMap = (social) => {
  if(social.name === 'Instagram') {
    return Instagram(social.url)
  } else if(social.name === 'Facebook') {
    return Facebook(social.url)
  } else if(social.name === 'Twitter') {
    return Twitter(social.url)
  }
}

export const CONSTANTS = {
  socialMedia: (socialLinks) => socialLinks.map((social) => socialMap(social))
}