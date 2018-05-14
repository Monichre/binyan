import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'
import { Transition, animated } from 'react-spring'
import { SectionsContainer, Section } from 'react-fullpage'
import './carousel.scss'

const Nav = props => (
  <nav id="carousel_navigation">
    <ul>
      {props.slides.map((slide, i) => {
        return (
          <li key={`carousel_slide_${i}`}>
            <a href={`#slide${i}`} data-number={i} onClick={props.handleClick.bind(this, i)}>
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
      current: 0,
    }
  }
  handleNavClick = (i, e) => {
    e.preventDefault()
    this.setState({current: i})

  }
  componentWillMount() {

  }

  render() {
    const { slides } = this.props
    const {current} = this.state
    const winHeight = window.outerHeight
    const winWidth = window.outerWidth
    const anchors = slides.map((slide, i) => `slide${i}`)
    console.log(slides)

    let options = {
      scrollBar: false,
      anchors: anchors,
      navigation: false,
      verticalAlign: false,
      sectionPaddingTop: '0',
      sectionPaddingBottom: '0',
      fadingEffect: true,
      autScrolling: true,
      arrowNavigation: false,
      scrollCallback: (states) => this.setState({current: states.activeSection})
    }

    return (
      <div className="carousel">
        <SectionsContainer className="slider" {...options} activeSection={current}>
          {slides.map((slide, i) => (
            <Section className={`hero_slide ${current === i ? 'active' : ''}`}>
              <img src={slide.image.fields.file.url} alt="" />
            </Section>
          ))}
        </SectionsContainer>
        <Nav handleClick={this.handleNavClick} slides={slides} />
      </div>
    )
  }
}

// <Transition
// native
// keys={activeSlides}
// from={{ opacity: 0 }}
// enter={{ opacity: 1 }}
// leave={{ opacity: .3}}
// config={{ tension: 5, friction: 10 }}>
// {activeSlides.map((slide, i) => (styles) => (
//   <animated.div className='slide' style={{ ...defaultStyles, ...styles}}>
//     <img src={`${slide.image.fields.file.url}?fl=progressive&w=${winWidth}&h=${winHeight}`} alt="" />
//     <div className="overlay"/>
//   </animated.div>
// ))}
// </Transition>
// const defaultStyles = {position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}
