import React, {Component} from 'react'
import AppStore from '../../Flux/Store/AppStore'
import Team from './Team'
import './about.scss'

export default class About extends Component {
  constructor() {
    super()

    this.state = {}
  }
  render () {
    const {employees} = AppStore.data
    console.log(employees)
    return(
      <div className="about">
        <Team employees={employees} />
      </div>
    )
  }
}