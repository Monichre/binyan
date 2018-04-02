import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import _ from 'lodash'

class Letters extends Component {
  render() {
    return (
      <div className="letters" ref="elementContainer">
        {this.props.children}
      </div>
    )
  }
}

const Letter = props => (
    <div className={`letter ${props.animatedClass}`} key={props.key} onMouseEnter={props.hoverAnimation}>
      <span className="letter_char" id={props.key} >{props.letter}</span>
    </div>
)

export default class Team extends Component {
  constructor() {
    super()
    this.state = {
      letters: []
    }
    this.alpha = new Array(26)
      .fill(1)
      .map((_, i) => String.fromCharCode(65 + i))
    this.alpha2 = new Array(26)
      .fill(1)
      .map((_, i) => String.fromCharCode(65 + i))
    this.alphaFull = [...this.alpha, ...this.alpha2]
  }
  componentDidMount() {
    const { employees } = this.props
    const { alphaFull } = this
    const { letters } = this.state

    // this.renderLetters(alphaFull, letters)
  }

  handleHover = (e) => {
    this.employeePhotoFilter(e.target)
  }
  employeePhotoFilter = (el) => {
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
    if(matchEmployee) {
      const img = document.createElement('img')
      img.src = matchEmployee.photo.fields.file.url
      parent.appendChild(img)
    }
  }

  renderLetters = (alphaFull, letters) => {
    console.log(alphaFull)
    const characters = []
    for (let i = 0; i < alphaFull.length; i++) {
      console.log(characters)
      console.log(alphaFull[i])
      setTimeout(function() {
        characters.push(alphaFull[i])
      }, 2000)
      this.setState({
        letters: characters
      })
      console.log(this.state)
    }
  }

  render() {
    const { employees } = this.props
    const { alphaFull } = this
    const { letters } = this.state
    const characters = []

    // const appendChars = () => {
    //   const winHeight = window.outerHeight
    //   const lContainer = document.querySelector('.team')
    //   const containerHeight = lContainer ? lContainer.offsetHeight : null
    //   console.log(lContainer)
    //   console.log(containerHeight)
    //   console.log(winHeight)
    //   let lettersHTML = alphaFull.map((_letter, i) => {
    //         console.log(_letter)
    //         if (i % 2 === 0) {
    //           return (
    //             <Letter
    //               key={`letter-${i}`}
    //               letter={_letter}
    //               hoverAnimation={this.handleHover}
    //               animatedClass={'bounce animated'}
    //             />
    //           )
    //         } else {
    //           return (
    //             <Letter
    //               key={`letter-${i}`}
    //               letter={_letter}
    //               hoverAnimation={this.handleHover}
    //               animatedClass={'bounce animated'}
    //             />
    //           )
    //         }
    //       })
    // }
    // console.log(appendChars())



    return (
      <div className="team">
        <Letters>
          {alphaFull.map((_letter, i) => {
            console.log(_letter)
            if (i % 2 === 0) {
              return (
                <Letter
                  key={`letter-${i}`}
                  letter={_letter}
                  hoverAnimation={this.handleHover}
                  animatedClass={'bounce animated'}
                />
              )
            } else {
              return (
                <Letter
                  key={`letter-${i}`}
                  letter={_letter}
                  hoverAnimation={this.handleHover}
                  animatedClass={'bounce animated'}
                />
              )
            }
          })}
        </Letters>
      </div>
    )
  }
}
