import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'
import { Transition, animated } from 'react-spring'
import './carousel.scss'

const Nav = props => (
  <nav id="carousel_navigation">
    <ul>
      {props.slides.map((slide, i) => {
        return (
          <li key={`carousel_slide_${i}`}>
            <a href="#" data-number={i} onClick={props.handleClick.bind(this, i)}>
              <span className="dot" />
              <span className="label">{slide.title}</span>
            </a>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default class Carousel extends Component {
  constructor() {
    super()
    this.state = {
      slides: [],
      active: 0
    }
    this.current = 0
  }
  handleNavClick = (i, e) => {
    this.current = i
  }
  componentWillMount() {
    const { slides } = this.props
    this.setState({
      slides: slides
    })
  }
  componentDidMount() {
    console.log(this)
    const htmlSlides = document.querySelectorAll('.slide')
    
    this.imageRotation()
    
  }

  imageRotation = () => {
    const { slides } = this.props
    setInterval(() => {
      const cycle = () => {
        let next = this.current
        console.log(next)
        next++
        if (next >= slides.length ) {
          next = 0
        }
        console.log(next)
        return next
      }
      this.current = cycle()
      this.setState({active: this.current})
    }, 5000)
  }
  render() {
    const { slides } = this.props
    const {active} = this.state
    console.log(this.current)
    const defaultStyles = { position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }
    const winHeight = window.outerHeight
    const winWidth = window.outerWidth

    return (
      <div className="carousel">
        <Transition
          native
          keys={[...slides]}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0.3 }}
          config={{ tension: 10, friction: 10 }}>
          {slides.map((slide, i) => styles => (
            <animated.div className={`slide slide_${i} ${i === active ? 'active' : ''}`} style={{ ...defaultStyles, ...styles }}>
              <img src={`${slide.image.fields.file.url}?fl=progressive&w=${winWidth}&h=${winHeight}`} alt="" />
              <div className="overlay" />
            </animated.div>
          ))}
        </Transition>
        <Nav handleClick={this.handleNavClick} slides={slides} />
      </div>
    )
  }
}
