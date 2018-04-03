import _ from 'lodash'

export default class Letters {

  constructor(el) {
    this.grid = el
    this.gridWidth = 0
    this.gridHeight = 0
    this.letterWidth = 100 // @todo: make this dynamic
    this.letterHeight = 100 // @todo: make this dynamic
    this.totalLetters = 0
    this.letterArray = []
    this.currentLetters = 0
    this.resizeCount = 0
    this.charCodeRange = {
      start: 65,
      end: 90
    }
  }
  getDimensions = () => {
    const gridRect = this.grid.getBoundingClientRect()
    this.gridWidth = gridRect.width
    this.gridHeight = gridRect.height
    console.log(
      'Grid width: ' + this.gridWidth,
      '\nGrid height: ' + this.gridHeight
    )
  }

  getTotalLetters = () => {
    const multiplierX = this.gridWidth / this.letterWidth
    const multiplierY = this.gridHeight / this.letterHeight
    this.totalLetters = Math.round(multiplierX * multiplierY)

    console.log(
      'multiplierX: ' + multiplierX,
      '\nmultiplierY: ' + multiplierY,
      '\ntotalLetters: ' + this.totalLetters
    )
  }

  // loop through the unicode values and push each character into letterArray

  populateLetters = () => {
    for (let i = this.charCodeRange.start; i <= this.charCodeRange.end; i++) {
      this.letterArray.push(String.fromCharCode(i))
    }
    console.log(
      'letterArray: ' + this.letterArray,
      '\nletterArray.length: ' + this.letterArray.length
    )
  }

  drawLetters = (value) => {
    let text
    let span
    let count = 0

    for (let letter = 0; letter <= value; letter++) {
      text = document.createTextNode(this.letterArray[count])
      span = document.createElement('span')
      span.appendChild(text)
      this.grid.appendChild(span)
      count++

      // if our count equals the length of our letter array, then that
      // means we've reached the end of the array (Z), so we set count to
      // zero again in order to start from the beginning of the array (A).
      // we keep looping over the letter array 'value' number of times.

      if (count === this.letterArray.length) {
        count = 0
      }

      // if our for counter const (letter) equals the passed in value argument
      // then we've finished our loop and we throw a class onto the grid element

      if (letter === value) {
        this.grid.classList.add('js-show-letters')
      }
    }
  }

  // get the length of the grid.find('span') jQuery object
  // essentially the current number of letters in the grid at this point

  getCurrentLetters = () => {
    this.currentLetters = this.grid.querySelectorAll('span').length
    console.log('currentLetters: ' + this.currentLetters)
  }

  init = () => {
    this.populateLetters()
    this.getDimensions()
    this.getTotalLetters()
    this.drawLetters(this.totalLetters)
    this.getCurrentLetters()

    
  }

  onResize = () => {
    console.log('\nresizeCount: ' + this.resizeCount + '\n')
    this.resizeCount++
    this.getDimensions()
    this.getTotalLetters()

    // here we're looking to see if the current number of letters in the grid
    // (currentLetters) is less than the total possible letters
    // if so, we figure out how many need to be added to fill it up, then draw them

    if (this.currentLetters < this.totalLetters) {
      const difference = this.totalLetters - this.currentLetters
      this.drawLetters(difference)
    }

    // update currentLetters with the current number of letters in the grid
    this.getCurrentLetters()
  }
}
