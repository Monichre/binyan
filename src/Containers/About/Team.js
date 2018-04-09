import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import _ from 'lodash'
import Swiper from 'react-id-swiper'
import Letters from './letters'


// const Letter = props => (
//     <div className={`letter ${props.animatedClass}`} key={props.key} onMouseEnter={props.hoverAnimation}>
//       <span className="letter_char" id={props.key} >{props.letter}</span>
//     </div>
// )

export default class Team extends Component {
  constructor() {
    super()
    this.state = {
      letters: []
    }
  }
  componentDidMount() {
    const { letters } = this.state
    const grid = document.querySelector('.letter-grid')
    const letterAnim = new Letters(grid)
    letterAnim.init()

    window.addEventListener('resize', _.debounce(letterAnim.onResize, 100))
  }

  handleHover = e => {
    this.employeePhotoFilter(e.target)
  }
  employeePhotoFilter = el => {
    const parent = el.parentElement
    console.log(el)
    const letter = el.innerText
    const { employees } = this.props
    const matchEmployee = _.find(employees, employee => {
      console.log(employees)
      console.log(employee.name.split('')[0])
      if (employee.name.split('')[0] === letter) {
        console.log(employee)
        return employee
      }
    })
    if (matchEmployee) {
      const img = document.createElement('img')
      img.src = matchEmployee.photo.fields.file.url
      parent.appendChild(img)
    }
  }


  render() {
    const { employees } = this.props
    const { alphaFull } = this
    const { letters } = this.state
    const characters = []

    return (
      <div className="team">
        <div className="letter-grid" />
      </div>
    )
  }
}
