import _ from 'lodash'

export default class Letters {
  constructor(el, employees) {
    this.grid = el
    this.gridWidth = 0
    this.gridHeight = 0
    this.letterWidth = 30
    this.letterHeight = 30
    this.totalLetters = 0
    this.letterArray = []
    this.currentLetters = 0
    this.resizeCount = 0
    this.employees = employees
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

  populateLetters = () => {
    for (let i = this.charCodeRange.start; i <= this.charCodeRange.end; i++) {
      this.letterArray.push(String.fromCharCode(i))
    }
    console.log(
      'letterArray: ' + this.letterArray,
      '\nletterArray.length: ' + this.letterArray.length
    )
  }

  hoverAnimation = (e) => this.revealEmployeeAnimation(e.target)

  revealEmployeeAnimation = (el) => {
    const letter = el.innerText
    const matchEmployee = _.find(this.employees, employee => {
      let firstLetter = employee.name.split('')[0]
      return firstLetter === letter ? employee : false
    })

    if (matchEmployee) {
      const img = document.createElement('img')
      img.src = matchEmployee.photo.fields.file.url
      el.appendChild(img)
    }
  }

  drawLetters = value => {
    let text
    let span
    let count = 0

    for (let letter = 0; letter <= value; letter++) {
      text = document.createTextNode(this.letterArray[count])
      span = document.createElement('div')
   

      span.appendChild(text)
      this.grid.appendChild(span)

      count++

      if (count === this.letterArray.length) {
        count = 0
      }

      if (letter === value) {
        this.grid.classList.add('js-show-letters')
      }
    }
  }

  getCurrentLetters = () => {
    this.currentLetters = this.grid.querySelectorAll('div').length
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

    if (this.currentLetters < this.totalLetters) {
      const difference = this.totalLetters - this.currentLetters
      this.drawLetters(difference)
    }
    this.getCurrentLetters()
  }
}
