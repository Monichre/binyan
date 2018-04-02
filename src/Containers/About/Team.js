import React, { Component } from 'react'

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
  <div className={`letter ${props.animatedClass}`}>
    <span className="letter_char">{props.letter}</span>
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
    const _this = this
    const characters = []
    console.log(alphaFull)

    for (let i = 0; i < alphaFull.length; i++) {
      setInterval(function() {
        characters.push(alphaFull[i])
        _this.setState({
          letters: characters
        })
      }, 2000)
    }

    console.log(letters)
    console.log(employees)
  }

  render() {
    const { employees } = this.props
    const { alphaFull } = this
    const { letters } = this.state
    console.log(alphaFull)
    const characters = []

    // setInterval(function(){
    //   for(let i = 0; i < alphaFull.length; i ++) {
    //     characters.push(alphaFull[i])
    //   }
    // }, 1000)

    // console.log(characters)
    // console.log(employees)

    return (
      <div className="team">
        <Letters>
          {letters.map((_letter, i) => {
            console.log(_letter)
            if (i % 2 === 0) {
              return (
                <Letter
                  letter={_letter}
                  animatedClass={'bounce animated'}
                />
              )
            } else {
              return (
                <Letter
                  letter={_letter}
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
