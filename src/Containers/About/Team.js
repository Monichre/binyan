import React, {Component} from 'react'

export default class Team extends Component {
  constructor() {
    super()
    this.state = {
    letters: [],
    elementContainer: {}
  }
    this.alpha = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) )
    this.alpha2 = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) )
    this.alphaFull = [...this.alpha, ...this.alpha2]
  }
  
  componentDidMount() {
    const {employees} = this.props
    console.log(this)
    console.log(this.alphaFull)
    const letters = document.querySelector('.letters')
    const letterBg = (_letter) => (
      <div className="letter">
        <span className="letter_char">{_letter}</span>
      </div>
    )
    const newLetters = this.alphaFull.map((l) => letterBg(l))
    this.setState({
      letters: newLetters,
      elementContainer: letters
    })
  }
  renderChars = () => {
    const winHeight = window.offsetHeight
    const {letters} = this.state
    const {elementContainer} = this.refs
    console.log(elementContainer)
    const elContainerHeight = elementContainer.offsetHeight
    
    
    console.log(winHeight)
    console.log(elContainerHeight)

    while(elContainerHeight < winHeight) {
      this.appendLetters(letters)
      { break }
    }
  }

  appendLetters = (letters) => letters.map((_l) => _l)

  render() {
    const {employees} = this.props
    console.log(this.state)
    console.log(employees)
    return (
      <div className="team">
        <div className="letters" ref='elementContainer'>
          {this.renderChars()}
        </div>
      </div>
    )
  }
}