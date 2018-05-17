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
      letters: [],
      gridRow: 0,
      gridHeight: 0
    }
  }
  componentDidMount() {
    const { letters } = this.state
    const { employees } = this.props
    const grid = document.querySelector('.letter-grid')
    const letterAnim = new Letters(grid)
    letterAnim.init()
    window.addEventListener('resize', _.debounce(letterAnim.onResize, 100))
    const lettersMounted = document.querySelectorAll('.letter-grid.js-show-letters')

    if(lettersMounted) {
      const allLetters =  document.querySelectorAll('.letter-grid.js-show-letters div')
      this.injectCityName(allLetters)
      this.parseEachLetter(allLetters, employees)
    }

  }

 
  parseEachLetter = (letters, employees) => {
    letters.forEach(letterEl => {
      console.log(letterEl)
      letterEl.addEventListener('mouseover', () => {
        this.employeePhotoFilter(letterEl, employees)
      })
    })
  }
  

  injectCityName = (allLetters) => {
    console.log(allLetters)
    const melbourne = 'Melbourne'.split('')
    console.log(melbourne)
    let i = 0
    while(i < melbourne.length) {
      allLetters[i + 6].innerText = melbourne[i]
      allLetters[i + 6].classList.add('cityLetter')
      i ++
    }
  }

  employeePhotoFilter = (el, employees) => {
    const letter = el.innerText
    const matchEmployee = _.find(employees, employee => {
      if (employee.title.split('')[0] === letter) {
        console.log(employee)
        return employee
      }
    })

    if (matchEmployee) {
      const img = document.createElement('img')
      img.src = matchEmployee.file.url + '?w=100&h=100'
      el.appendChild(img)
      img.classList.add('active', 'animated', 'fadeInUp')
      employees.splice(employees.indexOf(matchEmployee), 1)
    }
  }

  handleHover = e => {
    this.employeePhotoFilter(e.target)
  }
  getGridHeight = (letterAnim) => {
    const gridHeight = letterAnim.getColumnHeight()
    console.log(gridHeight)
  }

  getGridWidth = (letterAnim) => {
    const gridLength = letterAnim.getRowLength()
    console.log(gridLength)
  }



  render() {
    
    
    // const { alphaFull } = this
    // const { letters } = this.state
    // const characters = []

    return (
      <div className="team">
        <div className="letter-grid" />
      </div>
    )
  }
}
