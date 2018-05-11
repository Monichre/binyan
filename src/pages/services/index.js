import React, { Component } from 'react'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import GeneralHeader from '../../components/header/Header'
import './_services.scss'

export default class Services extends Component {

  render() {
    const { Services } = AppStore.data.pages
    console.log(Services)
    return (
      <div className="Services">
        <GeneralHeader />
        <div className="featured_image">
          <img src={Services.featuredImage.fields.file.url} alt={`${Services.title} ${Services.pageHeader}`} />
        </div>
        <div className="main_content">
          <div className="headers">
            <h2>Disciplines</h2>
            <h3>{Services.pageHeader}</h3>
          </div>
          <div className="content">
            <ReactMarkdown source={Services.mainContent} />
          </div>
        </div>
      </div>
    )
  }
}
