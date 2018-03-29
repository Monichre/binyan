import React, { Component } from 'react'
import AppStore from '../../Flux/Store/AppStore'
import Carousel from '../../Components/Carousel'

import './home.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  render() {
    console.log(AppStore.data)
    const { heroImages } = AppStore.data
    console.log(heroImages)
    
    return (<div className="Home">
          <Carousel slides={heroImages} />
        </div>)
  }
}
