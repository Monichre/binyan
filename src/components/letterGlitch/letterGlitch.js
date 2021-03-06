import ImagesLoaded from 'react-images-loaded'
const charming = require('charming')

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const getRelativeRandom = (items) => items[Math.floor(Math.random()*items.length)]

class LetterGlitch {
  constructor(el, imgs) {
    this.DOM = {}
    this.DOM.el = el
    this.imgs = imgs
    this.totalImgs = this.imgs.length
    this.options = {
      // Max and Min values for the time when to start the effect.
      glitchStart: { min: 500, max: 4000 },
      // Max and Min values of time that an element keeps each state.
      glitchState: { min: 2000, max: 5000 },
      // Number of times the glitch action is performed per iteration.
      glitchTotalIterations: 6,
      // The imgs slideshow interval.
      slideshowInterval: 3000
    }
  }
  glitch() {
    this.isInactive = false
    clearTimeout(this.glitchTimeout)
    this.glitchTimeout = setTimeout(() => {
      this.iteration = 0
      this.glitchState().then(() => {
        if (!this.isInactive) {
          this.glitch()
        }
      })
    }, getRandomInt(this.options.glitchStart.min, this.options.glitchStart.max))
  }
  glitchState() {
    return new Promise((resolve, reject) => {
      if (this.iteration < this.options.glitchTotalIterations) {
        this.glitchStateTimeout = setTimeout(() => {
          this.DOM.el.style.transform = `translate3d(${getRandomInt(-20, 20)}px,${getRandomInt(
            -20,
            20
          )}px,0px) rotate3d(0,0,1,${getRandomInt(-3, 3)}deg)`
          if (getRandomInt(0, 3) < 2) {
            console.log(this.DOM.el)
            this.DOM.el.style.backgroundImage = `url(${this.imgs[getRandomInt(0, this.totalImgs - 1)]})`
            console.log(this.DOM.el.style.backgroundImage)
            this.DOM.el.style.color = 'transparent'
          } else {
            this.DOM.el.style.backgroundImage = 'none'
            this.DOM.el.style.color = ''
          }

          this.iteration++
          if (!this.isInactive) {
            this.glitchState().then(() => resolve())
          }
        }, getRandomInt(this.options.glitchState.min, this.options.glitchState.max))
      } else {
        this.reset()
        resolve()
      }
    })
  }
  stop() {
    this.isInactive = true
    clearTimeout(this.glitchTimeout)
    clearTimeout(this.glitchStateTimeout)
    this.reset()
    return this
  }
  reset() {
    this.DOM.el.style.transform = 'translate3d(0,0,0) rotate3d(1,1,1,0)'
    this.DOM.el.style.backgroundImage = 'none'
    this.DOM.el.style.color = ''
  }
  changeImage(pos) {
    return new Promise((resolve, reject) => {
      this.DOM.el.style.color = 'transparent'
      console.log(pos)
      console.log(`url(${this.imgs[pos]})`)
      this.DOM.el.style.backgroundImage = `url(${this.imgs[pos]})`
      resolve()
    })
  }
  slideshow(pos) {
    pos = pos || 0
    const interval = this.isSlideshowActive ? this.options.slideshowInterval : 0
    const newpos = pos < this.totalImgs - 2 ? pos + 1 : 0
    this.slideshowTimeout = setTimeout(() => this.changeImage(pos).then(() => this.slideshow(newpos)), interval)
    this.isSlideshowActive = true
  }
  stopSlideshow() {
    clearTimeout(this.slideshowTimeout)
    this.isSlideshowActive = false
    this.reset()
  }
}

class GridLetter {
  constructor(letter, pos, employees) {
    this.DOM = {}
    this.DOM.letter = letter
    this.pos = pos
    this.imgs = employees.map((employee, i) => this.DOM.letter.parentNode.getAttribute(`data-images-char-${i + 1}`).split(','))
    let htmlstr = ''
    console.log(this.imgs)
    for (const img of this.imgs) {
      htmlstr += `<img src="${img}"/>`
      console.log('html string', htmlstr)
    }
    const imgWrapper = document.createElement('div')
    imgWrapper.className = 'hidden'
    imgWrapper.innerHTML = htmlstr
    document.body.appendChild(imgWrapper)
    // this.bgcolor = letter.parentNode.dataset['backgroundColors'].split(',')[this.pos]
    this.gfx = new LetterGlitch(this.DOM.letter, this.imgs)
    this.gfx.glitch()
    this.initEvents()
  }
  initEvents() {
    this.mouseenterFn = () => {
      this.gfx.stop().slideshow()
    }
    this.mouseleaveFn = () => {
      this.gfx.stopSlideshow()
      this.gfx.glitch()
    }
    this.DOM.letter.addEventListener('mouseenter', this.mouseenterFn)
    this.DOM.letter.addEventListener('mouseleave', this.mouseleaveFn)
  }
}

class Glitch {
  constructor(word, employees) {
    this.DOM = {}
    this.DOM.word = word
    this.employees = employees
    this.layout()
  }
  layout() {
    charming(this.DOM.word, { classPrefix: 'employee_letter' })
    console.log(this.DOM.word)
    Array.from(this.DOM.word.querySelectorAll('span')).forEach((letter, pos) => new GridLetter(letter, pos, this.employees))
  }
}

export {Glitch }
export { GridLetter }
export { LetterGlitch }
