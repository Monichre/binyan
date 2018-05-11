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
      activeSlides: [],
      slides: []
    }
  }
  handleNavClick = (i, e) => {

    const newSlide = this.state.slides[i]
    const newActiveSlides = [...this.state.activeSlides]
    newActiveSlides.push(newSlide)
    this.setState({
      activeSlides: newActiveSlides
    })
    
  }
  componentWillMount() {
    const { slides } = this.props
    this.setState({
      slides: slides,
      activeSlides: [slides[0]]
    })
  }

  render() {
    const { slides } = this.props
    const { activeSlides } = this.state
    const defaultStyles = {position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}
    const winHeight = window.outerHeight
    const winWidth = window.outerWidth
  
    return (
      <div className="carousel">
        <Transition
          native
          keys={activeSlides}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: .3}}
          config={{ tension: 5, friction: 10 }}>
          {activeSlides.map((slide, i) => (styles) => (
            <animated.div className='slide' style={{ ...defaultStyles, ...styles}}>
              <img src={`${slide.image.fields.file.url}?fl=progressive&w=${winWidth}&h=${winHeight}`} alt="" />
              <div className="overlay"/>
            </animated.div>
          ))}
        </Transition>
        <Nav handleClick={this.handleNavClick} slides={slides} />
      </div>
    )
  }
}

