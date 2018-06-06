import React, { Component } from 'react'
import _ from 'lodash'
import Letters from './letters'
import './_team.scss'
const { Glitch } = require('../../../components/letterGlitch/letterGlitch')
const { GridLetter } = require('../../../components/letterGlitch/letterGlitch')
const { LetterGlitch } = require('../../../components/letterGlitch/letterGlitch')

console.log(Glitch)
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
      gridHeight: 0,
      cities: ['Melbourne', 'Brisbane', 'Sydney', 'New York']
    }
  }
  componentDidMount() {
    const { letters } = this.state
    const { employees } = this.props
    const grid = document.querySelector('.letter-grid')
    const letterAnim = new Letters(grid)
    letterAnim.init()
    // letterAnim.onResize()
    window.addEventListener('resize', _.debounce(letterAnim.onResize, 100))
    const lettersMounted = document.querySelector('.letter-grid.js-show-letters')
    const allLetters = document.querySelectorAll('.letter-grid.js-show-letters div')

    if (lettersMounted && allLetters.length > 0) {
      // const allLetters = document.querySelectorAll('.letter-grid.js-show-letters div')
      const elHeight = this.handleAnimationScreenHeight(allLetters)
      if (elHeight < window.offsetHeight) {
        _.debounce(letterAnim.onResize, 100)
      }
      this.injectCityName(allLetters)
      this.parseEachLetter(allLetters, employees)
      Array.from(document.querySelectorAll('.employee_letter')).forEach(word => new Glitch(word, employees))
    }
  }

  handleAnimationScreenHeight = (allLetters) => {
    let totalElementHeight = 0
    allLetters.forEach((letter) => totalElementHeight += letter.offsetHeight)
    return totalElementHeight
  }


  parseEachLetter = (letters, employees) => {
    // This syntax allows the destructuring of the letters nodelist
    // const half = [...letters]
    // console.log(half)
    // half.length = Math.floor([...letters].length / 1.5 )

    letters.forEach(letterEl => {
      const rando = letters[Math.floor(Math.random() * letters.length)]
      this.employeePhotoFilter(rando, employees)
    })
  }

  employeePhotoFilter = (el, employees) => {
    el.classList.add('employee_letter')
    employees.forEach((employee, i) => {
      let imgAttr = `data-images-char-${i + 1}`
      let imgAttrVal = `${employee.file.url}?w=200&h=200`
      el.setAttribute(imgAttr, imgAttrVal)
    })
    el.setAttribute('data-background-colors', '#f5a4bf,#336ff0,#ffea9e,#33beff,#a5d613,#f89a53')
  }

  injectCityName = allLetters => {
    console.log(allLetters)
    const melbourne = 'Melbourne'.split('')
    let i = 0
    if (allLetters[i + 6]) {
      while (i < melbourne.length) {
        allLetters[i + 6].innerText = melbourne[i]
        allLetters[i + 6].classList.add('cityLetter')
        i++
      }
    } 
  }

  getGridHeight = letterAnim => {
    const gridHeight = letterAnim.getColumnHeight()
    console.log(gridHeight)
  }

  getGridWidth = letterAnim => {
    const gridLength = letterAnim.getRowLength()
    console.log(gridLength)
  }

  render() {
    return (
      <div className="team">
        <div className="letter-grid" />
      </div>
    )
  }
}
